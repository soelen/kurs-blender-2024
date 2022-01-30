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
    constructor() {
        super();
    }

    render() {
        return html`
        <form @submit="${ ( event ) => {
            event.preventDefault();
            console.log('hello')
        }}">
            <textarea>m</textarea>
            <div>
                <button type="button" @click="${ event => {
                    console.log('yesll');
                    connect();
                }}">Connect</button>
                <button @click="${ event => {
                    print('hello');
                    console.log('bb')
                }}">Send</button>
            </div>
        </form>
        `;
    }
    


}
customElements.define( 'wm-bluetooth', WmBluetooth );