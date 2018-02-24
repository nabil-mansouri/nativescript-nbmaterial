import { View, Color } from "ui/core/view";
import { Frame, topmost, OnNavigateToEventData, BackstackEntry } from "ui/frame";
import { Observable } from "data/observable";
import { Page } from "ui/page";


View.prototype["onAfterInitNative"] = function (callback: () => void) {
    const self = this;
    const oldInitNativeView = self.initNativeView;
    self.initNativeView = function () {
        oldInitNativeView.apply(self, arguments);
        callback.apply(self);
    }
}
View.prototype["onBeforeDisposeNative"] = function (callback: () => void) {
    const self = this;
    const oldDisposeNativeView = this.disposeNativeView;
    self.disposeNativeView = function () {
        callback.apply(self);
        oldDisposeNativeView.apply(self, arguments);
    }
}
View.prototype["onFirstLayout"] = function (callback: () => void) {
    if (this.getMeasuredHeight() || this.getMeasuredWidth()) {
        callback();
    } else {
        const promise: Promise<any> = this.waitNextLayout();
        promise.then(() => {
            callback();
        }).catch(e => {
            console.error("Failed to catch first layout: ", e);
        })
    }
}
View.prototype["onNextLayout"] = function (callback: () => void) {
    const promise: Promise<any> = this.waitNextLayout();
    promise.then(() => {
        callback();
    }).catch(e => {
        console.error("Failed to catch next layout: ", e);
    })
}

const oldPageLoaded = Page.prototype.onLoaded;
Page.prototype.onLoaded = function () {
    const self = (<Page>this);
    const rootPage = topmost().currentPage;
    //IGNORE IF WE OPEN MODAL
    let ignore = rootPage && rootPage.modal === self;
    if (!ignore) {
        self.setStatusBarTranslucent(self.statusBarTranslucent);
    }
    //
    oldPageLoaded.apply(this, arguments);
}


View.prototype.addCssClass = function (css) {
    const self: View = this;
    if (!self.cssClasses.has(css)) {
        self.cssClasses.add(css);
        self.className = Array.from(self.cssClasses).join(" ");
    }
}
View.prototype.removeCssClass = function (css) {
    const self: View = this;
    if (self.cssClasses.has(css)) {
        self.cssClasses.delete(css);
        self.className = Array.from(self.cssClasses).join(" ");
    }
}

let obs = new Observable();
Frame.onEveryNavigate = function (callback: (c: OnNavigateToEventData) => void, thisArg?: any) {
    obs.on("onEveryNavigate", callback, thisArg);
}
Frame.offEveryNavigate = function (callback: (c: OnNavigateToEventData) => void) {
    obs.off("onEveryNavigate", callback);
}

const oldNav = Frame.prototype["_onNavigatingTo"];
Frame.prototype["_onNavigatingTo"] = function (entry: BackstackEntry, isBack: boolean) {
    const self: Frame = this;
    let obj: OnNavigateToEventData = {
        currentPage: self.currentPage,
        nextPage: entry.resolvedPage,
        backStackEntry: entry,
        isBack,
        eventName: "onEveryNavigate",
        object: self
    }
    obs.notify(obj);
    oldNav.apply(self, arguments);
} 