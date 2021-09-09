import { LitElement, html, css } from 'lit-element';
import { cnnavnarStyle } from './cn-navnar-css.js';

class CNNavbar extends LitElement {

  static get styles() {
    return css`
      ${cnnavnarStyle}`;
  }

  get properties() {
    return {
      logo: {
        type: String
      },
      text: { 
        type: String 
      },

    }
  }

  constructor() {
    super();
    this.text = "Validar";
  }

  // Implement `render` to define a template for your element.
  render() {
    /**
     * Return a ../../@Modules/lit-element/lit-element.js `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function.
     */
    return html`
        <nav class="navbar">
          <div class="navbar__logo">
            <h1 class="navbar__title">Canillas</h1>
          </div>
          <div class="navbar__links"></div>
        </nav>
    `;
  }
}
customElements.define('cn-navbar', CNNavbar);