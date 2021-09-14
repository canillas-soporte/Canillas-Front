import { css, html } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { getVisibleTodosSelector, VisibilityFilters } from '../redux/reducer';
import {connect} from 'pwa-helpers';
import { store } from '../redux/store';
import { addTodo, clearCompleted, getTodos, updateFilter, updateTodoStatus } from '../redux/actions';
import { BaseView } from './base-view';
 
//Conectamos el componente con el Store de Redux
class TodoView extends connect(store)(BaseView) {

    static get properties() {
        return {
            todos: {
                type: Array,
            },
            task: {
                type: String
            },
            filter: {
                type: String
            }
        }
    }

    stateChanged(state) {
        //Se actualizará cada vez que el store se actualize
        this.todos = getVisibleTodosSelector(state)
        this.filter = state.filter;
    }

    static get styles() {
        return css`
            todo-view {
                display: block;
                max-width: 800px;
                margin: 0 auto;
            }

            todo-view .input-layout {
                width: 100%;
                display: flex;
            }

            todo-view .input-layout vaadin-text-field {
                flex-1;
                margin-right: var(--spacing);
            }

            todo-view .todos-list {
                margin-top: var(--spacing);
            }

            todo-view .visibility-filters {
                margin-top: calc(4 * var(--spacing));
            }
        `;
    }


    render() {
        return html`
            <style>
            :root {
                --spacing: 12px;
            }
            todo-view {
                display: block;
                max-width: 800px;
                margin: 0 auto;
            }
 
            todo-view .input-layout {
                width: 100%;
                display: flex;
            }

            todo-view .input-layout vaadin-text-field {
                flex:1;
                margin-top: var(--spacing);
                margin-right: var(--spacing);
            }

            todo-view .input-layout vaadin-button {
                margin-top: var(--spacing);
            }

            todo-view .todos-list {
                margin-top: var(--spacing);
            }

            todo-view .visibility-filters {
                margin-top: calc(4 * var(--spacing));
            }
            </style>
            <div class="input-layout" @keyup="${this.shortcoutListener}">
                <vaadin-text-field
                    placeholder="Tarea"
                    value="${this.task || ''}"
                    @change="${this.updateTask}">
                </vaadin-text-field>
                <vaadin-button
                    theme="primary"
                    @click="${this.addTodo}">
                    Añadir Tarea
                    </vaadin-button>
            </div>

            <div class="todos-list">
                ${this.todos.map(todo =>  html`
                    <div class="todo-item">
                        <vaadin-checkbox
                        @change="${e => this.updateTodoStatus(todo, e.target.checked)}"
                        ?checked="${todo.complete}">
                            ${todo.task}
                        </vaadin-checkbox>
                    </div>
                `)}
            </div>

            <vaadin-radio-group
                class="visibility-filters"
                value="${this.filter}"
                @value-changed="${this.filterChanged}"
                >
                ${Object.values(VisibilityFilters).map(filter => html`
                    <vaadin-radio-button value="${filter}">${filter}</vaadin-radio-button>
                `)}
            </vaadin-radio-group>

            <vaadin-button @click="${this.clearCompleted}">
                Clear completed
            </vaadin-button>
        `
    }

    getTodos() {
        return store.dispatch(getTodos());
    }

    clearCompleted() {
        store.dispatch(clearCompleted());
    }

    filterChanged(e) {
        store.dispatch(updateFilter(e.detail.value));
    }

    updateTodoStatus(todo, complete) {
        store.dispatch(updateTodoStatus(todo, complete))
    }

    shortcoutListener(e) {
        if(e.key === "Enter") {
            this.addTodo();
        }
    }

    updateTask(e) {
        this.task = e.target.value;
    }

    addTodo() {
        if(this.task) {
            store.dispatch(addTodo(this.task));
            this.task = '';
        }
    }
}

if (!customElements.get('todo-view')) { customElements.define('todo-view', TodoView); }