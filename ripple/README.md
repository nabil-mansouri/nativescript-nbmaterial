
# Ripple implementation for nbmaterial packages

The module implement material ripple on both iOS and Android.
It augments nativescript Style/View.
This way you can define "ripple" properties on DOM elements or in CSS.

It also include a Ripple Layout That let you make ripple outside from the component.

```typescript
    interface RippleOption {
        wrapper?: View;
        iosRadiusFactor?: number;
        androidHotBounds?: boolean;
    } 
    interface Style {
        rippleColor: Color;
        rippleAlpha: number;
        rippleDuration: number;
        fadeDuration: number;
    }  
    interface View {
        rippleColor: Color;
        rippleAlpha: number;
        rippleDuration: number;
        fadeDuration: number;
        startRippleNative(opts: RippleOption): Promise<any>;
    } 

    class RippleLayout extends AbsoluteLayout {
        perfomRipple(): Promise<any>;
    }
```


[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)