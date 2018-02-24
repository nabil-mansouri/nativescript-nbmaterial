import { View, Template, Property, Color, isIOS } from 'tns-core-modules/ui/core/view';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { Page, ShownModallyData } from 'tns-core-modules/ui/page';
import * as utils from 'tns-core-modules/utils/utils';
import { parse } from 'tns-core-modules/ui/builder';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { Background } from "tns-core-modules/ui/styling/background";
import {
  PercentLength, colorProperty, fontInternalProperty, widthProperty, heightProperty,
  backgroundInternalProperty, backgroundColorProperty, fontSizeProperty, paddingTopProperty, paddingBottomProperty, paddingLeftProperty, paddingRightProperty
} from "tns-core-modules/ui/styling/style-properties";
import { BottomSheetModal as BottomSheetDef } from "./bottomsheet";
import "nativescript-nbmaterial-layouts/layouts";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-elevation/elevation";//NEED TO aUGMENT VIEW

export module knownTemplates {
  export const template = "template";
}

export const openProperty = new Property<BottomSheetModalBase, boolean>({
  affectsLayout: isIOS,
  name: "open"
});
export const contextProperty = new Property<BottomSheetModalBase, any>({
  affectsLayout: isIOS,
  name: "modalContext"
});
export const templateProperty = new Property<BottomSheetModalBase, string | Template>({
  affectsLayout: isIOS,
  name: "template"
});
const MEASURE_CHANGED = "measureChangedEvent";

export abstract class ModalPage extends Page {
  static hideEvent = "hideEvent";
  public templateView: View;
  protected _opened = false;
  protected promiseHeight: Promise<number>;
  protected resolveHeight: (value: number) => void;
  constructor(private bottomRef: WeakRef<BottomSheetModalBase>) {
    super();
    this.promiseHeight = new Promise((resolve, reject) => {
      this.resolveHeight = resolve;
    })
    const bottom = bottomRef.get();
    this.backgroundColor = "transparent";
    // BACKGROUND
    let back = new GridLayout();
    //
    this.templateView = parse(bottom.template);
    this.templateView.verticalAlignment = "bottom";
    this.templateView.elevation = 12;
    this.content = back;
    back.addChild(this.templateView);//INHERIT CSS?
    // 
    this.onFirstLayout(() => {
      let dialogHeight = this.getActualSize().height;
      this.resolveHeight(dialogHeight);
    });
    this.on(Page.shownModallyEvent, (data: ShownModallyData) => {
      if (data.object === this) {
        this.showing();
      }
    });
    //STYLE  
    this.templateView.backgroundColor = bottom.backgroundColor;
    this.templateView.style.padding = bottom.style.padding;
    this.templateView.height = bottom.height;
    this.templateView.width = bottom.width;
    //HANDLE
    this.handleTapEvent();
  }
  get open(): boolean {
    return this._opened;
  }
  set open(t: boolean) {
    if (t != this._opened) {
      if (t) {
        this.show();
      } else {
        this.hide();
      }
    }
  }
  showing() {
    this.promiseHeight.then((dialogHeight) => {
      const templateView = this.templateView;
      templateView.translateY = dialogHeight;
      templateView.visibility = "visible";
      templateView.animate({ translate: { x: 0, y: 0 }, duration: 300, curve: AnimationCurve.easeInOut }).then(() => {
        let parent = this.bottomRef.get();
        if (parent) {
          parent.notify({ eventName: BottomSheetModalBase.showEvent, object: parent });
        }
      })
    });
  }
  abstract hideFinish();
  abstract handleTapEvent();
  initNativeView() {
    super.initNativeView();
  }
  disposeNative() {
    super.disposeNativeView();
    this.templateView = null;
  }
  show() {
    if (!this._opened) {
      this._opened = true;
      this.templateView.visibility = "hidden";
      let modalContext = {};
      let parent = this.bottomRef.get();
      if (parent) {
        modalContext = parent.modalContext;
        parent.page.showModal(this, modalContext, () => {
          this._opened = false;
          let parent = this.bottomRef.get();
          if (parent) {
            parent.notify({ eventName: BottomSheetModalBase.closeEvent, object: parent });
          }
        }, true);
      }
    }
  }
  hide() {
    if (this._opened) {
      this.promiseHeight.then((dialogHeight) => {
        this.templateView.animate({ translate: { x: 0, y: dialogHeight }, duration: 200, curve: AnimationCurve.easeOut }).then(() => {
          this.closeModal();
          this.notify({
            eventName: ModalPage.hideEvent
            , object: this
          })
        });
      });
    }
  }
}
export abstract class BottomSheetModalBase extends View implements BottomSheetDef {

  static closeEvent: string = "close";
  static showEvent: string = "show";
  public autodrop: boolean = true;
  public modalContext = {};
  protected _newPage: ModalPage;
  protected _template: string | Template;
  constructor() {
    super();
  }
  show() {
    this.getOrCreatePage().show();
  }
  hide() {
    if (this._newPage) {
      this._newPage.hide();
    }
  }
  get open() {
    return this._newPage && this._newPage.open;
  }
  set open(t: boolean) {
    this.getOrCreatePage().open = t;
  }
  get template(): string | Template {
    return this._template;
  }
  set template(t: string | Template) {
    this._template = t;
    this.reset();
  }
  reset() {
    super.resetNativeView();
    this.hide();
    if (this._newPage) {
      this._newPage = null;
    }
  }
  disposeNativeView() {
    this.reset();
    super.disposeNativeView();
  }
  createNativeView() {
    return undefined;
  }
  abstract createPage(): ModalPage;
  getOrCreatePage(): ModalPage {
    if (this._newPage) {
      return this._newPage;
    }
    //PAGE
    this._newPage = this.createPage();
    this._newPage.on(ModalPage.hideEvent, () => {
      if (this.autodrop) {
        this.reset();
      }
    });
    return this._newPage;
  }
}

openProperty.register(BottomSheetModalBase);
contextProperty.register(BottomSheetModalBase);
templateProperty.register(BottomSheetModalBase);
BottomSheetModalBase.prototype["recycleNativeView"] = false;