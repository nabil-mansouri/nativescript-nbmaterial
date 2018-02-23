import { View, isIOS, booleanConverter, Property, Template } from "ui/core/view";
import { ObservableArray } from "data/observable-array";
import { PropertyChangeData } from 'tns-core-modules/data/observable';
import { AnimationCurve } from "ui/enums";
import { addWeakEventListener, removeWeakEventListener } from "ui/core/weak-event-listener";
import { Page } from "ui/page";
import { parse } from 'tns-core-modules/ui/builder';
import { GridLayout, ItemSpec } from "ui/layouts/grid-layout";
import { Label } from "ui/label";
import { GestureTypes, GestureEventData } from "ui/gestures";
import { TextField } from "ui/text-field";
import { SearchCallback } from "./search";

export class SearchBar extends GridLayout {
    callbacks: SearchCallback[] = [];
    register(c: SearchCallback) {
        this.callbacks.push(c);
    }
    unregister(toDel: SearchCallback) {
        this.callbacks = this.callbacks.filter(c => c != toDel);
    }
    initNativeView() {
        super.initNativeView();
        this.addColumn(new ItemSpec(1, "auto"));
        this.addColumn(new ItemSpec(1, "star"));
        this.addColumn(new ItemSpec(1, "auto"));
        this.addRow(new ItemSpec(0, "auto"));
    }
    clear() {
        this.field.text = "";
        this.callbacks.forEach(c => c.onClear());
    }
    cancel() {
        this.callbacks.forEach(c => c.onCancel());
    }
    submit(text: string) {
        this.callbacks.forEach(c => c.onSubmit(text));
    }
    changed(text: string) {
        this.callbacks.forEach(c => c.onText(text));
    }
    speech() {
        //TODO
    }
    get field(): SearchField {
        let field = null;
        this.eachChild(c => {
            if (c instanceof SearchField) {
                field = c;
            }
            return false;
        })
        return field;
    }
}

/**
 * 
 */
export class SearchField extends TextField {
    protected submitCall;
    protected textChanged;
    get bar() {
        return <SearchBar>this.parent;
    }
    initNativeView() {
        super.initNativeView();
        this.col = 1;
        this.submitCall = () => {
            this.bar.submit(this.text);
        }
        this.textChanged = (data: PropertyChangeData) => {
            if (data.propertyName == "text") {
                this.bar.changed(this.text);
            }
        }
        this.on("textChange", this.textChanged);
        this.on(TextField.returnPressEvent, this.submitCall);
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.off("textChange", this.textChanged);
        this.off(TextField.returnPressEvent, this.submitCall);
    }
}
export class SearchIcon extends Label {
    visible = true;
    position: "left" | "right";
    action: "submit" | "cancel" | "speech" | "clear";
    protected tapCallback;
    protected searchCallback: SearchCallback;
    get bar() {
        return <SearchBar>this.parent;
    }
    hide() {
        if (this.visible) {
            const val = this.action == "speech" ? this.rotate + 360 : this.rotate - 360;
            this.animate({ opacity: 0, rotate: val, curve: AnimationCurve.easeIn, duration: 150 });
            this.visible = false;
        }
    }
    show() {
        if (!this.visible) {
            const val = this.action == "speech" ? this.rotate - 360 : this.rotate + 360;
            this.animate({ opacity: 1, rotate: val, curve: AnimationCurve.easeOut, duration: 150, delay: 200 });
            this.visible = true;
        }
    }
    updateVisibility() {
        switch (this.action) {
            case "speech":
                if (this.bar.field.text) {
                    this.hide();
                } else {
                    this.show();
                }
                break;
            case "clear":
                if (this.bar.field.text) {
                    this.show();
                } else {
                    this.hide();
                }
                break;
        }
    }
    initNativeView() {
        super.initNativeView();
        const self = this;
        this.col = this.position == "left" ? 0 : 2;
        this.tapCallback = () => {
            switch (this.action) {
                case "submit":
                    this.bar.submit(this.bar.field.text);
                    break;
                case "cancel":
                    this.bar.cancel();
                    break;
                case "clear":
                    this.bar.clear();
                    break;
                case "speech":
                    this.bar.speech();
                    break;
            }
        }
        this.on(GestureTypes.tap, this.tapCallback);
        this.updateVisibility();
        this.searchCallback = {
            onClear() {
                self.updateVisibility();
            },
            onCancel() {
            },
            onSubmit(text) {
            },
            onText(text) {
                self.updateVisibility();
            }
        }
        this.bar.register(this.searchCallback);
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.off(GestureTypes.tap, this.tapCallback);
        this.bar.unregister(this.searchCallback);
    }
}
/**
 * 
 */
