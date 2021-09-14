import {
    CLEAR_COMPLETED,
    ADD_TODO,
    UPDATE_TODO_STATUS,
    UPDATE_FILTER,
    GET_TODOS
} from './actions.js';
import { createSelector } from 'reselect';

export const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
}

const INITIAL_STATE = {
    todos: [],
    filter: VisibilityFilters.SHOW_ALL
};
//Aqui metemos la lógica operando con datos que vienen desde la acción.
/* Desde la acción estamos pasando el estado a ejecutar y la acción 
(el objeto a tratar) Aquí manejamos el estado de este . */
export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO:
            let newState = [...state.todos, action.todo]
            return {
                ...state,
                //Incluye todo lo que habia en el todos y le introduce el nuevo
                todos: newState
            }
        case UPDATE_TODO_STATUS:
            let newTodos = [];
            state.todos.map(todo => action.todo.task === todo.task ?
                newTodos.push({ ...todo, complete: action.complete })
                :
                newTodos.push(todo)
            );
            return {
                ...state,
                todos: newTodos
            }
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        case CLEAR_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.complete)
            }
        case GET_TODOS:
            return {
                ...state,
                todos: state.todos
            }
        default:
            return state;
    }
}

//GETTERS
const getTodosSelector = state => state.todos;
const getFilterSelector = state => state.filter;

export const getVisibleTodosSelector = createSelector(
    //Toma el nombre de los selecores
    //Recalcula el valor de estos elementos si hay cambios
    /* Toma el valor de los elementos sensibles a mutar,
        Cuando mutan, ejecuta una función donde se pasan por parámetro.
        En el caso de que no muten no se ejecuta */
    [getTodosSelector, getFilterSelector],
    (todos, filter) => {
        switch (filter) {
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.complete);
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.complete);
            default:
                return todos;
        }
    }
);

export const statsSelector = createSelector(
    getTodosSelector,
    (todos) => {
        const completed = todos.filter(todo => todo.complete).length;
        return {
            completed,
            active: todos.length -completed
        }
    }
)