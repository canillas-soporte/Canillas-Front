import { LitElement } from "lit-element";
import { Router } from '@vaadin/router';

export class BaseView extends LitElement {

    

    constructor() {
        super();
    }

    createRenderRoot() {
        return this;
    }
}

import { routes } from './routes/routes';
window.addEventListener('load', () => {
    initRouter();
});

function initRouter() {
    const router = new Router(document.querySelector('main'));
    router.setRoutes(routes)
}