import { View, Property, layout } from 'tns-core-modules/ui/core/view';
import { ActivityIndicator } from "ui/activity-indicator";
import { RecyclerView } from "nativescript-nbmaterial-recycler";
import { paddingTopProperty, paddingBottomProperty } from "ui/styling/style-properties";
import * as Rx from 'rxjs/Rx';
import { ProducerData, Producer, Behaviour } from "nativescript-nbmaterial-coordinator/behaviours/behaviour";
import { ScrollData } from "nativescript-nbmaterial-coordinator/behaviours/scroll-base";
import { ProxyViewContainer } from 'tns-core-modules/ui/proxy-view-container';
import { PullToRefresh as PullToRefreshDef } from "./pullrefresh";

declare var UIControlEventValueChanged: any;
declare class Listener {
    static initWithOwner(owner: WeakRef<PullToRefresh>): Listener;
}
let ListenerImpl: Listener = null;
function ensurceClass() {
    if (ListenerImpl) {
        return;
    }
    class Listener extends NSObject {
        private owner: WeakRef<PullToRefresh>;
        static initWithOwner(owner: WeakRef<PullToRefresh>): Listener {
            let l = <Listener>Listener.new() // calls new() on the NSObject
            l.owner = owner;
            return l;
        }
        public "refreshTop:"() {
            const owner = this.owner.get();
            if (owner) {
                owner.notify({ eventName: PullToRefresh.refreshTopEvent, object: owner })
            }
        }
        public "refreshBottom:"() {
            const owner = this.owner.get();
            if (owner) {
                owner.notify({ eventName: PullToRefresh.refreshBottomEvent, object: owner })
            }
        }
        // A selector will be exposed so it can be called from native.
        public static ObjCExposedMethods = {
            "refreshBottom:": { returns: interop.types.void, params: [] },
            "refreshTop:": { returns: interop.types.void, params: [] }
        };
    }
    ListenerImpl = Listener;
}


export class PullToRefresh extends ProxyViewContainer implements PullToRefreshDef {
    direction: "both" | "bottom" | "top";
    public static refreshBottomEvent = "refreshBottom";
    public static refreshTopEvent = "refreshTop";
    public static refreshTopEvenst = "refreshTop";
    public androidBottomRefreshView: ActivityIndicator = null;
    get refreshtop() { return this.direction == "both" || this.direction == "top"; }
    get refreshbottom() { return this.direction == "both" || this.direction == "bottom"; }
    get content() { return this.getChildAt(0); }
    private _listener: Listener;
    get childNative() { return this.content.nativeView; }
    startRefreshTop() {
        const native: UITableView = this.childNative;
        if (this.refreshtop) {
            native.refreshControl.beginRefreshing();
        }
    }
    startRefreshBottom() {
        const native: UITableView = this.childNative;
        if (this.refreshbottom) {
            (<any>native).bottomRefreshControl.beginRefreshing();
        }
    }
    stopRefreshTop() {
        const native: UITableView = this.childNative;
        if (this.refreshtop) {
            native.refreshControl.endRefreshing();
        }
    }
    stopRefreshBottom() {
        const native: UITableView = this.childNative;
        if (this.refreshbottom) {
            (<any>native).bottomRefreshControl.endRefreshing();
        }
    }
    disposeNativeView() {
        this._listener = null;
        super.disposeNativeView();
    }
    getListener() {
        if (!this._listener) {
            ensurceClass();
            this._listener = (<any>ListenerImpl).initWithOwner(new WeakRef(this));
        }
        return this._listener;
    }
    [paddingTopProperty.setNative](marginTp: number) {
        //super[paddingTopProperty.setNative](marginTp);
        if (this.refreshtop) {
            const native: UIRefreshControl = (<any>this.nativeView).refreshControl;
            let offset = layout.toDevicePixels(marginTp); 
            (<any>native).triggerVerticalOffset = offset;
        }
    }
    [paddingBottomProperty.setNative](marginTp: number) {
        //super[paddingBottomProperty.setNative](marginTp);
        if (this.refreshbottom) {
            const native: UIRefreshControl = (<any>this.nativeView).bottomRefreshControl;
            let offset = layout.toDevicePixels(marginTp); 
            (<any>native).triggerVerticalOffset = offset;
        }
    }
    onLoaded() {
        super.onLoaded();
        const native: UITableView = this.childNative;
        //AVOID ERROR => DO IT ON ONLOADED
        if (this.refreshtop) {
            let refreshControl: UIRefreshControl = UIRefreshControl.new(); 
            refreshControl.addTargetActionForControlEvents(this.getListener(), "refreshTop:", UIControlEventValueChanged);
            native.refreshControl = refreshControl;
        }
        if (this.refreshbottom) {
            let refreshControl = UIRefreshControl.new(); 
            refreshControl.addTargetActionForControlEvents(this.getListener(), "refreshBottom:", UIControlEventValueChanged);
            (<any>native).bottomRefreshControl = refreshControl;
        }
    }
} 