import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {

  get properties() {
      return {
          text: { type: String }
      }
  }

  constructor() {
    super();
    this.text = "Validar"
}

  // Implement `render` to define a template for your element.
  render(){
    /**
     * Return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function.
     */
    return html`
        <button type="button">${this.text}</button>
    `;
  }
}
customElements.define('my-element', MyElement);