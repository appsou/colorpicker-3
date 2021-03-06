/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface SoonColorpicker {
    /**
    * Image palette for the colorpicker. You can use any color palette as you want. For example: https://www.color-hex.com/color-palettes/
    */
    'image': string;
    /**
    * Method to manually close the color palette.
    */
    'soonClose': () => void;
    /**
    * Method to manually open the color palette.
    */
    'soonOpen': () => void;
    /**
    * Value as a string represent the color in hexadecimal with #.
    */
    'value': string;
  }
  interface SoonColorpickerAttributes extends StencilHTMLAttributes {
    /**
    * Image palette for the colorpicker. You can use any color palette as you want. For example: https://www.color-hex.com/color-palettes/
    */
    'image'?: string;
    /**
    * Emitted when the input loses focus.
    */
    'onSoonBlur'?: (event: CustomEvent<void>) => void;
    /**
    * Emitted when the value has changed.
    */
    'onSoonChange'?: (event: CustomEvent<any>) => void;
    /**
    * Emitted when the input has focus.
    */
    'onSoonFocus'?: (event: CustomEvent<void>) => void;
    /**
    * Value as a string represent the color in hexadecimal with #.
    */
    'value'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'SoonColorpicker': Components.SoonColorpicker;
  }

  interface StencilIntrinsicElements {
    'soon-colorpicker': Components.SoonColorpickerAttributes;
  }


  interface HTMLSoonColorpickerElement extends Components.SoonColorpicker, HTMLStencilElement {}
  var HTMLSoonColorpickerElement: {
    prototype: HTMLSoonColorpickerElement;
    new (): HTMLSoonColorpickerElement;
  };

  interface HTMLElementTagNameMap {
    'soon-colorpicker': HTMLSoonColorpickerElement
  }

  interface ElementTagNameMap {
    'soon-colorpicker': HTMLSoonColorpickerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
