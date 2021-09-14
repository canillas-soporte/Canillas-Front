import { BaseView } from "../../base-view";
import { css, html, LitElement } from 'lit-element';
import { newslettersviewStyle } from './newsletters-view-css';

class Newsletters extends BaseView {
    render() {
        return html`
        <link rel="stylesheet" type="text/css" href='${window.location}/src/controller/views/newsletters/newsletters-view.css' />
            <main class="newsletterContainer">
                <section class="newsletterContainer__suscribed">
                    <h1 class="newsletterContainer__title">
                        Estas son las newsletters que vas a recibir por ser suscriptor
                    </h1>
                    <div class="suscribedList">
                        <div class="suscribedList__newsletter">
                            <header class="suscribedList__header">
                                <h3 class="suscribedList__title">AGENDA | SEMANAL</h3>
                                <div class="suscribedList__checkedWrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff"><path fill="#ffffff" d="M6 12.667a.666.666 0 01-.471-.196L2.195 9.138a.668.668 0 01.943-.943L6 11.057l6.862-6.862a.668.668 0 01.943.943L6.47 12.471c-.13.13-.3.196-.471.196z" clip-rule="evenodd"/></svg>
                                </div>
                            </header>
                            <section class="suscribedList__body">
                                <figure class="suscribedList__imageWrapper">
                                    <img src="img/newsletter/agenda.png" alt="newsletter-image" class="suscribedList__image"/>
                                </figure>
                                <h2 class="suscribedList__description">
                                    Conoce todos los eventos y novedados que hemos preparado para ti
                                </h2>
                            </section>
                        </div>
                        <div class="suscribedList__newsletter">
                            <header class="suscribedList__header">
                                <h3 class="suscribedList__title">EN 7 DÍAS | SEMANAL</h3>
                                <div class="suscribedList__checkedWrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff"><path fill="#ffffff" d="M6 12.667a.666.666 0 01-.471-.196L2.195 9.138a.668.668 0 01.943-.943L6 11.057l6.862-6.862a.668.668 0 01.943.943L6.47 12.471c-.13.13-.3.196-.471.196z" clip-rule="evenodd"/></svg>
                                </div>
                            </header>
                            <section class="suscribedList__body">
                                <figure class="suscribedList__imageWrapper">
                                    <img src="img/newsletter/7dias.png" alt="newsletter-image" class="suscribedList__image"/>
                                </figure>
                                <h2 class="suscribedList__description">
                                    Esta 'newsletter' pone el foco sobre lo verdaderamente importante.
                                </h2>
                            </section>
                        </div>
                    </div>
                </section>
                <section class="newsletterContainer__nosuscribed">
                    <h1 class="newsletterContainer__title">
                        Suscríbete gratis además a estas newsletters
                    </h1>
                    <div class="separator"></div>
                    <div class="separator--big"></div>
                    <div class="unsuscribedList">
                        <div class="unsuscribedList__newsletter">
                            <header class="unsuscribedList__header">
                                <h3 class="unsuscribedList__title">ESPRESSO | DIARIA<h3>
                            </header>
                            <section class="unsuscribedList__body">
                                <figure class="unsuscribedList__imageWrapper">
                                    <img src="img/newsletter/expresso.png" alt="newsletter-image" class="unsuscribedList__image"/>
                                </figure>
                                <h2 class="unsuscribedList__description">
                                    Toda la actualidad de El Confidencial, cada mañana en tu email
                                </h2>
                                <div class="unsuscribedList__buttonWrapper">
                                    <button class="unsuscribedList__button">
                                        Darme de alta en Espresso
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div class="separator"></div>
                        <div class="unsuscribedList__newsletter">
                            <header class="unsuscribedList__header">
                                <h3 class="unsuscribedList__title">VANITATIS | DIARIA<h3>
                            </header>
                            <section class="unsuscribedList__body">
                                <figure class="unsuscribedList__imageWrapper">
                                    <img src="img/newsletter/vanitatis.png" alt="newsletter-image" class="unsuscribedList__image"/>
                                </figure>
                                <h2 class="unsuscribedList__description">
                                La crónica social nacional  y las historias más divertidas de las celebridades internacionales
                                </h2>
                                <div class="unsuscribedList__buttonWrapper">
                                    <button class="unsuscribedList__button">
                                        Darme de alta en Vanitatis
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div class="separator"></div>
                        <div class="unsuscribedList__newsletter">
                            <header class="unsuscribedList__header">
                                <h3 class="unsuscribedList__title">COTIZALIA | DIARIA<h3>
                            </header>
                            <section class="unsuscribedList__body">
                                <figure class="unsuscribedList__imageWrapper">
                                    <img src="img/newsletter/cotizalia.png" alt="newsletter-image" class="unsuscribedList__image"/>
                                </figure>
                                <h2 class="unsuscribedList__description">
                                Las claves económicas, los movimientos del mercado y el rastro del dinero en la newsletter de Cotizalia
                                </h2>
                                <div class="unsuscribedList__buttonWrapper">
                                    <button class="unsuscribedList__button">
                                        Darme de alta en Cotizalia
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="separator--big"></div>
                </section>
                <section class="newsletterContainer__buttonWrapper">
                <a href="/invita" class="newsletterContainer__button">Siguiente</a>
                </section>
            </main>
        `;
    }
}


if (!customElements.get('newsletters-view')) { customElements.define('newsletters-view', Newsletters); }