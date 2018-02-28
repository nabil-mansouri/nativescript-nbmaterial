import * as frame from "ui/frame";
import * as app from 'application';
import 'nativescript-nbmaterial-layouts/layouts';


let menu: string = null;
export function startWithMenu(page, m: string) {
    menu = m;
    app.start(page);
}
function getMenuView(act: android.app.Activity) {
    if (!menu) {
        throw "MENU PAGE should not be null!";
    }
    let entry: frame.NavigationEntry = {
        moduleName: menu
    };
    let page = frame["resolvePageFromEntry"](entry);
    let view = page.content;
    view._setupUI(act)
    view.onLoaded();
    return view;
}
declare var org;
@JavaProxy("com.nmaterial.MainActivity")
class Activity extends android.app.Activity {
    private _callbacks: frame.AndroidActivityCallbacks;
    public menuView = null;
    private callbackFrame;
    public onCreate(savedInstanceState: android.os.Bundle): void {
        if (!this._callbacks) {
            frame.setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
        //
        this.callbackFrame = (arg: frame.OnNavigateToEventData) => {
            const fr: frame.Frame = <any>arg.object;
            if (arg.backStackEntry.entry.hideRootMenu) {
                fr.hideRootMenu();
            } else {
                fr.showRootMenu();
            }
        };
        frame.Frame.onEveryNavigate(this.callbackFrame);
    }
    public setContentView(param0: android.view.View | number): void {
        if (typeof param0 == "number") {
            super.setContentView(param0);
        } else {
            let params: android.widget.RelativeLayout.LayoutParams = null;
            let layout = new android.widget.RelativeLayout(this);
            //
            const viewId = android.view.View.generateViewId();
            const menuId = android.view.View.generateViewId();
            //
            params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
            //params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
            params.addRule(android.widget.RelativeLayout.ABOVE, menuId);
            layout.addView(param0, params);
            // 
            this.menuView = getMenuView(this);
            let mWrap: android.view.ViewGroup = this.menuView.nativeView;
            mWrap.setId(menuId);
            params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
            params.height = <any>this.menuView.height;
            //params.addRule(android.widget.RelativeLayout.BELOW, frameId);
            layout.addView(mWrap, params);
            //
            super.setContentView(layout);
        }
    }
    public onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    public onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    public onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    public onDestroy(): void {
        this.menuView = null;
        frame.Frame.offEveryNavigate(this.callbackFrame);
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }
}
frame.Frame.prototype.showRootMenu = function () {
    const self: frame.Frame = this;
    const act: Activity = app.android.foregroundActivity || app.android.startActivity;
    if (!self.isRootMenuVisible() && act.menuView) {
        act.menuView.visibility = "visible";
        let an: any = android;
        act.findViewById(an.R.id.content).invalidate();
    }
}
frame.Frame.prototype.hideRootMenu = function () {
    const self: frame.Frame = this;
    const act: Activity = app.android.foregroundActivity || app.android.startActivity;
    if (this.isRootMenuVisible()) {
        //?EED To change params layout height?
        act.menuView.visibility = "collapse";
        let an: any = android;
        act.findViewById(an.R.id.content).invalidate();
    }
}
frame.Frame.prototype.isRootMenuVisible = function () {
    const act: Activity = app.android.foregroundActivity || app.android.startActivity;
    if (act.menuView) {
        return !act.menuView.isCollapsed!
    }
    return false;
} 