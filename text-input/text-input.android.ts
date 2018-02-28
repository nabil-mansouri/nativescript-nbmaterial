import { View, Property, InheritedCssProperty, isIOS, Color, Length, layout } from 'tns-core-modules/ui/core/view';
import { InheritedProperty } from 'tns-core-modules/ui/core/properties';
import { EditableTextBase } from 'tns-core-modules/ui/editable-text-base';
import { android as androidApp } from 'tns-core-modules/application';
import { TextField } from 'tns-core-modules/ui/text-field';
import { maxHeightProperty } from "nativescript-nbmaterial-layouts/style";
import * as common from "./text-input.common";

export * from "./text-input.common";

export class TextLayout extends common.TextLayout {
    createNativeView() {
        //SKIP FIRST EDIT FOCUS
        let native = <android.view.ViewGroup>super.createNativeView();
        native.setFocusableInTouchMode(true);
        native.setDescendantFocusability(android.view.ViewGroup.FOCUS_BEFORE_DESCENDANTS);
        return native;
    }
}
export class MultiLine extends common.MultiLine {
    get nativeUI(): android.widget.EditText { return this.nativeView; }
    [maxHeightProperty.setNative](length: Length) {
        if (!isNaN(<any>length)) {
            let temp = typeof length == "number" ? length : parseInt(<any>length); 
            this.nativeUI.setMaxHeight(layout.toDevicePixels(temp));
        }
    }
}