import { html, LitElement } from 'lit';
// const template = document.createElement('template');
// template.innerHTML = `
// <div>
//     <!--Healine-->
//     <p>Rating</p>
//     <!--rating-stars-->
// </div>
// `;
// 
import { connect, print, } from '../bluetooth';

class WmBluetooth extends LitElement {

    // _isConnected = false;
    // _text = '';

    static properties = {
        _isConnected: {state: true, },
        _text: { state: true, },
    };

    constructor() {
        super();
    }

    render() {
        return html`
        <form @submit="${ ( event ) => {
            event.preventDefault();
            console.log('hello')
        }}">
            <textarea @input="${ event => {
              this._text = event.currentTarget.value;
            }}"></textarea>
            <div>
                <button type="button" @click="${ event => {
                    console.log('yesll');
                    connect().then( characteristic => {
                        this._isConnected = true;
                        console.log( 'mission successful');
                    } );
                }}">Connect</button>
                <button ?disabled="${ !this._isConnected }" @click="${ event => {
                    print( this._text );
                    console.log('bb')
                }}">Send</button>
            </div>
        </form>
        `;
    }
    


}
customElements.define( 'wm-bluetooth', WmBluetooth );