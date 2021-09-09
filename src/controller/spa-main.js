import { customElement, LitElement, html } from "lit-element";
import {outlet} from "lit-element-router";

@customElement('spa-main')
@outlet
export class SpaMain extends LitElement {
    constructor() {
        super();
    }

    addStep(steps) {
        this.render(steps, this);
        this.outlet();
    }

    render() {
        return html`
            <slot>
            </slot>
        `;
    }
}