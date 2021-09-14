import { BaseView } from "../../base-view";
import { html } from 'lit-element';

class NotFoundView extends BaseView {
    render() {
        return html`
            <h1>Not found!</h1>
            <a href="/">Come back to home</a>
        `;
    }
}

if (!customElements.get('not-found-view')) { customElements.define('not-found', NotFoundView); }