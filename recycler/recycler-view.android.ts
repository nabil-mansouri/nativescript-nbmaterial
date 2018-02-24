import { View, KeyedTemplate, Property, Length, unsetValue, booleanConverter } from "ui/core/view";
import { addWeakEventListener } from "ui/core/weak-event-listener";
import { ListView, ItemsSource } from "ui/list-view";
import { layout } from "utils/utils";
import { RecyclerViewBase, ItemEventData } from "./recycler-view.common";


//EXPORT ALL INCLUNDING KNOWNTEMPLATE
export * from "./recycler-view.common";
//COULEUR INDICATEUR : recycler.nativeView.setColorSchemeColors([new Color("blue").android]) background:setProgressBackgroundColor(resourceId)
//sinon recup les child mano puis leur mettre un background
//TODO utiliser smooth scroller? 
export class RecyclerView extends RecyclerViewBase {
    private clickListener;
    private _androidViewId: number = -1;
    get recycler(): android.support.v7.widget.RecyclerView {
        return this.nativeView;
    }
    scrollToIndex(index: number) {
        if (!this.recycler) {
            return;
        }
        this.recycler.scrollToPosition(index);
    }
    refresh() {
        if (!this.recycler || !this.recycler.getAdapter()) {
            return;
        }
        this.recycler.getAdapter().notifyDataSetChanged();
    }
    createNativeView() {
        const recycler = new android.support.v7.widget.RecyclerView(this._context);
        const packVG = android.view.ViewGroup;
        let layoutManager = new android.support.v7.widget.LinearLayoutManager(this._context);
        recycler.setLayoutManager(layoutManager);
        recycler.setLayoutParams(new packVG.LayoutParams(packVG.LayoutParams.MATCH_PARENT, packVG.LayoutParams.MATCH_PARENT));
        return recycler;
    }
    initNativeView(): void {
        super.initNativeView();
        ensureRecyclerViewListAdapterClass();
        const adapter = new RecyclerViewListAdapterClass(new WeakRef(this));
        //Adapter handle click
        ensureClickListenerClass();
        const self = this;
        this.clickListener = new RecyclerItemClickListener(this._context, this.recycler, {
            onItemClick(view: android.view.View, index: number) {
                self.notify({ eventName: ListView.itemTapEvent, object: this, index, view });
            },
            onLongItemClick(view: android.view.View, index: number) {
                self.notify({ eventName: RecyclerViewBase.itemLongTapEvent, object: this, index, view });
            }
        });
        this.recycler.addOnItemTouchListener(this.clickListener);
        //adapter
        this.recycler.setAdapter(adapter);
        // ID
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this.recycler.setId(this._androidViewId);
    }
    disposeNativeView() {
        this.recycler.setAdapter(null);
        this.recycler.removeOnItemTouchListener(this.clickListener);
        super.disposeNativeView();
    }

}
/**
 * CLICK LISTENER
 */
interface OnItemClickListener {
    onItemClick(view: android.view.View, position: number);

    onLongItemClick(view: android.view.View, position: number);
}
let RecyclerItemClickListener: new (a: android.content.Context, b: android.support.v7.widget.RecyclerView, c: OnItemClickListener) => android.support.v7.widget.RecyclerView.OnItemTouchListener = null;
function ensureClickListenerClass() {
    if (RecyclerItemClickListener) {
        return RecyclerItemClickListener;
    }
    class SimpleGestureImpl extends android.view.GestureDetector.SimpleOnGestureListener {
        constructor(private recyclerItem: RecyclerItemClickListenerImpl) {
            super();
            return global.__native(this);
        }
        onSingleTapUp(e: android.view.MotionEvent): boolean {
            return true;
        }

        onLongPress(e: android.view.MotionEvent) {
            let child: android.view.View = this.recyclerItem.recyclerView.findChildViewUnder(e.getX(), e.getY());
            if (child != null && this.recyclerItem.listener != null) {
                this.recyclerItem.listener.onLongItemClick(child, this.recyclerItem.recyclerView.getChildAdapterPosition(child));
            }
        }
    }
    @Interfaces([android.support.v7.widget.RecyclerView.OnItemTouchListener])
    class RecyclerItemClickListenerImpl extends java.lang.Object implements android.support.v7.widget.RecyclerView.OnItemTouchListener {
        mGestureDetector: android.view.GestureDetector;

        constructor(context: android.content.Context, public recyclerView: android.support.v7.widget.RecyclerView, public listener: OnItemClickListener) {
            super();
            this.mGestureDetector = new android.view.GestureDetector(context, new SimpleGestureImpl(this));
            return global.__native(this);
        }

        onInterceptTouchEvent(view: android.support.v7.widget.RecyclerView, e: android.view.MotionEvent): boolean {
            let childView: android.view.View = view.findChildViewUnder(e.getX(), e.getY());
            if (childView != null && this.listener != null && this.mGestureDetector.onTouchEvent(e)) {
                this.listener.onItemClick(childView, view.getChildAdapterPosition(childView));
                return true;
            }
            return false;
        }

        onTouchEvent(view: android.support.v7.widget.RecyclerView, motionEvent: android.view.MotionEvent) { }

        onRequestDisallowInterceptTouchEvent(disallowIntercept: boolean) { }
    }
    RecyclerItemClickListener = RecyclerItemClickListenerImpl;
    return RecyclerItemClickListener;
}
/**
 * CROSS VIEW HOLDER
 */

