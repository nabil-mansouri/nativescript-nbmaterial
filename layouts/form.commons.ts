import { Observable } from "data/observable";
import { EditableTextBase } from "ui/editable-text-base";
import { Page } from "ui/page";
import * as def from "./form";
export * from "./form";


export enum KeyboardState {
    Unknown, Visible, Hidden
}

export abstract class KeyboardListenerImpl implements def.KeyboardListener {
    static focusEvent = "focusEvent";
    static keyboardEvent = "keyboardEvent";
    protected activeField: EditableTextBase = null;
    protected listeningFocus = false;
    protected listeningKeyboard = false;
    protected everyFocusObs: Observable = null;
    protected keyboardShown: boolean;
    protected keyboardObservable: Observable = null;
    protected size: def.KeyboardSize = null;
    /**
     * FOCUS
     */
    protected getEveryFocusObs() {
        if (this.everyFocusObs == null) {
            this.everyFocusObs = new Observable();
        }
        return this.everyFocusObs;
    }
    getActiveField(): EditableTextBase {
        if (this.listeningFocus) {
            return this.activeField;
        } else {
            throw "Should listen all focus to get active field!";
        }
    }
    isListeningKeyboard(): boolean {
        return this.listeningKeyboard;
    }
    isListeningFocus(): boolean {
        return this.listeningFocus;
    }
    listenFocus() {
        if (this.listeningFocus) {
            return;
        }
        /** */
        const selfRef = new WeakRef(this);
        const everyFocusIn = function (e: def.EventDataFocus) {
            const self = selfRef.get();
            if (self) {
                e.eventName = KeyboardListenerImpl.focusEvent;
                e.focusType = "focusin";
                self.activeField = <any>e.object;
                self.getEveryFocusObs().notify(e)
            }
        }
        const everyFocusOut = function (e: def.EventDataFocus) {
            const self = selfRef.get();
            if (self) {
                e.eventName = KeyboardListenerImpl.focusEvent;
                e.focusType = "focusout";
                if (self.activeField === e.object) {
                    self.activeField = null;
                }
                self.getEveryFocusObs().notify(e)
            }
        }
        const oldLoaded = EditableTextBase.prototype.onLoaded;
        EditableTextBase.prototype.onLoaded = function () {
            const self: EditableTextBase = this;
            oldLoaded.apply(self, arguments);
            const parent = selfRef.get();
            if (parent && parent.getEveryFocusObs().hasListeners(KeyboardListenerImpl.focusEvent)) {
                self.on(EditableTextBase.focusEvent, everyFocusIn);
                self.on(EditableTextBase.blurEvent, everyFocusOut);
            }
        }
        const oldUnLoaded = EditableTextBase.prototype.onUnloaded;
        EditableTextBase.prototype.onUnloaded = function () {
            const self: EditableTextBase = this;
            oldUnLoaded.apply(self, arguments);
            self.off(EditableTextBase.focusEvent, everyFocusIn);
            self.off(EditableTextBase.blurEvent, everyFocusOut);
            const parent = selfRef.get();
            if (parent && parent.activeField === self) {
                parent.activeField = null;
            }
        }
        this.listeningFocus = true;
    }
    unlistenFocus() {
        //IMPOSSIBLE TO UNLISTEN
        //this.listeningFocus = false;
    }
    onEveryFocus(callback: (c: def.EventDataFocus) => void, thisArg?: any) {
        this.getEveryFocusObs().on(KeyboardListenerImpl.focusEvent, callback, thisArg);
    }
    offEveryFocus(callback: (c: def.EventDataFocus) => void) {
        this.getEveryFocusObs().off(KeyboardListenerImpl.focusEvent, callback);
        if (!this.getEveryFocusObs().hasListeners(KeyboardListenerImpl.focusEvent)) {
            this.unlistenFocus();
        }
    }
    /**
     * 
     * KEYBOARD
     */
    abstract listenKeyBoard();
    abstract unlistenKeyBoard();
    getKeyboardSizePx(): def.KeyboardSize {
        return this.size;
    }
    protected getKeyboardObs() {
        if (this.keyboardObservable == null) {
            this.keyboardObservable = new Observable();
        }
        return this.keyboardObservable;
    }
    getKeyboardState(): def.KeyboardState {
        if (this.keyboardShown == null) {
            return def.KeyboardState.Unknown;
        } else if (this.keyboardShown) {
            return def.KeyboardState.Visible;
        } else {
            return def.KeyboardState.Hidden;
        }
    }
    onKeyboard(callback: (c: def.EventDataKeyboard) => void) {
        this.listenKeyBoard();
        this.listeningKeyboard = true;
        this.getKeyboardObs().on(KeyboardListenerImpl.keyboardEvent, callback);
    }
    offKeyboard(callback: (c: def.EventDataKeyboard) => void) {
        this.getKeyboardObs().off(KeyboardListenerImpl.keyboardEvent, callback);
        if (!this.getKeyboardObs().hasListeners(KeyboardListenerImpl.keyboardEvent)) {
            this.unlistenKeyBoard();
            this.listeningKeyboard = false;
        }
    }
    onNextKeyboard(callback: (c: def.EventDataKeyboard) => void) {
        let fakeCall = (e) => {
            callback(e);
            this.offKeyboard(fakeCall);
        };
        this.onKeyboard(fakeCall);
    }
    protected sendShowKeyboard(size: def.KeyboardSize) {
        this.size = size;
        this.keyboardShown = true;
        let event: def.EventDataKeyboard = {
            eventName: KeyboardListenerImpl.keyboardEvent,
            object: null,
            type: "show"
        };
        this.getKeyboardObs().notify(event);
    }
    protected sendHideKeyboard() {
        this.size = null;
        this.keyboardShown = false;
        let event: def.EventDataKeyboard = {
            eventName: KeyboardListenerImpl.keyboardEvent,
            object: null,
            type: "hide"
        };
        this.getKeyboardObs().notify(event);
    }
    static init(): def.KeyboardListener {
        throw "init should be overriden!";
    }
}

let keyboardListener = null;
export function getKeyboardListener(): def.KeyboardListener {
    if (keyboardListener == null) {
        keyboardListener = KeyboardListenerImpl.init();
    }
    return keyboardListener;
}

