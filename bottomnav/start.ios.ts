import * as frame from "ui/frame";
import * as app from 'application';
import * as viewModule from "ui/core/view";
import * as utils from "utils/utils";
import { ios } from "ui/utils";
import 'nativescript-nbmaterial-layouts';

interface Measure {
    measuredWidth: number; measuredHeight: number;
}

class ResponderImpl extends UIResponder {
    //
}
let menu: string = null;

export function startWithMenu(page, m: string) {
    menu = m;
    //
    if (app.ios.nativeApp) {
        let window = app.ios.nativeApp.keyWindow || (app.ios.nativeApp.windows.count > 0 && app.ios.nativeApp.windows[0]);
        if (window) {
            var rootController = window.rootViewController;
            if (rootController) {
                const root = new CustomRootView(page);
                rootController.presentViewControllerAnimatedCompletion(root.ios, true, null);
                ios._layoutRootView(root, utils.ios.getter(UIScreen, UIScreen.mainScreen).bounds);
            }
        } else {
            console.warn("PB no windows IOS!")
        }
    } else {
        // Normal NativeScript app will need UIApplicationMain. 
        app.on(app.launchEvent, (e: app.LaunchEventData) => {
            e.root = new CustomRootView(page);
        });
        UIApplicationMain(0, null, null, app.ios && app.ios.delegate ? NSStringFromClass(<any>app.ios.delegate) : NSStringFromClass(ResponderImpl));
    }
}
function getMenuView(): viewModule.View {
    if (!menu) {
        throw "MENU PAGE should not be null!";
    }
    let entry: frame.NavigationEntry = {
        moduleName: menu
    };
    let page = frame["resolvePageFromEntry"](entry);
    let view = page.content;
    return view;
}

class CustomRootView extends viewModule.View {
    _ios: UIViewController;
    protected frame = new FrameWithMenu();
    constructor(page) {
        super();
        this.frame.weakRoot = new WeakRef(this);
        // MUST BE BEFORE
        this._ios = UIViewController.new();
        let menu = getMenuView();
        this.frame.menu = menu;
        (<any>this.frame)._setupAsRootView({});
        //FRAME
        let frameCtrl: UINavigationController = this.frame.ios.controller;
        this._ios.addChildViewController(frameCtrl);
        this._ios.view.addSubview(frameCtrl.view);
        frameCtrl.didMoveToParentViewController(this._ios);
        //MENU
        this._ios.view.addSubview(menu.nativeView);
        //LOAD
        this.frame.navigate(page);
        this.frame.onLoaded();
        //
    }
    _setupAsRootView() {
        //ALREADY DONE IN CONSTRUCTOR
    }
    get nativeViewProtected() { return this._ios.view; }
    get ios() { return this._ios; }
    measure(widthSpec, heightSpec) {
        this.frame.measure(widthSpec, heightSpec);
    }
    layout(left, top, width, height) {
        this.frame.layout(left, top, width, height)
    }
}
export class FrameWithMenu extends frame.Frame {
    public weakRoot: WeakRef<CustomRootView>;
    public menu: viewModule.View;
    //AVOID NAN
    protected menuHeight: number = 0;
    protected menuHeightPx: number = 0;
    constructor() {
        super();
        frame.Frame.onEveryNavigate((arg) => {
            if (arg.backStackEntry.entry.hideRootMenu) {
                this.hideRootMenu();
            } else {
                this.showRootMenu();
            }
        });
    }
    get customRoot() {
        return this.weakRoot && this.weakRoot.get();
    }
    onLoaded() {
        super.onLoaded();
        if (this.menu) {
            this.menu.onLoaded();
            //MUST BE AFTER ONLOADED
            this.menuHeight = <any>this.menu.height;
            this.menuHeightPx = utils.layout.toDevicePixels(this.menuHeight);
        }
    }
    disposeNativeView() {
        if (this.menu) {
            this.menu.disposeNativeView();
            this.menu = null;
        }
        super.disposeNativeView();
    }
    onUnloaded() {
        super.onUnloaded();
        this.menu && this.menu.onUnloaded();
    }
    _setupAsRootView() {
        super["_setupAsRootView"]({});
        this.menu && (<any>this.menu)._setupAsRootView({});
    }
    layout(left, top, width, height) {
        if (this.isRootMenuVisible()) {
            super.layout(left, top, width, height)
            let topMenu = top + height - this.menuHeightPx;
            this.menu && this.menu.layout(left, topMenu, width, height)
        } else {
            super.layout(left, top, width, height);
        }
    }
    measure(widthSpec, heightSpec) {
        if (this.isRootMenuVisible()) {
            let height = viewModule.layout.getMeasureSpecSize(heightSpec) - this.menuHeightPx;
            let heightMode = viewModule.layout.getMeasureSpecMode(heightSpec);
            let heightSpecFrame = viewModule.layout.makeMeasureSpec(height, heightMode);
            super.measure(widthSpec, heightSpecFrame)
            this.menu && this.menu.measure(widthSpec, heightSpec);
        } else {
            super.measure(widthSpec, heightSpec)
        }
    }
}

frame.Frame.prototype.showRootMenu = function () {
    const self: FrameWithMenu = this;
    if (!self.isRootMenuVisible() && self.menu) {
        const view: viewModule.View = self.menu;
        view.visibility = "visible";
        self.requestLayout();
    }
}
frame.Frame.prototype.hideRootMenu = function () {
    const self: FrameWithMenu = this;
    if (self.isRootMenuVisible()) {
        const view: viewModule.View = self.menu;
        view.visibility = "collapse";
        self.requestLayout();
    }
}
frame.Frame.prototype.isRootMenuVisible = function () {
    const self: FrameWithMenu = this;
    if (self.menu) {
        const view: viewModule.View = self.menu;
        return !view.isCollapsed!
    }
    return false;
}