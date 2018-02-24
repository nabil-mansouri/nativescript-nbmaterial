# Nativescript implementation of the Material TextInput

The module implement Material calendar on both platforms iOS and Android.
The calendar implements slide transition effects.
The pager lets you change months using a swipe.

The module provide some css class:
- fullwidth : a full width text input (no margin, no borders...)
- dense: a smell input
- error: display text in red (add this class when the field is on error)

This module provide animation effect for float labels.

```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd"  xmlns:ti="nativescript-nbmaterial-textinput">
 	<ti:TextLayout rows="auto,auto" id="textinput" class="fullwidth dense">
        <ti:TextPlaceholder text="TopFix Height"></ti:TextPlaceholder>
        <ti:MultiLine hint="" text="{{textInput}}" editable="true" maxHeight="100"/>			
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="textinput1" class="fullwidth dense error">
        <ti:TextPlaceholder text="Middle0"></ti:TextPlaceholder>
        <TextField hint="" text="{{textInput1}}"/>
        <Label text="Erreur de saisie" textWrap="true" class="error" />			
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="textinput2" class="fullwidth dense">
        <ti:TextPlaceholder text="Middle1"></ti:TextPlaceholder>
        <TextField hint="Saisis" text="{{textInput2}}"/>		
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="textinput3" class="fullwidth dense">
        <ti:TextPlaceholder text="Middle2"></ti:TextPlaceholder>
        <TextField hint="Saisis" text="{{textInput3}}"/>		
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="textinput4" class="fullwidth dense">
        <ti:TextPlaceholder text="Middle3"></ti:TextPlaceholder>
        <TextField hint="Saisis" text="{{textInput4}}"/>		
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="autogrow" class="fullwidth dense">
        <ti:TextPlaceholder text="Top Autogrow"></ti:TextPlaceholder>
        <ti:MultiLine hint="" text="{{autogrow}}" editable="true"/>			
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="visible" class="fullwidth dense">
        <ti:TextPlaceholder text="Visible"></ti:TextPlaceholder>
        <TextField hint="Saisis gros" text="{{visible}}"/>		
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="textinput5" class="fullwidth dense">
        <ti:TextPlaceholder text="Bottom"></ti:TextPlaceholder>
        <TextField hint="Saisis gros" text="{{textInput5}}"/>		
    </ti:TextLayout>
    <ti:TextLayout rows="auto,auto" id="autogrowb" class="fullwidth dense">
        <ti:TextPlaceholder text="Bottom AutoGrow"></ti:TextPlaceholder>
        <ti:MultiLine hint="Saisis gros" text="{{autogrowb}}"/>		
    </ti:TextLayout>
</Page>

}
```
 
The TextLayout has this interface:
```typescript
export declare class TextLayout extends LayoutBase {
    focused: boolean;  
    hasText: boolean;
}
export declare class SingleLine extends TextField {
}
export declare class MultiLine extends TextView {  
} 
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)