import { customElement, LitElement } from "lit-element";
import { ROUTES } from "./routes/spa-routes";
import {router} from "lit-element-router";
import spacontrollerStyle from './spa-controller-css.js';

@customElement('spa-controller')
@router
class SpaController extends LitElement {

    static get properties() {
        return {
            route: { 
                type: String 
            },
            params: {
                type: Object
            },
            query: {
                type: Object
            },
            data: {
                type: Object
            },
            content: {
                type: Object
            },
            basePath: {
                type: String,
                attribute: 'base-path'
            }
        }
    }

    static get styles() {
        return spacontrollerStyle;
    }

    static get routes() {
        return ROUTES;
    }

    constructor() {
        super();
        this.route = "";
        this.params = {};
        this.query = {};
        this.data = {};
        this.content = {};
        this.templates = [];
    }

    connectedCallback() {
        super.connectedCallback();

        this.constructor.routes.forEach(element => {
            element.pattern = `${this.basePath}/${element.pattern}`;
        });

        this.templates = this.constructor.routes.map(element => element.name);
    }

    async firstUpdated() {
        const outlet = this.shadowRoot.querySelector('spa-main');
        this.content = await this.retrieveTemplates();
        outlet.addStep(this.content.map((step) => {
            const _content = typeof step.content === 'function' ? step.content(JSON.parse(this[step.name])) : step.content;
            return html`
                <style>
                    ${step.styles[`${step.name}Style`].cssText}
                </style>
                <div route="${step.name}">${_content}</div>
            `;
        }))
    }

    async retrieveTemplateConfig(current) {
        return {
            styles: (await import(`./templates/${current}/${current}-css.js`)),
            content: (await import(`./templates/${current}/${current}-tmpl.js`)).default,
            name: current
        };
    }

    async retrieveTemplates() {
        return (await Promise.all(this.templates.map(this.retrieveTemplateConfig))).filter(current => current);
    }

    router(route, params, query, data) {
        this.route = route;
        this.params = params;
        this.query = query;
        this.data = data;
    }

    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
    }

    retrieveNextStep() {
        const INDEX = this.data.order + 1;
        const ROUTE = ROUTES.find(route => route.data.order === INDEX);
        return `${ROUTE ? `${ROUTE.pattern}` : `https://www.elconfidencial.com`}`
    }

    getCompletedIcon() {
        return html`
            <div class='completeIcon'>
                <div class='completeIcon__bar'>
                </div>
                <div class='completeIcon__bar'>
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <ec-app-main active-route=${this.route}>
                ${this.content}
            </ec-app-main>
            <section class="newsletterContainer__buttonNext">
                ${ROUTES.length !==  this.data.order ? html `
                    <ec-app-link class="newsletterContainer__buttonWrapper" href="${this.retrieveNextStep()}"><p
                        class="newsletterContainer__button">Siguiente</p></ec-app-link>
                `: html `
                    
                `}
            </section>
            ${this.route !== 'completed' ? html`<main class="steps">
                <section class="steps__circleWrapper">
                    ${ROUTES.map(({ pattern, data}, index) => html`
                        <div class="steps__circle" ?isActive=${data.order === this.data.order}></div>
                    `)}
                </section>
            </main>`: nothing}
        `;
    }

}