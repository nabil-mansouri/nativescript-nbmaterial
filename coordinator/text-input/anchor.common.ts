import { Behaviour } from "../behaviours/behaviour";
import { View, layout } from "tns-core-modules/ui/core/view";
import { EditableTextBase } from "tns-core-modules/ui/editable-text-base";
import { ScrollView } from "tns-core-modules/ui/scroll-view";
import { Property } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { TextLayout } from "nativescript-nbmaterial-textinput";
import * as def from "./anchor";
import { getKeyboardListener, KeyboardState } from "nativescript-nbmaterial-layouts/form";//AUGMEN PAGE
import "nativescript-nbmaterial-layouts/style";//AUGMEN PAGE
import "../coordinator";//AUGMENT VIEW ADDOBSERVER



const strategyAutogrow: symbol = Symbol("Strategy.Autogrow");
const strategyTop: symbol = Symbol("Strategy.Top");
const strategyBottom: symbol = Symbol("Strategy.Bottom");
const strategyMiddle: symbol = Symbol("Strategy.Middle");
const strategyVisible: symbol = Symbol("Strategy.Visible");

export abstract class AnchorBehaviour implements Behaviour {
    focusInCall = null;
    focusOutCall = null;
    keyboardCall = null;
    focused = false;
    view: TextLayout;
    scrollView: ScrollView;
    autogrowFator = 1;
    constructor(protected strategies: symbol[], protected scrollViewId: string) { }
    onCreate?() { }
    onInitNative?() {

    }
    onDispose?() {
    }
    [strategyAutogrow]() {
        let scrollheigt = this.getScrollheightVisible() * this.autogrowFator;
        let layoutHeight = this.view.getActualSize().height;
        let textHeight = this.view.textField.getActualSize().height;
        let maxHeight = scrollheigt - layoutHeight + textHeight;
        this.view.textField.maxHeight = maxHeight;
    }
    [strategyTop]() {
        let topView = this.view.getLocationOnScreen().y;
        let topScroll = this.scrollView.getLocationOnScreen().y;
        let diffTop = topScroll - topView;
        if (0 < diffTop) { //TOPVIEW LOWER THAN SCROLL SO UP
            let next = this.scrollView.verticalOffset - diffTop;
            this.scrollView.scrollToVerticalOffset(next, true)
        } else if (diffTop < 0) { //TOPVIEW GREATER THAN SCROLL SO DOWN
            let next = this.scrollView.verticalOffset - diffTop;
            this.scrollView.scrollToVerticalOffset(next, true)
        }
    }
    [strategyBottom]() {
        let topView = this.view.getLocationOnScreen().y;
        let topScroll = this.scrollView.getLocationOnScreen().y;
        let heightView = this.view.getActualSize().height;
        let heightScroll = this.getScrollheightVisible();
        let bottomView = topView + heightView;
        let bottomScroll = topScroll + heightScroll;
        let diffBottom = bottomScroll - bottomView;
        if (diffBottom < 0) { //BOTTOMVIEW LOWER THAN SCROLL SO UP
            let next = this.scrollView.verticalOffset - diffBottom;
            this.scrollView.scrollToVerticalOffset(next, true)
        } else if (0 < diffBottom) { //BOTTOMVIEW GREATER THAN SCROLL SO DOWN
            let next = this.scrollView.verticalOffset - diffBottom;
            this.scrollView.scrollToVerticalOffset(next, true)
        }
    }
    [strategyMiddle]() {
        let topView = this.view.getLocationOnScreen().y;
        let topScroll = this.scrollView.getLocationOnScreen().y;
        let heightView = this.view.getActualSize().height / 2;
        let heightScroll = this.getScrollheightVisible() / 2;
        let centerView = topView + heightView;
        let centerScroll = topScroll + heightScroll;
        let diffCenter = centerScroll - centerView;
        if (diffCenter < 0) { //MIDDLEVIEW LOWER THAN MIDDLESCROLL SO UP
            let next = this.scrollView.verticalOffset - diffCenter;
            this.scrollView.scrollToVerticalOffset(next, true)
        }
    }
    [strategyVisible]() {
        if (this.isFullyVisible()) {
        } else {
            let topView = this.view.getLocationOnScreen().y;
            let topScroll = this.scrollView.getLocationOnScreen().y;
            let heightView = this.view.getActualSize().height;
            let heightScroll = this.getScrollheightVisible();
            let bottomView = topView + heightView;
            let bottomScroll = topScroll + heightScroll;
            let diffTop = Math.abs(topView - topScroll);
            let diffBottom = Math.abs(bottomView - bottomScroll);
            if (diffTop < diffBottom) {
                let next = this.scrollView.verticalOffset - diffTop;
                this.scrollView.scrollToVerticalOffset(next, true)
            } else {
                let next = this.scrollView.verticalOffset + diffBottom;
                this.scrollView.scrollToVerticalOffset(next, true)
            }
        }
    }
    abstract getScrollheightVisible(): number;
    abstract isFullyVisible(): boolean;
    try() {
        if (getKeyboardListener().getKeyboardState() == KeyboardState.Visible && this.focused) {
            this.strategies.forEach(element => {
                this[element]();
            });
        }
    }
    onLoaded?() {
        this.scrollView = <any>this.view.page.getViewById(this.scrollViewId);
        if (!this.scrollView) {
            throw "Could not find scroll view with id: " + this.scrollViewId;
        }
        this.focusInCall = () => {
            this.focused = true;
            this.try();
        };
        this.focusOutCall = () => {
            this.focused = false;
        };
        this.keyboardCall = (e) => {
            this.try();
        }
        getKeyboardListener().onKeyboard(this.keyboardCall);
        this.view.textField.on(EditableTextBase.focusEvent, this.focusInCall);
        this.view.textField.on(EditableTextBase.blurEvent, this.focusOutCall);
    }
    onUnloaded?() {
        this.scrollView = null;
        getKeyboardListener().offKeyboard(this.keyboardCall);
        this.view.textField.off(EditableTextBase.focusEvent, this.focusInCall);
        this.view.textField.off(EditableTextBase.blurEvent, this.focusOutCall);
    }
    static init(strategies: symbol[], scrollViewId: string): AnchorBehaviour {
        throw "init has not been overriden!";
    }
}

export const anchorProperty = new Property<TextLayout, string>({
    name: "anchor",
    valueChanged: (view, oldVal, newVal) => {
        let values = newVal.replace(/\s+/g, ' ').split(" ");
        let strategies = [];
        let direction = values[0];
        let scrollView = values[1];
        let autogrow = values[2];
        let autogrowFactor = values[3];
        switch (direction) {
            case "bottom":
                strategies.push(strategyBottom);
                break;
            case "middle":
                strategies.push(strategyMiddle);
                break;
            case "top":
                strategies.push(strategyTop);
                break;
            case "visible":
                strategies.push(strategyVisible);
                break;
            default:
                throw "Could not find anchor strategy for: " + newVal;
        }
        autogrow == "autogrow" && strategies.push(strategyAutogrow);
        let behav = AnchorBehaviour.init(strategies, scrollView);
        (!isNaN(<any>autogrowFactor)) && (behav.autogrowFator = parseFloat(autogrowFactor));
        view.addBehaviour(behav)
    }
});
anchorProperty.register(TextLayout);