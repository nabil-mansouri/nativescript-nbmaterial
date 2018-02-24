import { View, Property, InheritedCssProperty, isIOS, Color, layout } from 'tns-core-modules/ui/core/view';
import { PropertyChangeData } from 'tns-core-modules/data/observable';
import { addWeakEventListener } from 'ui/core/weak-event-listener';
import { EditableTextBase } from 'tns-core-modules/ui/editable-text-base';
import { android as androidApp } from 'tns-core-modules/application';
import { TextField } from 'tns-core-modules/ui/text-field';
import { TextView } from 'tns-core-modules/ui/text-view';
import * as common from "./text-input.common";
export * from "./text-input.common";



export class MultiLine extends common.MultiLine {
    protected focusIn: () => void;
    protected focusOut: () => void;
    protected textChanged: (data: PropertyChangeData) => void;
    get uiTextView(): UITextView { return this.nativeView; }
    get hasMaxHeight() {
        return (!isNaN(<any>this.maxHeight));
    }
    get maxHeightPx() {
        let temp = this.hasMaxHeight ? parseInt(<any>this.maxHeight) : 0;
        return layout.toDevicePixels(temp)
    }
    onLoaded() {
        super.onLoaded();
        this.uiTextView.textContainer.lineFragmentPadding = 0
        this.textChanged = () => {
            let max = this.hasMaxHeight ? this.maxHeightPx : 1000000;
            let inner = this.uiTextView.contentSize.height;
            let outer = this.uiTextView.frame.size.height;
            if (inner != outer && inner < max) {
                this.requestLayout();
            }
        }
        this.on("textChange", this.textChanged);
    }
    onUnloaded() {
        this.off("textChange", this.textChanged);
        super.onUnloaded();
    }
    layout(left: number, top: number, right: number, bottom: number) {
        super.layout(left, top, right, bottom);
        this.uiTextView.scrollRangeToVisible({ location: -1, length: 0 });
    }
}