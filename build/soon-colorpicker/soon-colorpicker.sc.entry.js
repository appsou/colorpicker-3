/*! Built with http://stenciljs.com */
const { h } = window.SoonColorpicker;

class Colorpicker {
    constructor() {
        this.opened = false;
        this.hasFocus = false;
        /**
         * Value as a string represent the color in hexadecimal with #.
         */
        this.value = null;
    }
    /**
     * Method to manually close the color palette.
     */
    soonClose() {
        this.onBlur();
    }
    /**
     * Method to manually open the color palette.
     */
    soonOpen() {
        this.opened = true;
        this.onFocus();
    }
    valueChange() {
        this._initColor();
    }
    imageChange(newImage) {
        if (newImage) {
            this._initCanvas();
        }
    }
    handleEnter() {
        this.soonOpen();
    }
    handleESC() {
        this.soonClose();
    }
    componentDidLoad() {
        this._initColor();
        this._initCanvas();
        // Bind host event focus and Blur for tabIndex feature
        this.el.addEventListener('focus', () => {
            this.onFocus();
        });
        this.el.addEventListener('blur', () => {
            this.onBlur();
        });
    }
    onBlur() {
        this.hasFocus = false;
        this.opened = false;
        this.soonBlur.emit();
    }
    onFocus() {
        this.hasFocus = true;
        this.soonFocus.emit();
    }
    hasValue() {
        return this.value !== null && this.value !== undefined && this.value !== '';
    }
    hostData() {
        return {
            role: 'colorpicker',
            tabIndex: 0,
            interactive: true,
            class: {
                'has-value': this.hasValue(),
                'has-focus': this.hasFocus
            }
        };
    }
    render() {
        return [h("div", { class: "color", onClick: () => (this.opened = true) }), h("canvas", { class: `selector ${this.opened ? 'opened' : ''}` })];
    }
    _initColor() {
        const color = this.el.shadowRoot.querySelector('.color');
        if (color) {
            if (this.value) {
                color.style.backgroundColor = this.value;
            }
            else {
                // Reset backgroundColor
                color.style.backgroundColor = '#fafbfd';
            }
        }
    }
    _setColor(color) {
        this.value = color;
        this.opened = false;
        // emit value Change
        const value = this.value;
        this.soonChange.emit({ value });
    }
    _initCanvas() {
        const canvas = this.el.shadowRoot.querySelector('.selector');
        const color = this.el.shadowRoot.querySelector('.color');
        canvas.width = 150;
        canvas.height = 150;
        let selectorImage = new Image();
        selectorImage.crossOrigin = 'Anonymous';
        selectorImage.onload = function () {
            canvas.width = selectorImage.width;
            canvas.height = selectorImage.height;
            canvas.getContext('2d').drawImage(selectorImage, 0, 0, selectorImage.width, selectorImage.height);
            // Center canvas on top of color
            canvas.style.left = '-' + (selectorImage.width / 2 - color.clientWidth / 2) + 'px';
        };
        selectorImage.src = this.image;
        canvas.onmousedown = (event) => {
            event.preventDefault();
            event.stopPropagation();
            var offset = event.target.getBoundingClientRect(), colorData = canvas.getContext('2d').getImageData(event.clientX - offset.left, event.clientY - offset.top, 1, 1).data;
            const colorPicked = this._rgbToHex('rgb(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ')');
            this._setColor(colorPicked);
        };
    }
    /**
     * Convert rgb to hex
     */
    _rgbToHex(rgb) {
        var result = rgb.match(/\d+/g);
        function hex(x) {
            var digits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
            return isNaN(x) ? '00' : digits[(x - (x % 16)) / 16] + digits[x % 16];
        }
        return '#' + hex(result[0]) + hex(result[1]) + hex(result[2]);
    }
    static get is() { return "soon-colorpicker"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "hasFocus": {
            "state": true
        },
        "image": {
            "type": String,
            "attr": "image",
            "watchCallbacks": ["imageChange"]
        },
        "opened": {
            "state": true
        },
        "soonClose": {
            "method": true
        },
        "soonOpen": {
            "method": true
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChange"]
        }
    }; }
    static get events() { return [{
            "name": "soonBlur",
            "method": "soonBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "soonFocus",
            "method": "soonFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "soonChange",
            "method": "soonChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "keydown.enter",
            "method": "handleEnter"
        }, {
            "name": "keydown.escape",
            "method": "handleESC"
        }]; }
    static get style() { return ".sc-soon-colorpicker-h {\n  \n  display: inline-block;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: var(--element-size, 32px);\n  height: var(--element-size, 32px);\n  border-radius: 50%;\n  padding: 2px;\n  background: #fff;\n  -webkit-box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);\n  vertical-align: middle; }\n  .sc-soon-colorpicker-h   .color.sc-soon-colorpicker {\n    display: block;\n    width: calc(var(--element-size, 32px) - 4px);\n    height: calc(var(--element-size, 32px) - 4px);\n    border-radius: 50%;\n    background: #fafbfd;\n    cursor: pointer; }\n  .sc-soon-colorpicker-h   .selector.sc-soon-colorpicker {\n    position: absolute;\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    margin: auto;\n    top: 0;\n    bottom: 0;\n    cursor: crosshair;\n    -webkit-transition: all 0.2s ease-in-out;\n    transition: all 0.2s ease-in-out;\n    z-index: var(--element-zindex, 9999); }\n    .sc-soon-colorpicker-h   .selector.opened.sc-soon-colorpicker {\n      visibility: visible;\n      opacity: 1;\n      -webkit-transform: scale(1);\n      transform: scale(1); }\n\n.sc-soon-colorpicker-h:focus {\n  outline: none; }"; }
}

export { Colorpicker as SoonColorpicker };
