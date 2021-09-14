import { LitElement, html } from 'lit-element';
import {cnnavnarStyle} from './cn-navnar-css.js';

  class CNNavbar extends LitElement {

    get styles() {
      return cnnavnarStyle;
    }

    get properties() {
      return {
        text: { type: String }
      }
    }

    constructor() {
      console.log(cnnavnarStyle);
      super();
      this.text = "Validar";
    }

    // Implement `render` to define a template for your element.
    render() {
      /**
       * Return a lit-html `TemplateResult`.
       *
       * To create a `TemplateResult`, tag a JavaScript template literal
       * with the `html` helper function.
       */
      return html`
        <nav class="navbar">Adios</nav>
    `;
    }
  }
customElements.define('cn-navbar', CNNavbar);