import { Color, Style, PercentLength } from 'tns-core-modules/ui/core/view';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { EditableTextBase } from 'tns-core-modules/ui/editable-text-base';
import { TextView } from 'tns-core-modules/ui/text-view/text-view';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { Label } from 'tns-core-modules/ui/label';

export declare class TextLayout extends LayoutBase {
    focused: boolean;
    placeholder: TextPlaceholder;
    textField: EditableTextBase;
    try();
    hasText: boolean;

}
export declare class SingleLine extends TextField {
}
export declare class MultiLine extends TextView {  
}
export declare class TextPlaceholder extends Label {
    state: "up" | "down" | "moving";
    up(field: EditableTextBase);
    down(field: EditableTextBase);
} 