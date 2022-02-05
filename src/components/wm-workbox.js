import { html, css, LitElement } from 'lit';
import { Workbox } from 'workbox-window';

class WmWorkbox extends LitElement {

  static properties = {
    _hasUpdate: { type: Boolean, state: true, },
    _installed: { type: Boolean, state: true, },
  };

_workbox;

static get styles() {
  return css`
  :host *, :host::after, :host::before,
  *, ::after, ::before {
    box-sizing: border-box;
  }

  :host {
    display: block;
    position: fixed;
    top: 16px;
    right:16px;
    left: 16px;

  }

  button {
    display: block;
    width: 100%;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    background: white;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    position: absolute;
    transform: translateY( -100% ) translateY( -16px );
    transition: transform 200ms ease;
  }
  button[has-update], button[installed] {
    transform: translateY( 0 );
  }
    `;
  }

  _onClick( event ) {
    this._workbox.addEventListener('controlling', (event) => {
      window.location.reload();
    });
    this._workbox.messageSW( { type: 'SKIP_WAITING' } );
  }

  constructor() {

    super();

    if ( 'serviceWorker' in navigator ) {

      this._workbox = new Workbox( '/sw.js' );

      this._workbox.addEventListener('waiting', (event) => {
        this._hasUpdate = true;
      });

      this._workbox.addEventListener( 'installed', ( event ) => {
        if (!event.isUpdate) {

          this._installed = true;

          const timeout = setTimeout( () => {

            this._installed = false;

          }, 6000 );
        }
      } );
      this._workbox.register()
        .catch( ( error ) => {
          console.error( error );
      });
    }
}

  render() {
    return html`
      <button
      type="button"
      ?has-update="${ this._hasUpdate }"
      @click="${ this._onClick }"
      >
        Ein neues Update ist verfügbar!
        Klicke <u>hier</u> um die Software zu aktualisieren.
      </button>
      <button
      type="button"
      ?installed="${ this._installed }"
      @click="${ this._onClick }"
      >
        Die Präsentation wurde installiert!
      </button>
    `;
  }



}
customElements.define( 'wm-workbox', WmWorkbox );
