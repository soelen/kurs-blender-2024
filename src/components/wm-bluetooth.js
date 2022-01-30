import { html, css, LitElement, } from 'lit';
import { connect, print, disconnect, } from '../bluetooth';

class WmBluetooth extends LitElement {

    static properties = {
        _isConnected: {state: true, },
        _isConnecting: { state: true, },
        _text: { state: true, },
    };

    constructor() {
        super();
    }

    static get styles() { return css`
    *, ::after, ::before {
        box-sizing: border-box;
    }
    :host {
        display: block;
    }
        form {
        }
        #textarea-wrapper {
            padding: 16px;
            background: white;
            border-radius: 8px;
        }
        textarea {
            border: none;
            min-height: 200px;
        }
        textarea, button {
            text-align: left;
            margin-left: auto;
            margin-right: auto;
            resize: vertical;
            color: black;
            display: block;
            width: 100%;
            white-space: nowrap;
        }
        button[disabled] {
            opacity: .5;
        }
        button {
            all:unset;
            cursor: pointer;
            border-radius: 8px;
            text-transform: uppercase;
            background: white;
            padding: 8px 16px;
            font-size: 16px;
            color: black;
        }

        img {
            width: 16px;
        }

        button[hidden] {
            display: none;
        }

        #buttons {
            margin-top: 16px;
            display: flex;
            gap: 16px;
        }

        #buttons button:first-child {
            flex-grow: 1;
        }
    `;

    }

    render() {
        return html`
        <div style="border: 1px soldid pink;">
            <form @submit="${ ( event ) => {
                event.preventDefault();
                console.log('hello')
            }}">
                <div id="textarea-wrapper">
                    <textarea @input="${ event => {
                    this._text = event.currentTarget.value;
                    }}"></textarea>
                </div>
                <div id="buttons">
                    <button
                        ?hidden="${ !this._isConnected }"
                        type="button"
                        @click="${ event => {
                        disconnect();
                        this._isConnected = false;
                    }}">Trennen</button>
                    <button
                        ?hidden="${ this._isConnected }"
                        ?disabled="${ this._isConnecting }"
                        type="button"
                        @click="${ event => {
                            this._isConnecting = true;
                        connect().then( characteristic => {
                            this._isConnected = true;
                            this._isConnecting = false;
                        } ).catch( () => this._isConnecting = false ); }}"
                    >
                            <img src="/assets/icons/connect.svg" >
                        Verbinden</button>
                    <button
                        ?disabled="${ !this._isConnected }"
                        @click="${ event => print( this._text )}"
                    >
                            <img src="/assets/icons/send.svg" >
                    Senden</button>
                </div>
            </form>
        </div>
        `;
    }
    


}
customElements.define( 'wm-bluetooth', WmBluetooth );