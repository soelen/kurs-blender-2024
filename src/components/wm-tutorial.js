import { html, css, LitElement } from 'lit';

class WmTutorial extends LitElement {

    static properties = {
      tipps: { type: String, reflect: true, },
      _content: { type: Array, state: true, },
      _currentIndex: { type: Number, state: true, },
      _interval:{ type: Object, },
    };

    static get styles() {
	    return css`
        :host { display: block, }
	    `;
    }

    constructor() {

      super();
      this._currentIndex = 1;
      this._tipps = [];


      this._interval = setInterval( this._onInterval.bind( this ), 6000 );
		}

    firstUpdated() {

      const observer = new IntersectionObserver( (entries) => {
        if(entries[0]['intersectionRatio'] == 0 ) {
          this._visible = false;
        }
        else {
          this._visible = true;
        }
      } );
      observer.observe( this );

    }


    _onInterval() {
      if( this._content[ this._currentIndex + 1 ] ) {
        this._currentIndex += 1;
      } else {
        this._currentIndex = 0;
      }
    }


    update( changedProperties ) {
      if ( changedProperties.has( 'tipps' ) ) {
        this._content = this.tipps
          .split('.')
          .map( text => text.trim() )
          .filter( text => text )
          .map( text => `${ text }.` )

        this._currentIndex = 0;
      }

      super.update( changedProperties );
    }

    render() {
      return html`
        ${ this._content[ this._currentIndex ] ? this._content[ this._currentIndex ] : '' }
      `;
    }

}

customElements.define( 'wm-tutorial', WmTutorial );
