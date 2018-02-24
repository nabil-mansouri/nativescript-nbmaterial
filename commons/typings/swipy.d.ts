declare module android {
	export module support {
		export module v4 {
			export module widget {
				export class SwipeRefreshLayout extends android.view.ViewGroup {
					public static LARGE: number;
					public static DEFAULT: number;
					public mFrom: number;
					public mOriginalOffsetTop: number;
					public onNestedFling(param0: android.view.View, param1: number, param2: number, param3: boolean): boolean;
					public onKeyUp(param0: number, param1: android.view.KeyEvent): boolean;
					public startActionModeForChild(param0: android.view.View, param1: android.view.ActionMode.Callback, param2: number): android.view.ActionMode;
					public startActionModeForChild(param0: android.view.View, param1: android.view.ActionMode.Callback): android.view.ActionMode;
					public sendAccessibilityEventUnchecked(param0: android.view.accessibility.AccessibilityEvent): void;
					public getChildDrawingOrder(param0: number, param1: number): number;
					public notifySubtreeAccessibilityStateChanged(param0: android.view.View, param1: android.view.View, param2: number): void;
					public invalidateChildInParent(param0: native.Array<number>, param1: android.graphics.Rect): android.view.ViewParent;
					public isLayoutRequested(): boolean;
					public clearChildFocus(param0: android.view.View): void;
					public isRefreshing(): boolean;
					public isTextDirectionResolved(): boolean;
					public onNestedPreFling(param0: android.view.View, param1: number, param2: number): boolean;
					public showContextMenuForChild(param0: android.view.View): boolean;
					public isLayoutDirectionResolved(): boolean;
					public addView(param0: android.view.View, param1: number): void;
					public setOnRefreshListener(param0: android.support.v4.widget.SwipeRefreshLayout.OnRefreshListener): void;
					public showContextMenuForChild(param0: android.view.View, param1: number, param2: number): boolean;
					public requestChildFocus(param0: android.view.View, param1: android.view.View): void;
					public onTouchEvent(param0: android.view.MotionEvent): boolean;
					public scheduleDrawable(param0: android.graphics.drawable.Drawable, param1: javalangRunnable, param2: number): void;
					public setRefreshing(param0: boolean): void;
					public bringChildToFront(param0: android.view.View): void;
					public updateViewLayout(param0: android.view.View, param1: android.view.ViewGroup.LayoutParams): void;
					public getLayoutDirection(): number;
					public getParentForAccessibility(): android.view.ViewParent;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number, param3: number);
					public addView(param0: android.view.View, param1: number, param2: number): void;
					public createContextMenu(param0: android.view.ContextMenu): void;
					public setColorSchemeResources(param0: native.Array<number>): void;
					public addView(param0: android.view.View, param1: android.view.ViewGroup.LayoutParams): void;
					public childDrawableStateChanged(param0: android.view.View): void;
					public getChildVisibleRect(param0: android.view.View, param1: android.graphics.Rect, param2: android.graphics.Point): boolean;
					public getTextDirection(): number;
					public requestFitSystemWindows(): void;
					public focusSearch(param0: number): android.view.View;
					public onNestedScrollAccepted(param0: android.view.View, param1: android.view.View, param2: number): void;
					public setProgressBackgroundColorSchemeColor(param0: number): void;
					public onInterceptTouchEvent(param0: android.view.MotionEvent): boolean;
					public setProgressViewEndTarget(param0: boolean, param1: number): void;
					public isTextAlignmentResolved(): boolean;
					public requestTransparentRegion(param0: android.view.View): void;
					public onNestedPreScroll(param0: android.view.View, param1: number, param2: number, param3: native.Array<number>): void;
					public onKeyDown(param0: number, param1: android.view.KeyEvent): boolean;
					public setSize(param0: number): void;
					public onStartNestedScroll(param0: android.view.View, param1: android.view.View, param2: number): boolean;
					public setProgressBackgroundColor(param0: number): void;
					public canResolveTextAlignment(): boolean;
					public setColorScheme(param0: native.Array<number>): void;
					public onNestedScroll(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
					public canResolveTextDirection(): boolean;
					public addView(param0: android.view.View, param1: number, param2: android.view.ViewGroup.LayoutParams): void;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public onKeyMultiple(param0: number, param1: number, param2: android.view.KeyEvent): boolean;
					public requestChildRectangleOnScreen(param0: android.view.View, param1: android.graphics.Rect, param2: boolean): boolean;
					public setProgressBackgroundColorSchemeResource(param0: number): void;
					public getParent(): android.view.ViewParent;
					public childHasTransientStateChanged(param0: android.view.View, param1: boolean): void;
					public onKeyLongPress(param0: number, param1: android.view.KeyEvent): boolean;
					public setColorSchemeColors(param0: native.Array<number>): void;
					public setDistanceToTriggerSync(param0: number): void;
					public onStopNestedScroll(param0: android.view.View): void;
					public sendAccessibilityEvent(param0: number): void;
					public requestLayout(): void;
					public onMeasure(param0: number, param1: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public canResolveLayoutDirection(): boolean;
					public onNestedPrePerformAccessibilityAction(param0: android.view.View, param1: number, param2: android.os.Bundle): boolean;
					public removeView(param0: android.view.View): void;
					public getTextAlignment(): number;
					public unscheduleDrawable(param0: android.graphics.drawable.Drawable, param1: javalangRunnable): void;
					public invalidateChild(param0: android.view.View, param1: android.graphics.Rect): void;
					public invalidateDrawable(param0: android.graphics.drawable.Drawable): void;
					public recomputeViewAttributes(param0: android.view.View): void;
					public canChildScrollUp(): boolean;
					public focusableViewAvailable(param0: android.view.View): void;
					public unscheduleDrawable(param0: android.graphics.drawable.Drawable): void;
					public constructor(param0: android.content.Context);
					public addView(param0: android.view.View): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public focusSearch(param0: android.view.View, param1: number): android.view.View;
					public setProgressViewOffset(param0: boolean, param1: number, param2: number): void;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public requestSendAccessibilityEvent(param0: android.view.View, param1: android.view.accessibility.AccessibilityEvent): boolean;
					public getProgressCircleDiameter(): number;
				}
				export module SwipeRefreshLayout {
					export class OnRefreshListener extends javalangObject {
						/**
						 * Constructs a new instance of the android.support.v4.widget.SwipeRefreshLayout$OnRefreshListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onRefresh(): void;
						});
						public onRefresh(): void;
					}
				}
			}
		}
	}
}