export abstract class ModalPage extends Page {
    static hideEvent = "hideEvent";
    visibleResult = null;
    resultView: View;
    barView: SearchBar;
    calbackChanges = null;
    callbackSearch: SearchCallback;
    constructor(private barModalRef: WeakRef<SearchBarModal>) {
        super();
        const barModal = this.barModalRef.get();
        //
        this.backgroundColor = "transparent";
        // BACKGROUND
        let back = new GridLayout();
        back.backgroundColor = "transparent";
        back.addRow(new ItemSpec(1, "auto"));
        back.addRow(new ItemSpec(1, "star"));
        //
        this.resultView = parse(barModal.resultTemplate);
        this.resultView.cssClasses.add("searchResult");
        this.resultView.row = 1;
        this.resultView.col = 0;
        this.resultView.visibility = "hidden";
        back.addChild(this.resultView);
        //
        this.barView = <any>parse(barModal.barTemplate);
        this.barView.row = 0;
        this.barView.col = 0;
        back.addChild(this.barView);
        //
        this.content = back;//INHERIT CSS?
        //
        this.handleTapEvent();
        // ON SHOW DISPLAY RESULT
        this.on(Page.shownModallyEvent, (data) => {
            if (data.object === this) {
                this.animate({ opacity: 1, curve: AnimationCurve.easeInOut, duration: 150 })
                this.updateResultVisibility();
            }
        });
        //LISTEN RESULT
        this.calbackChanges = () => {
            this.updateResultVisibility();
        }
        barModal.results.on("change", this.calbackChanges);
        // LISTEN BAR EVENTS
        const self = this;
        this.callbackSearch = {
            onClear() {
                self.barModalRef.get() && self.barModalRef.get().callbacks.forEach(c => c.onClear());
            },
            onCancel() {
                self.throwHideEvent();
                //MUST BE AFTER (hide before calling cancel listener)
                self.barModalRef.get() && self.barModalRef.get().callbacks.forEach(c => c.onCancel());
            },
            onSubmit(text) {
                self.throwHideEvent();
                //MUST BE AFTER (hide before calling onSubmit listener)
                self.barModalRef.get() && self.barModalRef.get().callbacks.forEach(c => c.onSubmit(text));
            },
            onText(text) {
                self.barModalRef.get() && self.barModalRef.get().callbacks.forEach(c => c.onText(text));
            }
        };
        this.opacity = 0;
    }
    abstract handleTapEvent();
    abstract unhandleTapEvent();
    get searchBar(): SearchBar {
        return this.barView;
    }
    get searchResult(): View {
        return this.resultView;
    }
    initNativeView() {
        super.initNativeView();
        this.searchBar.register(this.callbackSearch);
    }
    throwHideEvent() {
        const barModal = this.barModalRef.get();
        if (barModal) {
            barModal.results.off("change", this.calbackChanges);
        }
        this.notify({
            eventName: ModalPage.hideEvent
            , object: this
        })
    }
    disposeNative() {
        this.searchBar.unregister(this.callbackSearch);
        const barModal = this.barModalRef.get();
        if (barModal) {
            removeWeakEventListener(barModal.results, "change", this.updateResultVisibility, this)
        }
        this.barView = null;
        this.resultView = null;
        super.disposeNativeView();
    }
    updateResultVisibility() {
        if (!this.barModalRef.get()) {
            return;
        }
        const results: ObservableArray<any> = this.barModalRef.get().results;
        if (results.length > 0) {
            this.showResult();
        } else {
            this.hideResult();
        }
    }
    hideResult() {
        //ACCEPT NULL AND TRUE
        if (this.visibleResult != false) {
            this.visibleResult = false;
            this.handleTapEvent();
            const search = this.searchResult;
            search.animate({ opacity: 0, curve: AnimationCurve.easeIn, duration: 150 }).then(() => {
                //VISIBILITY HIDDEN TO ENABLE CLICK
                search.visibility = "hidden";
            });
        }
    }
    showResult() {
        //ACCEPT NULL AND FALSE
        if (this.visibleResult != true) {
            this.visibleResult = true;
            this.unhandleTapEvent();
            const search = this.searchResult;
            search.visibility = "visible";
            search.animate({ opacity: 1, curve: AnimationCurve.easeOut, duration: 150 });
        }
    }
}
export module knownTemplates {
    export const barTemplate = "barTemplate";
    export const resultTemplate = "resultTemplate";
}

export abstract class SearchBarModal extends View {

    barTemplate: string | Template;
    resultTemplate: string | Template;
    protected _opened = false;
    protected _newPage: ModalPage;
    callbacks: SearchCallback[] = [];
    results = new ObservableArray<any>();
    register(c: SearchCallback) {
        this.callbacks.push(c);
    }
    unregister(toDel: SearchCallback) {
        this.callbacks = this.callbacks.filter(c => c != toDel);
    }
    constructor() {
        super();
    }
    abstract createPage(): ModalPage;
    get opened() { return this._opened; }
    createNativeView() {
        return undefined;
    }
    hide() {
        if (this._opened) {
            this.getOrCreatePage().closeModal();
            this.deletePage();
        }
    }
    show() {
        if (!this._opened) {
            this._opened = true;
            this.page.showModal(this.getOrCreatePage(), this.page, () => {
                this._opened = false;
                this.onHide();
            }, true);
        }
    }
    onHide() {

    }
    deletePage() {
        this._newPage.off(ModalPage.hideEvent);
        //IT CAUSE AN ERROR
        //this._newPage.bindingContext = null;
        this._newPage = null;
    }
    getOrCreatePage(): ModalPage {
        if (this._newPage) {
            return this._newPage;
        }
        //PAGE
        this._newPage = this.createPage();
        this._newPage.bindingContext = {
            results: this.results
        };
        this._newPage.on(ModalPage.hideEvent, () => {
            this.hide();
        });
        //ADAPTER
        return this._newPage;
    }
}




export const barTemplateProperty = new Property<SearchBarModal, string | Template>({
    affectsLayout: isIOS,
    name: "barTemplate"
});
export const resultTemplateProperty = new Property<SearchBarModal, string | Template>({
    affectsLayout: isIOS,
    name: "resultTemplate"
});
barTemplateProperty.register(SearchBarModal);
resultTemplateProperty.register(SearchBarModal);