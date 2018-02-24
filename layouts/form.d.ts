import { EditableTextBase } from "ui/editable-text-base";
import { EventData } from "data/observable";

export interface EventDataFocus extends EventData {
    focusType: "focusin" | "focusout";
}
export interface EventDataKeyboard extends EventData {
    type: "show" | "hide";
}
export interface KeyboardSize {
    top: number;
    left: number;
    width: number;
    height: number;
}
export enum KeyboardState {
    Unknown, Visible, Hidden
}
export interface KeyboardListener {
    getKeyboardState(): KeyboardState;
    getActiveField(): EditableTextBase;
    isListeningKeyboard(): boolean;
    isListeningFocus(): boolean;
    getKeyboardSizePx(): KeyboardSize;
    onEveryFocus(callback: (c: EventDataFocus) => void, thisArg?: any);
    offEveryFocus(callback: (c: EventDataFocus) => void);
    onKeyboard(callback: (c: EventDataKeyboard) => void, thisArg?: any);
    offKeyboard(callback: (c: EventDataKeyboard) => void);
    onNextKeyboard(callback: (c: EventDataKeyboard) => void);
}

export function getKeyboardListener(): KeyboardListener;