import { html, css, LitElement } from 'lit';

class WmYoutube extends LitElement {

    static properties = {
      _hash: { type: String, state: true, },
      _visible: { type: Boolean, state: true },
    };

    static get styles() {
	    return css`
        :host {
          display: block;
        }
        video,
        iframe {
          width: 100% !important;
          max-width: 800px;
          min-height: 400px;
          height: auto !important;
        }
	    `;
    }

    constructor() {

      super();

		}

    firstUpdated() {

      const observer = new IntersectionObserver( (entries) => {
        if(entries[0]['intersectionRatio'] == 0) {
          this._visible = false;
        }
        else {
          this._visible = true;
        }
      } );
      observer.observe( this );

    }

    _updateHash( event ) {
      const slot = this.shadowRoot.querySelector( 'slot' );
      const nodes = slot.assignedNodes();
      const url = nodes[ 0 ] ? new URL( nodes[ 0 ].textContent ) : '';
      const hash = url ? url.searchParams.get('v') : '';
      if( hash ) this._hash = hash;
    }

    render() {
      return html`

        ${ this._visible && this._hash ? html`
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${ this._hash }"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        ` : html``
        }
        <div >
          <slot hidden @slotchange="${ this._updateHash }"></slot>
        </div>
      `;
    }



}
customElements.define( 'wm-youtube', WmYoutube );
