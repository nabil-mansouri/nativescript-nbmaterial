import { View, Property, layout } from 'tns-core-modules/ui/core/view';
import { paddingTopProperty, paddingBottomProperty } from "ui/styling/style-properties";
import { ActivityIndicator } from "ui/activity-indicator";
import { RecyclerView } from "nativescript-nbmaterial-recycler" ;
import * as Rx from 'rxjs/Rx';
import { ProducerData, Producer, Behaviour } from "nativescript-nbmaterial-coordinator" ;
import { ScrollData } from "nativescript-nbmaterial-coordinator" ;
import { PullToRefresh as PullToRefreshDef } from "./pullrefresh";
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';

export class PullToRefresh extends LayoutBase implements PullToRefreshDef {
    direction: "both" | "bottom" | "top";
    public static refreshBottomEvent = "refreshBottom";
    public static refreshTopEvent = "refreshTop";
    public static refreshTopEvenst = "refreshTop";
    get refreshtop() { return this.direction == "both" || this.direction == "top"; }
    get refreshbottom() { return this.direction == "both" || this.direction == "bottom"; }
    get content() { return this.getChildAt(0); }
    public androidBottomRefreshView: ActivityIndicator = new ActivityIndicator;
    protected producer: Producer;
    subscriptions: Rx.Subscription[] = [];
    [paddingTopProperty.setNative](marginTp: number) {
        //super[paddingTopProperty.setNative](marginTp);
        if (this.refreshtop) {
            const native: android.support.v4.widget.SwipeRefreshLayout = this.nativeView;
            let offset = layout.toDevicePixels(marginTp);
            native.setProgressViewOffset(false, 0, offset);
        }
    } 
    [paddingBottomProperty.setNative](margin){
        //super[paddingBottomProperty.setNative](marginTp);
    }
    startRefreshTop() {
        if (this.refreshtop) {
            const native: android.support.v4.widget.SwipeRefreshLayout = this.nativeView;
            native.setRefreshing(true);
        }
    }
    startRefreshBottom() {
        if (this.refreshbottom) {
            //CANNOT REFRESH MANUALLY
        }
    }
    stopRefreshTop() {
        if (this.refreshtop) {
            const native: android.support.v4.widget.SwipeRefreshLayout = this.nativeView;
            native.setRefreshing(false);
        }
    }
    stopRefreshBottom() {
        if (this.refreshbottom) {
            this.androidBottomRefreshView.busy = false;
        }
    }
    createNativeView() {
        let native = undefined;
        if (this.refreshtop) {
            const packSW = android.support.v4.widget;
            let swipe = new packSW.SwipeRefreshLayout(this._context);
            const packVG = android.view.ViewGroup;
            const ownerRef = new WeakRef<PullToRefresh>(this);
            swipe.setOnRefreshListener(new packSW.SwipeRefreshLayout.OnRefreshListener({
                onRefresh() {
                    const owner = ownerRef.get();
                    if (owner) {
                        owner.notify({ eventName: PullToRefresh.refreshTopEvent, object: owner })
                    }
                }
            }));
            const swipeVG: android.view.ViewGroup = (<any>swipe);
            swipeVG.setLayoutParams(new packVG.LayoutParams(packVG.LayoutParams.MATCH_PARENT, packVG.LayoutParams.MATCH_PARENT));
            native = swipe;
        }
        if (this.refreshbottom) {
            if (this.content instanceof RecyclerView) {
                const recyclerView: RecyclerView = (<RecyclerView>this.content);
                this.producer = recyclerView.createProducer();
                this.producer.init();
                this.content.onAfterInitNative(() => {
                    const recycler: android.support.v7.widget.RecyclerView = recyclerView.recycler;
                    ensureRecyclerViewListAdapterClass();
                    const adapter = new RecyclerViewListAdapterBottomClass(new WeakRef(this), recycler.getAdapter());
                    recycler.setAdapter(adapter);
                    //
                    this.subscriptions.push(this.producer.stream.subscribe((data: ScrollData) => {
                        if (data.dy > 0) {
                            if (!this.androidBottomRefreshView.busy) {
                                this.androidBottomRefreshView.busy = true;
                                let point = this.androidBottomRefreshView.getLocationOnScreen();
                                if (point) {
                                    //IS VISIBLE BUT CLOSED
                                    this.notify({ eventName: PullToRefresh.refreshBottomEvent, object: this });
                                }
                            }
                        } else {
                            //NO NEED
                            //adapt.scroll = "idle";
                        }
                    }));
                });
                this.content.onBeforeDisposeNative(() => {
                    const recycler: android.support.v7.widget.RecyclerView = (<RecyclerView>this.content).recycler;
                    let adapter = recycler.getAdapter();
                    if (adapter instanceof RecyclerViewListAdapterBottomClass) {
                        adapter.inner = null;
                    }
                })
            }
        }
        return native;
    }
    onLoaded() {
        super.onLoaded();
        if (this.producer) {
            //PRODUCER
            this.producer.start();
        }
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions = [];
        //PRODUCER
        if (this.producer) {
            this.producer.stop();
        }
    }
}
/**
 * CROSS VIEW HOLDER
 */

