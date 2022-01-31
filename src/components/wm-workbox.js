import { html, css, LitElement } from 'lit'; 
import { Workbox } from 'workbox-window';

class WmWorkbox extends LitElement {

    static properties = {
        hasUpdate: { type: Boolean, reflect: true, },
    };

    static get styles() {
	    return css`
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
		    }
		    :host([hasupdate]) #update {
			transform: translateY( 0 );
		    }
	    `;
    }

    constructor() {

        super();

	const workbox = new Workbox( '/sw.js' );
	workbox.addEventListener( 'installed', ( event ) => {
		if (event.isUpdate) {
			this.hasUpdate = true;
		} else {
			console.log( 'First-installed code goes here...' );
		}
	} );

	workbox.register()
	.catch( ( error ) => {
		console.error( error );
	});
    }

    render() {
        return html`
	<button id="update" type="button" @click="${ event => {
		window.location.reload();
	}}">
	Neuer update verfügbar!
	</button>
        `;
    }
    


}
customElements.define( 'wm-workbox', WmWorkbox );