declare module android {
	export module support {
		export module v7 {
			export module widget {
				export class RecyclerView extends android.view.ViewGroup {
					public static HORIZONTAL: number;
					public static VERTICAL: number;
					public static NO_POSITION: number;
					public static NO_ID: number;
					public static INVALID_TYPE: number;
					public static TOUCH_SLOP_DEFAULT: number;
					public static TOUCH_SLOP_PAGING: number;
					public static SCROLL_STATE_IDLE: number;
					public static SCROLL_STATE_DRAGGING: number;
					public static SCROLL_STATE_SETTLING: number;
					public onNestedFling(param0: android.view.View, param1: number, param2: number, param3: boolean): boolean;
					public onKeyUp(param0: number, param1: android.view.KeyEvent): boolean;
					public startActionModeForChild(param0: android.view.View, param1: android.view.ActionMode.Callback, param2: number): android.view.ActionMode;
					public startActionModeForChild(param0: android.view.View, param1: android.view.ActionMode.Callback): android.view.ActionMode;
					public onDraw(param0: android.graphics.Canvas): void;
					public getChildDrawingOrder(param0: number, param1: number): number;
					public invalidateChildInParent(param0: native.Array<number>, param1: android.graphics.Rect): android.view.ViewParent;
					public addItemDecoration(param0: android.support.v7.widget.RecyclerView.ItemDecoration): void;
					public getChildAdapterPosition(param0: android.view.View): number;
					public scrollToPosition(param0: number): void;
					public isTextDirectionResolved(): boolean;
					public showContextMenuForChild(param0: android.view.View): boolean;
					public removeItemDecoration(param0: android.support.v7.widget.RecyclerView.ItemDecoration): void;
					public onChildDetachedFromWindow(param0: android.view.View): void;
					public addView(param0: android.view.View, param1: number): void;
					public stopNestedScroll(): void;
					public computeHorizontalScrollExtent(): number;
					public getMinFlingVelocity(): number;
					public showContextMenuForChild(param0: android.view.View, param1: number, param2: number): boolean;
					public setAdapter(param0: android.support.v7.widget.RecyclerView.Adapter): void;
					public getAdapter(): android.support.v7.widget.RecyclerView.Adapter;
					public removeOnChildAttachStateChangeListener(param0: android.support.v7.widget.RecyclerView.OnChildAttachStateChangeListener): void;
					public onTouchEvent(param0: android.view.MotionEvent): boolean;
					public scheduleDrawable(param0: android.graphics.drawable.Drawable, param1: javalangRunnable, param2: number): void;
					public setRecycledViewPool(param0: android.support.v7.widget.RecyclerView.RecycledViewPool): void;
					public offsetChildrenHorizontal(param0: number): void;
					public updateViewLayout(param0: android.view.View, param1: android.view.ViewGroup.LayoutParams): void;
					public isComputingLayout(): boolean;
					public getLayoutDirection(): number;
					public addItemDecoration(param0: android.support.v7.widget.RecyclerView.ItemDecoration, param1: number): void;
					public getParentForAccessibility(): android.view.ViewParent;
					public onChildAttachedToWindow(param0: android.view.View): void;
					public createContextMenu(param0: android.view.ContextMenu): void;
					public removeDetachedView(param0: android.view.View, param1: boolean): void;
					public addView(param0: android.view.View, param1: android.view.ViewGroup.LayoutParams): void;
					public offsetChildrenVertical(param0: number): void;
					public dispatchNestedFling(param0: number, param1: number, param2: boolean): boolean;
					public getPreserveFocusAfterLayout(): boolean;
					public childDrawableStateChanged(param0: android.view.View): void;
					public setScrollingTouchSlop(param0: number): void;
					public scrollTo(param0: number, param1: number): void;
					public onGenericMotionEvent(param0: android.view.MotionEvent): boolean;
					public focusSearch(param0: number): android.view.View;
					public getRecycledViewPool(): android.support.v7.widget.RecyclerView.RecycledViewPool;
					public onInterceptTouchEvent(param0: android.view.MotionEvent): boolean;
					public removeOnItemTouchListener(param0: android.support.v7.widget.RecyclerView.OnItemTouchListener): void;
					public isTextAlignmentResolved(): boolean;
					public onKeyDown(param0: number, param1: android.view.KeyEvent): boolean;
					public invalidateItemDecorations(): void;
					public isAnimating(): boolean;
					public getChildItemId(param0: android.view.View): number;
					public canResolveTextAlignment(): boolean;
					public onNestedScroll(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
					public onRequestFocusInDescendants(param0: number, param1: android.graphics.Rect): boolean;
					public findViewHolderForLayoutPosition(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public onKeyMultiple(param0: number, param1: number, param2: android.view.KeyEvent): boolean;
					public requestChildRectangleOnScreen(param0: android.view.View, param1: android.graphics.Rect, param2: boolean): boolean;
					public getChildPosition(param0: android.view.View): number;
					public getChildViewHolder(param0: android.view.View): android.support.v7.widget.RecyclerView.ViewHolder;
					public onKeyLongPress(param0: number, param1: android.view.KeyEvent): boolean;
					public addFocusables(param0: javautilArrayList, param1: number, param2: number): void;
					public setNestedScrollingEnabled(param0: boolean): void;
					public generateDefaultLayoutParams(): android.view.ViewGroup.LayoutParams;
					public stopScroll(): void;
					public sendAccessibilityEvent(param0: number): void;
					public requestLayout(): void;
					public setOnFlingListener(param0: android.support.v7.widget.RecyclerView.OnFlingListener): void;
					public hasPendingAdapterUpdates(): boolean;
					public getClipToPadding(): boolean;
					public onDetachedFromWindow(): void;
					public onMeasure(param0: number, param1: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public addFocusables(param0: javautilArrayList, param1: number): void;
					public onNestedPrePerformAccessibilityAction(param0: android.view.View, param1: number, param2: android.os.Bundle): boolean;
					public getItemAnimator(): android.support.v7.widget.RecyclerView.ItemAnimator;
					public computeVerticalScrollRange(): number;
					public getTextAlignment(): number;
					public onRestoreInstanceState(param0: android.os.Parcelable): void;
					public onScrolled(param0: number, param1: number): void;
					public setItemAnimator(param0: android.support.v7.widget.RecyclerView.ItemAnimator): void;
					public invalidateChild(param0: android.view.View, param1: android.graphics.Rect): void;
					public smoothScrollToPosition(param0: number): void;
					public unscheduleDrawable(param0: android.graphics.drawable.Drawable): void;
					public constructor(param0: android.content.Context);
					public dispatchSaveInstanceState(param0: android.util.SparseArray): void;
					public isNestedScrollingEnabled(): boolean;
					public focusSearch(param0: android.view.View, param1: number): android.view.View;
					public checkLayoutParams(param0: android.view.ViewGroup.LayoutParams): boolean;
					public getChildLayoutPosition(param0: android.view.View): number;
					public dispatchNestedPreFling(param0: number, param1: number): boolean;
					public computeHorizontalScrollOffset(): number;
					public setHasFixedSize(param0: boolean): void;
					public findContainingViewHolder(param0: android.view.View): android.support.v7.widget.RecyclerView.ViewHolder;
					public getOnFlingListener(): android.support.v7.widget.RecyclerView.OnFlingListener;
					public sendAccessibilityEventUnchecked(param0: android.view.accessibility.AccessibilityEvent): void;
					public getScrollState(): number;
					public dispatchNestedPreScroll(param0: number, param1: number, param2: native.Array<number>, param3: native.Array<number>): boolean;
					public notifySubtreeAccessibilityStateChanged(param0: android.view.View, param1: android.view.View, param2: number): void;
					public computeHorizontalScrollRange(): number;
					public isLayoutRequested(): boolean;
					public onAttachedToWindow(): void;
					public clearChildFocus(param0: android.view.View): void;
					public setAccessibilityDelegateCompat(param0: android.support.v7.widget.RecyclerViewAccessibilityDelegate): void;
					public findViewHolderForItemId(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public onNestedPreFling(param0: android.view.View, param1: number, param2: number): boolean;
					public swapAdapter(param0: android.support.v7.widget.RecyclerView.Adapter, param1: boolean): void;
					public generateLayoutParams(param0: android.util.AttributeSet): android.view.ViewGroup.LayoutParams;
					public isLayoutDirectionResolved(): boolean;
					public setItemViewCacheSize(param0: number): void;
					public computeVerticalScrollExtent(): number;
					public setChildDrawingOrderCallback(param0: android.support.v7.widget.RecyclerView.ChildDrawingOrderCallback): void;
					public addOnChildAttachStateChangeListener(param0: android.support.v7.widget.RecyclerView.OnChildAttachStateChangeListener): void;
					public requestChildFocus(param0: android.view.View, param1: android.view.View): void;
					public bringChildToFront(param0: android.view.View): void;
					public onScrollStateChanged(param0: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number, param3: number);
					public getCompatAccessibilityDelegate(): android.support.v7.widget.RecyclerViewAccessibilityDelegate;
					public addView(param0: android.view.View, param1: number, param2: number): void;
					public getLayoutManager(): android.support.v7.widget.RecyclerView.LayoutManager;
					public computeVerticalScrollOffset(): number;
					public dispatchNestedScroll(param0: number, param1: number, param2: number, param3: number, param4: native.Array<number>): boolean;
					public findContainingItemView(param0: android.view.View): android.view.View;
					public setLayoutFrozen(param0: boolean): void;
					public dispatchRestoreInstanceState(param0: android.util.SparseArray): void;
					public clearOnChildAttachStateChangeListeners(): void;
					public getChildVisibleRect(param0: android.view.View, param1: android.graphics.Rect, param2: android.graphics.Point): boolean;
					public getTextDirection(): number;
					public setLayoutManager(param0: android.support.v7.widget.RecyclerView.LayoutManager): void;
					public requestFitSystemWindows(): void;
					public findViewHolderForAdapterPosition(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public onNestedScrollAccepted(param0: android.view.View, param1: android.view.View, param2: number): void;
					public onSaveInstanceState(): android.os.Parcelable;
					public isAttachedToWindow(): boolean;
					public requestTransparentRegion(param0: android.view.View): void;
					public onNestedPreScroll(param0: android.view.View, param1: number, param2: number, param3: native.Array<number>): void;
					public scrollBy(param0: number, param1: number): void;
					public onStartNestedScroll(param0: android.view.View, param1: android.view.View, param2: number): boolean;
					public getBaseline(): number;
					public findChildViewUnder(param0: number, param1: number): android.view.View;
					public clearOnScrollListeners(): void;
					public addOnScrollListener(param0: android.support.v7.widget.RecyclerView.OnScrollListener): void;
					public canResolveTextDirection(): boolean;
					public addView(param0: android.view.View, param1: number, param2: android.view.ViewGroup.LayoutParams): void;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public getParent(): android.view.ViewParent;
					public childHasTransientStateChanged(param0: android.view.View, param1: boolean): void;
					public setClipToPadding(param0: boolean): void;
					public getDecoratedBoundsWithMargins(param0: android.view.View, param1: android.graphics.Rect): void;
					public fling(param0: number, param1: number): boolean;
					public onStopNestedScroll(param0: android.view.View): void;
					public draw(param0: android.graphics.Canvas): void;
					public canResolveLayoutDirection(): boolean;
					public findViewHolderForPosition(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public removeView(param0: android.view.View): void;
					public unscheduleDrawable(param0: android.graphics.drawable.Drawable, param1: javalangRunnable): void;
					public hasFixedSize(): boolean;
					public isLayoutFrozen(): boolean;
					public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.view.ViewGroup.LayoutParams;
					public setOnScrollListener(param0: android.support.v7.widget.RecyclerView.OnScrollListener): void;
					public invalidateDrawable(param0: android.graphics.drawable.Drawable): void;
					public onSizeChanged(param0: number, param1: number, param2: number, param3: number): void;
					public recomputeViewAttributes(param0: android.view.View): void;
					public getMaxFlingVelocity(): number;
					public focusableViewAvailable(param0: android.view.View): void;
					public setRecyclerListener(param0: android.support.v7.widget.RecyclerView.RecyclerListener): void;
					public addView(param0: android.view.View): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public smoothScrollBy(param0: number, param1: number): void;
					public drawChild(param0: android.graphics.Canvas, param1: android.view.View, param2: number): boolean;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public requestSendAccessibilityEvent(param0: android.view.View, param1: android.view.accessibility.AccessibilityEvent): boolean;
					public setViewCacheExtension(param0: android.support.v7.widget.RecyclerView.ViewCacheExtension): void;
					public addOnItemTouchListener(param0: android.support.v7.widget.RecyclerView.OnItemTouchListener): void;
					public setPreserveFocusAfterLayout(param0: boolean): void;
					public startNestedScroll(param0: number): boolean;
					public hasNestedScrollingParent(): boolean;
					public removeOnScrollListener(param0: android.support.v7.widget.RecyclerView.OnScrollListener): void;
				}
				export module RecyclerView {
					export abstract class Adapter extends javalangObject {
						public notifyItemMoved(param0: number, param1: number): void;
						public setHasStableIds(param0: boolean): void;
						public unregisterAdapterDataObserver(param0: android.support.v7.widget.RecyclerView.AdapterDataObserver): void;
						public createViewHolder(param0: android.view.ViewGroup, param1: number): android.support.v7.widget.RecyclerView.ViewHolder;
						public hasStableIds(): boolean;
						public onCreateViewHolder(param0: android.view.ViewGroup, param1: number): android.support.v7.widget.RecyclerView.ViewHolder;
						public bindViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number): void;
						public onBindViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number, param2: javautilList): void;
						public onFailedToRecycleView(param0: android.support.v7.widget.RecyclerView.ViewHolder): boolean;
						public getItemId(param0: number): number;
						public onViewRecycled(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public notifyItemChanged(param0: number): void;
						public notifyItemInserted(param0: number): void;
						public onAttachedToRecyclerView(param0: android.support.v7.widget.RecyclerView): void;
						public constructor();
						public hasObservers(): boolean;
						public onViewAttachedToWindow(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public onViewDetachedFromWindow(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public onBindViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number): void;
						public getItemViewType(param0: number): number;
						public notifyItemRangeChanged(param0: number, param1: number): void;
						public notifyItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public notifyItemRangeRemoved(param0: number, param1: number): void;
						public onDetachedFromRecyclerView(param0: android.support.v7.widget.RecyclerView): void;
						public notifyDataSetChanged(): void;
						public notifyItemRangeInserted(param0: number, param1: number): void;
						public getItemCount(): number;
						public notifyItemChanged(param0: number, param1: javalangObject): void;
						public notifyItemRemoved(param0: number): void;
						public registerAdapterDataObserver(param0: android.support.v7.widget.RecyclerView.AdapterDataObserver): void;
					}
					export class AdapterDataObservable extends android.database.Observable {
						public notifyItemMoved(param0: number, param1: number): void;
						public hasObservers(): boolean;
						public notifyItemRangeInserted(param0: number, param1: number): void;
						public notifyItemRangeChanged(param0: number, param1: number): void;
						public notifyItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public notifyChanged(): void;
						public notifyItemRangeRemoved(param0: number, param1: number): void;
					}
					export abstract class AdapterDataObserver extends javalangObject {
						public onItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public constructor();
						public onChanged(): void;
						public onItemRangeMoved(param0: number, param1: number, param2: number): void;
						public onItemRangeChanged(param0: number, param1: number): void;
						public onItemRangeInserted(param0: number, param1: number): void;
						public onItemRangeRemoved(param0: number, param1: number): void;
					}
					export class ChildDrawingOrderCallback extends javalangObject {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ChildDrawingOrderCallback interface with the provided implementation.
						 */
						public constructor(implementation: {
							onGetChildDrawingOrder(param0: number, param1: number): number;
						});
						public onGetChildDrawingOrder(param0: number, param1: number): number;
					}
					export abstract class ItemAnimator extends javalangObject {
						public static FLAG_CHANGED: number;
						public static FLAG_REMOVED: number;
						public static FLAG_INVALIDATED: number;
						public static FLAG_MOVED: number;
						public static FLAG_APPEARED_IN_PRE_LAYOUT: number;
						public setMoveDuration(param0: number): void;
						public animatePersistence(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public dispatchAnimationStarted(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public getMoveDuration(): number;
						public endAnimations(): void;
						public animateAppearance(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public isRunning(): boolean;
						public runPendingAnimations(): void;
						public animateDisappearance(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public getAddDuration(): number;
						public setAddDuration(param0: number): void;
						public canReuseUpdatedViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: javautilList): boolean;
						public setChangeDuration(param0: number): void;
						public recordPostLayoutInformation(param0: android.support.v7.widget.RecyclerView.State, param1: android.support.v7.widget.RecyclerView.ViewHolder): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						public recordPreLayoutInformation(param0: android.support.v7.widget.RecyclerView.State, param1: android.support.v7.widget.RecyclerView.ViewHolder, param2: number, param3: javautilList): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						public dispatchAnimationsFinished(): void;
						public getChangeDuration(): number;
						public constructor();
						public obtainHolderInfo(): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						public dispatchAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public canReuseUpdatedViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder): boolean;
						public endAnimation(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public setRemoveDuration(param0: number): void;
						public animateChange(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ViewHolder, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param3: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public onAnimationStarted(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public isRunning(param0: android.support.v7.widget.RecyclerView.ItemAnimator.ItemAnimatorFinishedListener): boolean;
						public getRemoveDuration(): number;
					}
					export module ItemAnimator {
						export class AdapterChanges extends javalangObject implements javalangannotationAnnotation {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ItemAnimator$AdapterChanges interface with the provided implementation.
							 */
							public constructor(implementation: {
								equals(param0: javalangObject): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): javalangClass;
							});
							public annotationType(): javalangClass;
							public hashCode(): number;
							public toString(): string;
							public equals(param0: javalangObject): boolean;
						}
						export class ItemAnimatorFinishedListener extends javalangObject {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ItemAnimator$ItemAnimatorFinishedListener interface with the provided implementation.
							 */
							public constructor(implementation: {
								onAnimationsFinished(): void;
							});
							public onAnimationsFinished(): void;
						}
						export class ItemAnimatorListener extends javalangObject {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ItemAnimator$ItemAnimatorListener interface with the provided implementation.
							 */
							public constructor(implementation: {
								onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
							});
							public onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						}
						export class ItemHolderInfo extends javalangObject {
							public left: number;
							public top: number;
							public right: number;
							public bottom: number;
							public changeFlags: number;
							public constructor();
							public setFrom(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
							public setFrom(param0: android.support.v7.widget.RecyclerView.ViewHolder): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						}
					}
					export class ItemAnimatorRestoreListener extends javalangObject implements android.support.v7.widget.RecyclerView.ItemAnimator.ItemAnimatorListener {
						public onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
					}
					export abstract class ItemDecoration extends javalangObject {
						public onDrawOver(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView, param2: android.support.v7.widget.RecyclerView.State): void;
						public constructor();
						public onDraw(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView): void;
						public getItemOffsets(param0: android.graphics.Rect, param1: android.view.View, param2: android.support.v7.widget.RecyclerView, param3: android.support.v7.widget.RecyclerView.State): void;
						public onDraw(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView, param2: android.support.v7.widget.RecyclerView.State): void;
						public onDrawOver(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView): void;
						public getItemOffsets(param0: android.graphics.Rect, param1: number, param2: android.support.v7.widget.RecyclerView): void;
					}
					export abstract class LayoutManager extends javalangObject {
						public onMeasure(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: number, param3: number): void;
						public getTransformedBoundingBox(param0: android.view.View, param1: boolean, param2: android.graphics.Rect): void;
						public getDecoratedBoundsWithMargins(param0: android.view.View, param1: android.graphics.Rect): void;
						public isLayoutHierarchical(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): boolean;
						public measureChildWithMargins(param0: android.view.View, param1: number, param2: number): void;
						public onItemsRemoved(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public getPaddingBottom(): number;
						public onSaveInstanceState(): android.os.Parcelable;
						public onInitializeAccessibilityNodeInfoForItem(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.View, param3: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
						public addView(param0: android.view.View): void;
						public computeVerticalScrollExtent(param0: android.support.v7.widget.RecyclerView.State): number;
						public getRowCountForAccessibility(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): number;
						public layoutDecorated(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
						public generateDefaultLayoutParams(): android.support.v7.widget.RecyclerView.LayoutParams;
						public constructor();
						public onDetachedFromWindow(param0: android.support.v7.widget.RecyclerView): void;
						public postOnAnimation(param0: javalangRunnable): void;
						public isAutoMeasureEnabled(): boolean;
						public onItemsAdded(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public getDecoratedBottom(param0: android.view.View): number;
						public isSmoothScrolling(): boolean;
						public detachAndScrapAttachedViews(param0: android.support.v7.widget.RecyclerView.Recycler): void;
						public getFocusedChild(): android.view.View;
						public requestLayout(): void;
						public onItemsMoved(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number, param3: number): void;
						public attachView(param0: android.view.View, param1: number): void;
						public removeAndRecycleAllViews(param0: android.support.v7.widget.RecyclerView.Recycler): void;
						public static getChildMeasureSpec(param0: number, param1: number, param2: number, param3: boolean): number;
						public generateLayoutParams(param0: android.content.Context, param1: android.util.AttributeSet): android.support.v7.widget.RecyclerView.LayoutParams;
						public getPaddingTop(): number;
						public computeHorizontalScrollOffset(param0: android.support.v7.widget.RecyclerView.State): number;
						public onAddFocusables(param0: android.support.v7.widget.RecyclerView, param1: javautilArrayList, param2: number, param3: number): boolean;
						public getMinimumWidth(): number;
						public removeViewAt(param0: number): void;
						public getPaddingLeft(): number;
						public setMeasuredDimension(param0: number, param1: number): void;
						public isFocused(): boolean;
						public onItemsUpdated(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number, param3: javalangObject): void;
						public getDecoratedLeft(param0: android.view.View): number;
						public scrollHorizontallyBy(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler, param2: android.support.v7.widget.RecyclerView.State): number;
						public isMeasurementCacheEnabled(): boolean;
						public removeAndRecycleViewAt(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public onLayoutCompleted(param0: android.support.v7.widget.RecyclerView.State): void;
						public assertInLayoutOrScroll(param0: string): void;
						public performAccessibilityAction(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: number, param3: android.os.Bundle): boolean;
						public onItemsChanged(param0: android.support.v7.widget.RecyclerView): void;
						public canScrollVertically(): boolean;
						public onDetachedFromWindow(param0: android.support.v7.widget.RecyclerView, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public getChildCount(): number;
						public getRightDecorationWidth(param0: android.view.View): number;
						public getWidthMode(): number;
						public getHeight(): number;
						public calculateItemDecorationsForChild(param0: android.view.View, param1: android.graphics.Rect): void;
						public supportsPredictiveItemAnimations(): boolean;
						public removeAllViews(): void;
						public onScrollStateChanged(param0: number): void;
						public getItemCount(): number;
						public getColumnCountForAccessibility(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): number;
						public findContainingItemView(param0: android.view.View): android.view.View;
						public removeAndRecycleView(param0: android.view.View, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public requestChildRectangleOnScreen(param0: android.support.v7.widget.RecyclerView, param1: android.view.View, param2: android.graphics.Rect, param3: boolean): boolean;
						public startSmoothScroll(param0: android.support.v7.widget.RecyclerView.SmoothScroller): void;
						public getLayoutDirection(): number;
						public getPosition(param0: android.view.View): number;
						public checkLayoutParams(param0: android.support.v7.widget.RecyclerView.LayoutParams): boolean;
						public detachAndScrapViewAt(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public setMeasurementCacheEnabled(param0: boolean): void;
						public computeHorizontalScrollExtent(param0: android.support.v7.widget.RecyclerView.State): number;
						public getItemViewType(param0: android.view.View): number;
						public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.support.v7.widget.RecyclerView.LayoutParams;
						public getBaseline(): number;
						public getTopDecorationHeight(param0: android.view.View): number;
						public setAutoMeasureEnabled(param0: boolean): void;
						public removeCallbacks(param0: javalangRunnable): boolean;
						public onRequestChildFocus(param0: android.support.v7.widget.RecyclerView, param1: android.view.View, param2: android.view.View): boolean;
						public addDisappearingView(param0: android.view.View, param1: number): void;
						public onInitializeAccessibilityEvent(param0: android.view.accessibility.AccessibilityEvent): void;
						public getPaddingRight(): number;
						public isItemPrefetchEnabled(): boolean;
						public getChildAt(param0: number): android.view.View;
						public ignoreView(param0: android.view.View): void;
						public onInitializeAccessibilityEvent(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.accessibility.AccessibilityEvent): void;
						public offsetChildrenHorizontal(param0: number): void;
						public layoutDecoratedWithMargins(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
						public onFocusSearchFailed(param0: android.view.View, param1: number, param2: android.support.v7.widget.RecyclerView.Recycler, param3: android.support.v7.widget.RecyclerView.State): android.view.View;
						public onAdapterChanged(param0: android.support.v7.widget.RecyclerView.Adapter, param1: android.support.v7.widget.RecyclerView.Adapter): void;
						public removeView(param0: android.view.View): void;
						public detachAndScrapView(param0: android.view.View, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public onInitializeAccessibilityNodeInfo(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
						public getPaddingEnd(): number;
						public onLayoutChildren(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): void;
						public computeVerticalScrollRange(param0: android.support.v7.widget.RecyclerView.State): number;
						public getClipToPadding(): boolean;
						public onRequestChildFocus(param0: android.support.v7.widget.RecyclerView, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.View, param3: android.view.View): boolean;
						public attachView(param0: android.view.View, param1: number, param2: android.support.v7.widget.RecyclerView.LayoutParams): void;
						public static getChildMeasureSpec(param0: number, param1: number, param2: number, param3: number, param4: boolean): number;
						public isAttachedToWindow(): boolean;
						public addView(param0: android.view.View, param1: number): void;
						public attachView(param0: android.view.View): void;
						public setMeasuredDimension(param0: android.graphics.Rect, param1: number, param2: number): void;
						public removeDetachedView(param0: android.view.View): void;
						public setItemPrefetchEnabled(param0: boolean): void;
						public endAnimation(param0: android.view.View): void;
						public offsetChildrenVertical(param0: number): void;
						public static getProperties(param0: android.content.Context, param1: android.util.AttributeSet, param2: number, param3: number): android.support.v7.widget.RecyclerView.LayoutManager.Properties;
						public moveView(param0: number, param1: number): void;
						public getHeightMode(): number;
						public computeVerticalScrollOffset(param0: android.support.v7.widget.RecyclerView.State): number;
						public scrollToPosition(param0: number): void;
						public scrollVerticallyBy(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler, param2: android.support.v7.widget.RecyclerView.State): number;
						public assertNotInLayoutOrScroll(param0: string): void;
						public getDecoratedTop(param0: android.view.View): number;
						public onInterceptFocusSearch(param0: android.view.View, param1: number): android.view.View;
						public requestSimpleAnimationsInNextLayout(): void;
						public smoothScrollToPosition(param0: android.support.v7.widget.RecyclerView, param1: android.support.v7.widget.RecyclerView.State, param2: number): void;
						public computeHorizontalScrollRange(param0: android.support.v7.widget.RecyclerView.State): number;
						public performAccessibilityActionForItem(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.View, param3: number, param4: android.os.Bundle): boolean;
						public onItemsUpdated(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public getSelectionModeForAccessibility(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): number;
						public hasFocus(): boolean;
						public getMinimumHeight(): number;
						public detachView(param0: android.view.View): void;
						public stopIgnoringView(param0: android.view.View): void;
						public measureChild(param0: android.view.View, param1: number, param2: number): void;
						public getBottomDecorationHeight(param0: android.view.View): number;
						public onAttachedToWindow(param0: android.support.v7.widget.RecyclerView): void;
						public getDecoratedMeasuredHeight(param0: android.view.View): number;
						public canScrollHorizontally(): boolean;
						public detachViewAt(param0: number): void;
						public static chooseSize(param0: number, param1: number, param2: number): number;
						public getWidth(): number;
						public addDisappearingView(param0: android.view.View): void;
						public getPaddingStart(): number;
						public getDecoratedRight(param0: android.view.View): number;
						public getLeftDecorationWidth(param0: android.view.View): number;
						public getDecoratedMeasuredWidth(param0: android.view.View): number;
						public onRestoreInstanceState(param0: android.os.Parcelable): void;
						public findViewByPosition(param0: number): android.view.View;
					}
					export module LayoutManager {
						export class Properties extends javalangObject {
							public orientation: number;
							public spanCount: number;
							public reverseLayout: boolean;
							public stackFromEnd: boolean;
							public constructor();
						}
					}
					export class LayoutParams extends android.view.ViewGroup.MarginLayoutParams {
						public constructor(param0: android.view.ViewGroup.MarginLayoutParams);
						public isItemChanged(): boolean;
						public constructor(param0: android.view.ViewGroup.LayoutParams);
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public isItemRemoved(): boolean;
						public getViewPosition(): number;
						public getViewAdapterPosition(): number;
						public isViewInvalid(): boolean;
						public constructor(param0: android.support.v7.widget.RecyclerView.LayoutParams);
						public getViewLayoutPosition(): number;
						public viewNeedsUpdate(): boolean;
						public constructor(param0: number, param1: number);
					}
					export class OnChildAttachStateChangeListener extends javalangObject {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$OnChildAttachStateChangeListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onChildViewAttachedToWindow(param0: android.view.View): void;
							onChildViewDetachedFromWindow(param0: android.view.View): void;
						});
						public onChildViewAttachedToWindow(param0: android.view.View): void;
						public onChildViewDetachedFromWindow(param0: android.view.View): void;
					}
					export abstract class OnFlingListener extends javalangObject {
						public constructor();
						public onFling(param0: number, param1: number): boolean;
					}
					export class OnItemTouchListener extends javalangObject {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$OnItemTouchListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onInterceptTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): boolean;
							onTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): void;
							onRequestDisallowInterceptTouchEvent(param0: boolean): void;
						});
						public onInterceptTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): boolean;
						public onTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): void;
						public onRequestDisallowInterceptTouchEvent(param0: boolean): void;
					}
					export abstract class OnScrollListener extends javalangObject {
						public constructor();
						public onScrolled(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public onScrollStateChanged(param0: android.support.v7.widget.RecyclerView, param1: number): void;
					}
					export class RecycledViewPool extends javalangObject {
						public constructor();
						public putRecycledView(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public clear(): void;
						public setMaxRecycledViews(param0: number, param1: number): void;
						public getRecycledView(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					}
					export class Recycler extends javalangObject {
						public getViewForPosition(param0: number): android.view.View;
						public recycleView(param0: android.view.View): void;
						public constructor(param0: android.support.v7.widget.RecyclerView);
						public setViewCacheSize(param0: number): void;
						public getScrapList(): javautilList;
						public clear(): void;
						public bindViewToPosition(param0: android.view.View, param1: number): void;
						public convertPreLayoutPositionToPostLayout(param0: number): number;
					}
					export class RecyclerListener extends javalangObject {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$RecyclerListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onViewRecycled(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						});
						public onViewRecycled(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
					}
					export class RecyclerViewDataObserver extends android.support.v7.widget.RecyclerView.AdapterDataObserver {
						public onItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public onChanged(): void;
						public onItemRangeMoved(param0: number, param1: number, param2: number): void;
						public onItemRangeChanged(param0: number, param1: number): void;
						public onItemRangeInserted(param0: number, param1: number): void;
						public onItemRangeRemoved(param0: number, param1: number): void;
					}
					export class SavedState {
						public static CREATOR: android.os.Parcelable.Creator;
						public writeToParcel(param0: android.os.Parcel, param1: number): void;
					}
					export class SimpleOnItemTouchListener extends javalangObject implements android.support.v7.widget.RecyclerView.OnItemTouchListener {
						public constructor();
						public onInterceptTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): boolean;
						public onTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): void;
						public onRequestDisallowInterceptTouchEvent(param0: boolean): void;
					}
					export abstract class SmoothScroller extends javalangObject {
						public onTargetFound(param0: android.view.View, param1: android.support.v7.widget.RecyclerView.State, param2: android.support.v7.widget.RecyclerView.SmoothScroller.Action): void;
						public constructor();
						public getChildCount(): number;
						public getLayoutManager(): android.support.v7.widget.RecyclerView.LayoutManager;
						public onSeekTargetStep(param0: number, param1: number, param2: android.support.v7.widget.RecyclerView.State, param3: android.support.v7.widget.RecyclerView.SmoothScroller.Action): void;
						public onChildAttachedToWindow(param0: android.view.View): void;
						public stop(): void;
						public isRunning(): boolean;
						public onStop(): void;
						public setTargetPosition(param0: number): void;
						public getChildPosition(param0: android.view.View): number;
						public instantScrollToPosition(param0: number): void;
						public isPendingInitialRun(): boolean;
						public normalize(param0: android.graphics.PointF): void;
						public getTargetPosition(): number;
						public findViewByPosition(param0: number): android.view.View;
						public onStart(): void;
					}
					export module SmoothScroller {
						export class Action extends javalangObject {
							public static UNDEFINED_DURATION: number;
							public constructor(param0: number, param1: number);
							public setDuration(param0: number): void;
							public getInterpolator(): android.view.animation.Interpolator;
							public setDy(param0: number): void;
							public update(param0: number, param1: number, param2: number, param3: android.view.animation.Interpolator): void;
							public getDx(): number;
							public constructor(param0: number, param1: number, param2: number);
							public constructor(param0: number, param1: number, param2: number, param3: android.view.animation.Interpolator);
							public setDx(param0: number): void;
							public getDy(): number;
							public setInterpolator(param0: android.view.animation.Interpolator): void;
							public getDuration(): number;
							public jumpTo(param0: number): void;
						}
						export class ScrollVectorProvider extends javalangObject {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$SmoothScroller$ScrollVectorProvider interface with the provided implementation.
							 */
							public constructor(implementation: {
								computeScrollVectorForPosition(param0: number): android.graphics.PointF;
							});
							public computeScrollVectorForPosition(param0: number): android.graphics.PointF;
						}
					}
					export class State extends javalangObject {
						public constructor();
						public isMeasuring(): boolean;
						public toString(): string;
						public getTargetScrollPosition(): number;
						public willRunPredictiveAnimations(): boolean;
						public get(param0: number): javalangObject;
						public hasTargetScrollPosition(): boolean;
						public willRunSimpleAnimations(): boolean;
						public getItemCount(): number;
						public didStructureChange(): boolean;
						public isPreLayout(): boolean;
						public remove(param0: number): void;
						public put(param0: number, param1: javalangObject): void;
					}
					export abstract class ViewCacheExtension extends javalangObject {
						public constructor();
						public getViewForPositionAndType(param0: android.support.v7.widget.RecyclerView.Recycler, param1: number, param2: number): android.view.View;
					}
					export class ViewFlinger extends javalangObject implements javalangRunnable {
						public smoothScrollBy(param0: number, param1: number, param2: number): void;
						public run(): void;
						public constructor(param0: android.support.v7.widget.RecyclerView);
						public smoothScrollBy(param0: number, param1: number, param2: number, param3: number): void;
						public smoothScrollBy(param0: number, param1: number): void;
						public smoothScrollBy(param0: number, param1: number, param2: number, param3: android.view.animation.Interpolator): void;
						public fling(param0: number, param1: number): void;
						public stop(): void;
					}
					export abstract class ViewHolder extends javalangObject {
						public itemView: android.view.View;
						public isRecyclable(): boolean;
						public getAdapterPosition(): number;
						public constructor(param0: android.view.View);
						public getItemViewType(): number;
						public setIsRecyclable(param0: boolean): void;
						public getPosition(): number;
						public getLayoutPosition(): number;
						public getOldPosition(): number;
						public toString(): string;
						public getItemId(): number;
					}
					export class ViewPrefetcher extends javalangObject implements javalangRunnable {
						public postFromTraversal(param0: number, param1: number): void;
						public lastPrefetchIncludedPosition(param0: number): boolean;
						public run(): void;
						public clearPrefetchPositions(): void;
					}
				}
			}
		}
	}
}