interface CrossViewHolderType extends android.support.v7.widget.RecyclerView.ViewHolder {
    view: View;
}
let CrossViewHolderRefClass: new (view: View) => android.support.v7.widget.RecyclerView.ViewHolder;
function ensureCrossViewHolderClass() {

    if (CrossViewHolderRefClass) {
        return;
    }

    class CrossViewHolder extends android.support.v7.widget.RecyclerView.ViewHolder {
        refreshViewHolder = true;
        constructor(public view: View) {
            super(view.nativeView);
            return global.__native(this);
        }
    }

    CrossViewHolderRefClass = CrossViewHolder;
}
let RecyclerViewListAdapterBottomClass: new (owner: WeakRef<PullToRefresh>, inner: android.support.v7.widget.RecyclerView.Adapter) => android.support.v7.widget.RecyclerView.Adapter & {
    inner: android.support.v7.widget.RecyclerView.Adapter;
};
export function ensureRecyclerViewListAdapterClass() {

    if (RecyclerViewListAdapterBottomClass) {
        return RecyclerViewListAdapterBottomClass;
    }
    /**
     * BOTTOM BEHAVIOR
     */
    const BOTTOM_VIEW_TYPE = -123456;
    class RecyclerViewListAdapterBottom extends android.support.v7.widget.RecyclerView.Adapter {
        lastCount = 0;
        constructor(public ownerRef: WeakRef<PullToRefresh>, public inner: android.support.v7.widget.RecyclerView.Adapter) {
            super();
            return global.__native(this);
        }

        getItemViewType(position: number): number {
            if ((this.lastCount - 1) == position) {
                return BOTTOM_VIEW_TYPE;
            }
            return this.inner.getItemViewType(position);
        }

        onCreateViewHolder(parent: android.view.ViewGroup, viewType: number) {
            if (viewType == BOTTOM_VIEW_TYPE) {
                if (!this.ownerRecycler) {
                    return null;
                }
                // Recycle an existing view or create a new one if needed.
                let view = this.ownerPullRefresh.androidBottomRefreshView;
                //ATTACH TO PARENT (INHERIT CSS, ADD TO TREE, CREATE NATIVE...)
                this.ownerRecycler._addView(view);
                view.createNativeView();
                if (view.nativeView._androidViewId < 0) {
                    view.nativeView._androidViewId = android.view.View.generateViewId();
                }
                view.nativeView.setId(view.nativeView._androidViewId);
                if (!view) {
                    throw "View should be initialized!!";
                }
                // set item height to WRAP_CONTENT so that it does not expand to whole screen
                let layoutParams = new android.support.v7.widget.RecyclerView.LayoutParams(
                    android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                    android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
                view.android.setLayoutParams(layoutParams);
                ensureCrossViewHolderClass();
                return new CrossViewHolderRefClass(view);
            }
            return this.inner.onCreateViewHolder(parent, viewType);
        }
        onBindViewHolder(viewHolder: android.support.v7.widget.RecyclerView.ViewHolder, position: number) {
            if (viewHolder["refreshViewHolder"]) {
                if (!this.ownerPullRefresh) {
                    return;
                }
                const real = <CrossViewHolderType>viewHolder;
                if ((<ActivityIndicator>real.view).busy) {
                    this.ownerPullRefresh.notify({ eventName: PullToRefresh.refreshBottomEvent, object: this.ownerPullRefresh });
                }
                return;
            }
            return this.inner.onBindViewHolder(viewHolder, position);
        }
        get ownerRecycler() {
            return this.ownerPullRefresh ? this.ownerPullRefresh.content : null;
        }
        get ownerPullRefresh() {
            return this.ownerRef ? this.ownerRef.get() : null;
        }
        getItemCount() {
            this.lastCount = this.inner.getItemCount() + 1;
            return this.lastCount;
        }
    }
    RecyclerViewListAdapterBottomClass = RecyclerViewListAdapterBottom;
    return RecyclerViewListAdapterBottomClass;
} 