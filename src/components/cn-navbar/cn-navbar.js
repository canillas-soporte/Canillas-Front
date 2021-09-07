import { LitElement, html } from 'lit-element';
import cnnavbarStyle from './cn-navnar-css.js';

  class CNNavbar extends LitElement {

    get styles() {
      return cnnavbarStyle;
    }

    get properties() {
      return {
        text: { type: String }
      }
    }

    constructor() {
      console.log(cnnavbarStyle);
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
        ${cnnavbarStyle}
        <nav class="navbar">Adios</nav>
    `;
    }
  }
customElements.define('cn-navbar', CNNavbar);