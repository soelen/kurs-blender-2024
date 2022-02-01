import { html, css, LitElement } from 'lit';
import { Workbox } from 'workbox-window';

class WmWorkbox extends LitElement {

    static properties = {
        _hasUpdate: { type: Boolean, state: true, },
    };

	_workbox;

    static get styles() {
	    return css`
			:host {
				display: block;
			}
		    #update {
				all: unset;
				background: white;
				padding: 16px;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				transform: translateY( -100% );
				transition: transform 200ms ease;
				color: black;
        cursor: pointer;
		    }
		    #update[has-update] {
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

		if ('serviceWorker' in navigator) {

			this._workbox = new Workbox( '/sw.js' );

			this._workbox.addEventListener('waiting', (event) => {
				this._hasUpdate = true;
			});

			this._workbox.addEventListener( 'installed', ( event ) => {
				if (!event.isUpdate) {
					console.log( 'First-installed code goes here...' );
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
      id="update"
      ?has-update="${ this._hasUpdate }"
      type="button"
      @click="${ this._onClick }"
      >Ein neues Update ist verfügbar! Klicke <u>hier</u> um die Software zu aktualisieren.</button>
        `;
    }



}
customElements.define( 'wm-workbox', WmWorkbox );
