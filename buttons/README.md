# Nativescript implementation of the Material Float buttons

The module implement Float buttons on both iOS and Android.
 

```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
xmlns:btn="nativescript-nbmaterial-buttons">
 		<btn:FloatButton row="0" id="floatbtn" afterTap="navigateForm" animNavigation="true" text="edit" />
</Page>

}
```
animNavigation make the button growing when the page load (or disappear when the page is unloading)


The button has this interface:
```typescript
export declare abstract class FloatButton extends View {
    static aftertapEvent: string;
    animNavigation: boolean;
    rippleColor: Color;
}
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)