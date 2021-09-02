import { LitElement, html } from 'lit-element';

  class CNNavbar extends LitElement {

    get properties() {
      return {
        text: { type: String }
      }
    }

    constructor() {
      super();
      this.text = "Validar";
      const sheet = new CSSStyleSheet();
      sheet.replace('@import url("cn-navnar.css")')
        .then(sheet => {
          console.log('Styles loaded successfully');
        })
        .catch(err => {
          console.error('Failed to load:', err);
        });
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
        <style> @import "./cn-navbar.css"; </style>
        <nav>Adios</nav>
    `;
    }
  }
customElements.define('cn-navbar', CNNavbar);