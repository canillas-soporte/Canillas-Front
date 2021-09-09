import { css, html, customElement, LitElement } from "lit-element";
import {navigator} from "lit-element-router";
import { spalinkerStyle } from "./spa-linker-css";

@customElement('spa-linker')
@navigator
export class SpaLinker extends LitElement {
    static get properties() {
        return {
            href: {
                type: String
            }
        }
    }
    static get styles() {
        return css`
            ${spalinkerStyle}
        `
    }

    constructor() {
        super();
        this.href = '';
    }

    render() {
        return html`
            <a class="step" href="${this.href}" @click="${this.linkClick}">
        `;
    }

    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}