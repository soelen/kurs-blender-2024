class WmBluetooth extends HTMLElement {
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'closed'});
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <div>
                <!--Healine-->
                <p>Rating</p>
                <!--rating-stars-->
                <div class="rating-stars">
                    <div class="rating-star star-1"></div>
                    <div class="rating-star star-2"></div>
                    <div class="rating-star star-3"></div>
                    <div class="rating-star star-4"></div>
                    <div class="rating-star star-5"></div>
                </div>
            </div>
        `;
    }
    

}
customElements.define( 'wm-bluetooth', WmBluetooth );