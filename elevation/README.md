
# Elevation implementation for nbmaterial packages

The module implement elevation on both iOS and Android.
It augments nativescript Style/View and background.
This way you can define "elevation" property on DOM elements or in CSS.

```typescript
interface Style {
        elevation: number;
    }
interface Background {
        elevation: number;
    }
interface View {
        elevation: number;
        getElevationDefault(): number;
        setElevationNative(back: Background);
    }
```


[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)