interface CrossViewHolderType extends android.support.v7.widget.RecyclerView.ViewHolder {
    view: View;
}
let CrossViewHolderClass: new (view: View) => android.support.v7.widget.RecyclerView.ViewHolder;
function ensureCrossViewHolderClass() {

    if (CrossViewHolderClass) {
        return;
    }

    class CrossViewHolder extends android.support.v7.widget.RecyclerView.ViewHolder {

        constructor(public view: View) {
            super(view.nativeView);
            return global.__native(this);
        }
    }

    CrossViewHolderClass = CrossViewHolder;
}

/**
 * ADAPTER
 */
let RecyclerViewListAdapterClass: new (owner: WeakRef<RecyclerView>) => android.support.v7.widget.RecyclerView.Adapter;
export function ensureRecyclerViewListAdapterClass() {

    if (RecyclerViewListAdapterClass) {
        return RecyclerViewListAdapterClass;
    }

    class RecyclerViewListAdapter extends android.support.v7.widget.RecyclerView.Adapter {
        nbCreated = 0;
        constructor(private ownerRef: WeakRef<RecyclerView>) {
            super();
            return global.__native(this);
        }

        getItemViewType(position: number): number {
            return this.owner ? this.owner.getTemplateIdForItemAt(position) : 0;
        }

        onCreateViewHolder(parent: android.view.ViewGroup, viewType: number) {
            if (!this.owner) {
                return null;
            }
            this.nbCreated++;
            // Recycle an existing view or create a new one if needed.
            let template = this.owner.getTemplateForTypeId(viewType);
            let view = template.createView();
            //ATTACH TO PARENT (INHERIT CSS, ADD TO TREE, CREATE NATIVE...)
            this.owner._addView(view);
            if (!view) {
                throw "View should be initialized!";
            }
            // set item height to WRAP_CONTENT so that it does not expand to whole screen
            let layoutParams = new android.support.v7.widget.RecyclerView.LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
            view.android.setLayoutParams(layoutParams);
            ensureCrossViewHolderClass();
            return new CrossViewHolderClass(view);
        }

        onBindViewHolder(viewHolder: android.support.v7.widget.RecyclerView.ViewHolder, position: number) {
            if (!this.owner) {
                return;
            }
            const real = <CrossViewHolderType>viewHolder;
            let totalItemCount = this.owner.items ? this.owner.items.length : 0;
            if (position === (totalItemCount - 1)) {
                this.owner.notify({ eventName: RecyclerView.loadMoreItemsEvent, object: this.owner });
            }
            let args: ItemEventData = {
                eventName: RecyclerView.itemLoadingEvent,
                object: this.owner,
                index: position,
                android: real.view.nativeView,
                view: real.view,
                ios: undefined
            };
            this.owner.notify(args);
            //
            if (this.owner._effectiveRowHeight > -1) {
                real.view.height = this.owner.rowHeight;
            }
            else {
                real.view.height = <Length>unsetValue;
            }
            //
            try {
                real.view.bindingContext = this.owner._getDataItem(position);
            } catch (e) {
                console.error("Failed to bind context:", e);
            }
        }
        get owner() {
            return this.ownerRef ? this.ownerRef.get() : null;
        }
        getItemCount() {
            return this.ownerRef ? this.owner.items.length : 0;
        }
    }

    RecyclerViewListAdapterClass = RecyclerViewListAdapter;
    return RecyclerViewListAdapterClass;
} 