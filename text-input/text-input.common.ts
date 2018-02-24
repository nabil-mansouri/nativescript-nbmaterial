import { PropertyChangeData } from 'tns-core-modules/data/observable';
import { addWeakEventListener } from 'ui/core/weak-event-listener';
import { Property, Style, CssProperty, isIOS, Color, ViewBase } from 'tns-core-modules/ui/core/view';
import { EditableTextBase, textProperty } from 'tns-core-modules/ui/editable-text-base';
import { View, booleanConverter } from 'tns-core-modules/ui/core/view';
import { TextView } from 'tns-core-modules/ui/text-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { WrapLayout } from 'tns-core-modules/ui/layouts/wrap-layout';
import { Label } from 'tns-core-modules/ui/label';
import { GestureTypes } from 'tns-core-modules/ui/gestures';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { SingleLine as SingleLineDef, TextLayout as TextLayoutDef, MultiLine as MultiLineDef, TextPlaceholder as TextPlaceholderDef } from "./text-input";
import { DimUtils } from "nativescript-nbmaterial-commons";
import "nativescript-nbmaterial-layouts/layouts";
import "nativescript-nbmaterial-layouts/style";


export abstract class TextLayout extends WrapLayout implements TextLayoutDef {
    focused = false;
    focusIn: () => void;
    focusOut: () => void;
    onTap = null;
    textChanged: (data: PropertyChangeData) => void;
    get placeholder(): TextPlaceholder {
        for (let i = 0; i < this.getChildrenCount(); i++) {
            let child = this.getChildAt(i);
            if (child instanceof TextPlaceholder) {
                return child;
            }
        }
        return null;
    }
    get textField(): EditableTextBase {
        for (let i = 0; i < this.getChildrenCount(); i++) {
            let child = this.getChildAt(i);
            if (child instanceof EditableTextBase) {
                return child;
            }
        }
        return null;
    }
    try() {
        if (!this.focused) {
            if (this.hasText) {
                this.placeholder.up(this.textField);
            } else {
                this.placeholder.down(this.textField);
            }
        }
    }
    onLoaded() {
        super.onLoaded();
        this.onFirstLayout(() => {
            this.try();
        });
        this.onTap = () => {
            //MUST TIMEOUT TO WORK
            setTimeout(() => {
                this.textField.focus();
            })
        }
        this.on(GestureTypes.tap, this.onTap);
        if (this.textField) {
            //CALLBACK
            this.focusIn = () => {
                this.focused = true;
                this.placeholder.up(this.textField);
            }
            this.focusOut = () => {
                this.focused = false;
                //IN FACT SHOULD ALREADY UP
                this.try();
            }
            this.textChanged = () => {
                this.try();
            }
            this.textField.on(EditableTextBase.focusEvent, this.focusIn)
            this.textField.on(EditableTextBase.blurEvent, this.focusOut)
            this.textField.on("textChange", this.textChanged)
        }
    }
    onUnloaded() {
        super.onUnloaded();
        this.off(GestureTypes.tap, this.onTap);
        if (this.textField) {
            this.textField.off(EditableTextBase.focusEvent, this.focusIn)
            this.textField.off(EditableTextBase.blurEvent, this.focusOut)
            this.textField.off("textChange", this.textChanged)
        }
    }
    get hasText() {
        let field = this.textField;
        return field.text && field.text.length > 0;
    }
}
export class TextPlaceholder extends Label implements TextPlaceholderDef {
    state: "up" | "down" | "moving" = "up";
    initNativeView() {
        super.initNativeView();
        this.width = "auto";
    }
    up(field: EditableTextBase) {
        if (this.state == "down") {
            const old = this.state;
            this.state = "moving";
            this.animate({ translate: { x: 0, y: 0 }, scale: { x: 1, y: 1 }, curve: AnimationCurve.easeInOut, duration: 250 }).then(() => {
                this.state = "up";
                field["oldHint"] && (field.hint = field["oldHint"]);
            }).catch(() => {
                this.state = old;
            })
        }
    }
    down(field: EditableTextBase) {
        if (this.state == "up") {
            const old = this.state;
            this.state = "moving";
            const failed = (e) => { console.error(e); this.state = old; };
            try {
                if (field.hint) {
                    field["oldHint"] = field.hint;
                    field.hint = "";
                }
                let fieldBounds = DimUtils.toBounds(field, <any>this.parent);
                fieldBounds.origin.top += field.effectivePaddingTop ? field.effectivePaddingTop : 0;
                fieldBounds.size.height -= field.effectivePaddingTop ? field.effectivePaddingTop : 0;
                fieldBounds.size.height -= field.effectivePaddingBottom ? field.effectivePaddingBottom : 0;
                let myBounds = DimUtils.toBounds(this, <any>this.parent);
                let ratio = field.fontSize / this.fontSize;
                let futurWidth = myBounds.size.width * ratio;
                let paddingLeft = (futurWidth - myBounds.size.width) / 2;
                let centerOfMe = DimUtils.centerOf(myBounds);
                let centerOfFields = DimUtils.centerOf(fieldBounds);
                let vector = DimUtils.vector(centerOfMe, centerOfFields);
                this.animate({ translate: { x: paddingLeft, y: vector.top }, scale: { x: ratio, y: ratio }, curve: AnimationCurve.easeOut, duration: 125 }).then(() => {
                    this.state = "down";
                }).catch(failed);
            } catch (e) {
                failed(e);
            }
        }
    }
}

export class SingleLine extends TextField implements SingleLineDef {
}
export class MultiLine extends TextView implements MultiLineDef {
}