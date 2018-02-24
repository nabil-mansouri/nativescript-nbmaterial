
declare class MDCActivityIndicator extends UIView {

	static alloc(): MDCActivityIndicator; // inherited from NSObject

	static appearance(): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCActivityIndicator; // inherited from UIAppearance

	static new(): MDCActivityIndicator; // inherited from NSObject

	animating: boolean;

	cycleColors: NSArray<UIColor>;

	delegate: MDCActivityIndicatorDelegate;

	indicatorMode: MDCActivityIndicatorMode;

	progress: number;

	radius: number;

	strokeWidth: number;

	trackEnabled: boolean;

	setIndicatorModeAnimated(mode: MDCActivityIndicatorMode, animated: boolean): void;

	startAnimating(): void;

	stopAnimating(): void;
}

declare class MDCActivityIndicatorColorThemer extends NSObject {

	static alloc(): MDCActivityIndicatorColorThemer; // inherited from NSObject

	static applyColorSchemeToActivityIndicator(colorScheme: NSObject, activityIndicator: MDCActivityIndicator): void;

	static new(): MDCActivityIndicatorColorThemer; // inherited from NSObject
}

interface MDCActivityIndicatorDelegate extends NSObjectProtocol {

	activityIndicatorAnimationDidFinish?(activityIndicator: MDCActivityIndicator): void;
}
declare var MDCActivityIndicatorDelegate: {

	prototype: MDCActivityIndicatorDelegate;
};

declare const enum MDCActivityIndicatorMode {

	Indeterminate = 0,

	Determinate = 1
}

declare class MDCAlertAction extends NSObject implements NSCopying {

	static actionWithTitleHandler(title: string, handler: (p1: MDCAlertAction) => void): MDCAlertAction;

	static alloc(): MDCAlertAction; // inherited from NSObject

	static new(): MDCAlertAction; // inherited from NSObject

	readonly title: string;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MDCAlertColorThemer extends NSObject {

	static alloc(): MDCAlertColorThemer; // inherited from NSObject

	static applyColorScheme(colorScheme: NSObject): void;

	static new(): MDCAlertColorThemer; // inherited from NSObject
}

declare class MDCAlertController extends UIViewController {

	static alertControllerWithTitleMessage(title: string, message: string): MDCAlertController;

	static alloc(): MDCAlertController; // inherited from NSObject

	static new(): MDCAlertController; // inherited from NSObject

	readonly actions: NSArray<MDCAlertAction>;

	mdc_adjustsFontForContentSizeCategory: boolean;

	message: string;

	addAction(action: MDCAlertAction): void;
}

declare const enum MDCAnimationTimingFunction {

	EaseInOut = 0,

	EaseOut = 1,

	EaseIn = 2,

	Translate = 0,

	TranslateOnScreen = 1,

	TranslateOffScreen = 2,

	FadeIn = 1,

	FadeOut = 2
}

declare class MDCAppBar extends NSObject {

	static alloc(): MDCAppBar; // inherited from NSObject

	static new(): MDCAppBar; // inherited from NSObject

	readonly headerStackView: MDCHeaderStackView;

	readonly headerViewController: MDCFlexibleHeaderViewController;

	readonly navigationBar: MDCNavigationBar;

	addSubviewsToParent(): void;
}

declare class MDCAppBarColorThemer extends NSObject {

	static alloc(): MDCAppBarColorThemer; // inherited from NSObject

	static applyColorSchemeToAppBar(colorScheme: NSObject, appBar: MDCAppBar): void;

	static new(): MDCAppBarColorThemer; // inherited from NSObject
}

declare class MDCAppBarContainerViewController extends UIViewController {

	static alloc(): MDCAppBarContainerViewController; // inherited from NSObject

	static new(): MDCAppBarContainerViewController; // inherited from NSObject

	readonly appBar: MDCAppBar;

	readonly contentViewController: UIViewController;

	constructor(o: { contentViewController: UIViewController; });

	initWithContentViewController(contentViewController: UIViewController): this;
}

declare class MDCAppBarTextColorAccessibilityMutator extends NSObject {

	static alloc(): MDCAppBarTextColorAccessibilityMutator; // inherited from NSObject

	static new(): MDCAppBarTextColorAccessibilityMutator; // inherited from NSObject

	mutate(appBar: MDCAppBar): void;
}

declare function MDCAutoresizingFlexibleLeadingMargin(layoutDirection: UIUserInterfaceLayoutDirection): UIViewAutoresizing;

declare function MDCAutoresizingFlexibleTrailingMargin(layoutDirection: UIUserInterfaceLayoutDirection): UIViewAutoresizing;

declare const enum MDCBarButtonItemLayoutHints {

	None = 0,

	IsFirstButton = 1,

	IsLastButton = 2
}

declare class MDCBasicColorScheme extends NSObject implements MDCColorScheme, NSCopying {

	static alloc(): MDCBasicColorScheme; // inherited from NSObject

	static new(): MDCBasicColorScheme; // inherited from NSObject

	readonly primaryColor: UIColor; // inherited from MDCColorScheme

	readonly primaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly primaryLightColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryLightColor: UIColor; // inherited from MDCColorScheme

	constructor(o: { primaryColor: UIColor; });

	constructor(o: { primaryColor: UIColor; primaryLightColor: UIColor; primaryDarkColor: UIColor; });

	constructor(o: { primaryColor: UIColor; primaryLightColor: UIColor; primaryDarkColor: UIColor; secondaryColor: UIColor; secondaryLightColor: UIColor; secondaryDarkColor: UIColor; });

	constructor(o: { primaryColor: UIColor; secondaryColor: UIColor; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithPrimaryColor(primaryColor: UIColor): this;

	initWithPrimaryColorPrimaryLightColorPrimaryDarkColor(primaryColor: UIColor, primaryLightColor: UIColor, primaryDarkColor: UIColor): this;

	initWithPrimaryColorPrimaryLightColorPrimaryDarkColorSecondaryColorSecondaryLightColorSecondaryDarkColor(primaryColor: UIColor, primaryLightColor: UIColor, primaryDarkColor: UIColor, secondaryColor: UIColor, secondaryLightColor: UIColor, secondaryDarkColor: UIColor): this;

	initWithPrimaryColorSecondaryColor(primaryColor: UIColor, secondaryColor: UIColor): this;
}

declare class MDCBottomSheetController extends UIViewController {

	static alloc(): MDCBottomSheetController; // inherited from NSObject

	static new(): MDCBottomSheetController; // inherited from NSObject

	readonly contentViewController: UIViewController;

	delegate: MDCBottomSheetControllerDelegate;

	constructor(o: { contentViewController: UIViewController; });

	initWithContentViewController(contentViewController: UIViewController): this;
}

interface MDCBottomSheetControllerDelegate extends NSObjectProtocol {

	bottomSheetControllerDidDismissBottomSheet(controller: MDCBottomSheetController): void;
}
declare var MDCBottomSheetControllerDelegate: {

	prototype: MDCBottomSheetControllerDelegate;
};

declare class MDCBottomSheetPresentationController extends UIPresentationController {

	static alloc(): MDCBottomSheetPresentationController; // inherited from NSObject

	static new(): MDCBottomSheetPresentationController; // inherited from NSObject

	delegate: MDCBottomSheetPresentationControllerDelegate;
}

interface MDCBottomSheetPresentationControllerDelegate extends UIAdaptivePresentationControllerDelegate {

	bottomSheetPresentationControllerDidDismissBottomSheet?(bottomSheet: MDCBottomSheetPresentationController): void;

	prepareForBottomSheetPresentation?(bottomSheet: MDCBottomSheetPresentationController): void;
}
declare var MDCBottomSheetPresentationControllerDelegate: {

	prototype: MDCBottomSheetPresentationControllerDelegate;
};

declare class MDCBottomSheetTransitionController extends NSObject implements UIViewControllerAnimatedTransitioning, UIViewControllerTransitioningDelegate {

	static alloc(): MDCBottomSheetTransitionController; // inherited from NSObject

	static new(): MDCBottomSheetTransitionController; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animateTransition(transitionContext: UIViewControllerContextTransitioning): void;

	animationControllerForDismissedController(dismissed: UIViewController): UIViewControllerAnimatedTransitioning;

	animationControllerForPresentedControllerPresentingControllerSourceController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning;

	animationEnded(transitionCompleted: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interactionControllerForPresentation(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interruptibleAnimatorForTransition(transitionContext: UIViewControllerContextTransitioning): UIViewImplicitlyAnimating;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIPresentationController;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	transitionDuration(transitionContext: UIViewControllerContextTransitioning): number;
}

declare class MDCButton extends UIButton {

	static alloc(): MDCButton; // inherited from NSObject

	static appearance(): MDCButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCButton; // inherited from UIButton

	static new(): MDCButton; // inherited from NSObject

	customTitleColor: UIColor;

	disabledAlpha: number;

	hitAreaInsets: UIEdgeInsets;

	inkColor: UIColor;

	inkMaxRippleRadius: number;

	inkStyle: MDCInkStyle;

	mdc_adjustsFontForContentSizeCategory: boolean;

	shouldCapitalizeTitle: boolean;

	shouldRaiseOnTouch: boolean;

	underlyingColor: UIColor;

	underlyingColorHint: UIColor;

	uppercaseTitle: boolean;

	backgroundColorForState(state: UIControlState): UIColor;

	elevationForState(state: UIControlState): number;

	setBackgroundColor(backgroundColor: UIColor): void;

	setBackgroundColorForState(backgroundColor: UIColor, state: UIControlState): void;

	setElevationForState(elevation: number, state: UIControlState): void;

	setEnabledAnimated(enabled: boolean, animated: boolean): void;
}

declare class MDCButtonBar extends UIView {

	static alloc(): MDCButtonBar; // inherited from NSObject

	static appearance(): MDCButtonBar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCButtonBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCButtonBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCButtonBar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCButtonBar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCButtonBar; // inherited from UIAppearance

	static new(): MDCButtonBar; // inherited from NSObject

	buttonTitleBaseline: number;

	items: NSArray<UIBarButtonItem>;

	layoutPosition: MDCButtonBarLayoutPosition;
}

declare class MDCButtonBarColorThemer extends NSObject {

	static alloc(): MDCButtonBarColorThemer; // inherited from NSObject

	static applyColorSchemeToButtonBar(colorScheme: NSObject, buttonBar: MDCButtonBar): void;

	static new(): MDCButtonBarColorThemer; // inherited from NSObject
}

interface MDCButtonBarDelegate extends NSObjectProtocol {

	buttonBarViewForItemLayoutHints(buttonBar: MDCButtonBar, barButtonItem: UIBarButtonItem, layoutHints: MDCBarButtonItemLayoutHints): UIView;
}
declare var MDCButtonBarDelegate: {

	prototype: MDCButtonBarDelegate;
};

declare const enum MDCButtonBarLayoutPosition {

	None = 0,

	Leading = 1,

	Left = 1,

	Trailing = 2,

	Right = 2
}

declare class MDCButtonColorThemer extends NSObject {

	static alloc(): MDCButtonColorThemer; // inherited from NSObject

	static applyColorSchemeToButton(colorScheme: NSObject, button: MDCButton): void;

	static new(): MDCButtonColorThemer; // inherited from NSObject
}

declare class MDCButtonTitleColorAccessibilityMutator extends NSObject {

	static alloc(): MDCButtonTitleColorAccessibilityMutator; // inherited from NSObject

	static changeTitleColorOfButton(button: MDCButton): void;

	static new(): MDCButtonTitleColorAccessibilityMutator; // inherited from NSObject
}

declare var MDCCellDefaultOneLineHeight: number;

declare var MDCCellDefaultOneLineWithAvatarHeight: number;

declare var MDCCellDefaultThreeLineHeight: number;

declare var MDCCellDefaultTwoLineHeight: number;

declare class MDCCollectionViewCell extends UICollectionViewCell {

	static alloc(): MDCCollectionViewCell; // inherited from NSObject

	static appearance(): MDCCollectionViewCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCCollectionViewCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCCollectionViewCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCCollectionViewCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCCollectionViewCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCCollectionViewCell; // inherited from UIAppearance

	static new(): MDCCollectionViewCell; // inherited from NSObject

	accessoryInset: UIEdgeInsets;

	accessoryType: MDCCollectionViewCellAccessoryType;

	accessoryView: UIView;

	allowsCellInteractionsWhileEditing: boolean;

	editing: boolean;

	editingSelectorColor: UIColor;

	inkView: MDCInkView;

	separatorInset: UIEdgeInsets;

	shouldHideSeparator: boolean;

	setEditingAnimated(editing: boolean, animated: boolean): void;
}

declare const enum MDCCollectionViewCellAccessoryType {

	None = 0,

	DisclosureIndicator = 1,

	Checkmark = 2,

	DetailButton = 3
}

declare const enum MDCCollectionViewCellLayoutType {

	List = 0,

	Grid = 1,

	Custom = 2
}

declare const enum MDCCollectionViewCellStyle {

	Default = 0,

	Grouped = 1,

	Card = 2
}

declare var MDCCollectionViewCellStyleCardSectionInset: number;

declare class MDCCollectionViewController extends UICollectionViewController implements MDCCollectionViewEditingDelegate, MDCCollectionViewStylingDelegate, UICollectionViewDelegateFlowLayout {

	static alloc(): MDCCollectionViewController; // inherited from NSObject

	static new(): MDCCollectionViewController; // inherited from NSObject

	readonly editor: MDCCollectionViewEditing;

	readonly styler: MDCCollectionViewStyling;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	cellWidthAtSectionIndex(section: number): number;

	class(): typeof NSObject;

	collectionViewAllowsEditing(collectionView: UICollectionView): boolean;

	collectionViewAllowsReordering(collectionView: UICollectionView): boolean;

	collectionViewAllowsSwipeToDismissItem(collectionView: UICollectionView): boolean;

	collectionViewAllowsSwipeToDismissSection(collectionView: UICollectionView): boolean;

	collectionViewCanEditItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanFocusItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanMoveItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanMoveItemAtIndexPathToIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath, newIndexPath: NSIndexPath): boolean;

	collectionViewCanPerformActionForItemAtIndexPathWithSender(collectionView: UICollectionView, action: string, indexPath: NSIndexPath, sender: any): boolean;

	collectionViewCanSelectItemDuringEditingAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanSwipeToDismissItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanSwipeToDismissSection(collectionView: UICollectionView, section: number): boolean;

	collectionViewCellBackgroundColorAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UIColor;

	collectionViewCellHeightAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): number;

	collectionViewCellStyleForSection(collectionView: UICollectionView, section: number): MDCCollectionViewCellStyle;

	collectionViewDidApplyInlayToItemAtIndexPaths(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewDidBeginEditing(collectionView: UICollectionView): void;

	collectionViewDidCancelSwipeToDismissItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidCancelSwipeToDismissSection(collectionView: UICollectionView, section: number): void;

	collectionViewDidDeleteItemsAtIndexPaths(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewDidDeleteSections(collectionView: UICollectionView, sections: NSIndexSet): void;

	collectionViewDidDeselectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidEndDisplayingCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;

	collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAtIndexPath(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;

	collectionViewDidEndDraggingItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidEndEditing(collectionView: UICollectionView): void;

	collectionViewDidEndSwipeToDismissItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidEndSwipeToDismissSection(collectionView: UICollectionView, section: number): void;

	collectionViewDidHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidMoveItemAtIndexPathToIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath, newIndexPath: NSIndexPath): void;

	collectionViewDidRemoveInlayFromItemAtIndexPaths(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewDidSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidUnhighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidUpdateFocusInContextWithAnimationCoordinator(collectionView: UICollectionView, context: UICollectionViewFocusUpdateContext, coordinator: UIFocusAnimationCoordinator): void;

	collectionViewHidesInkViewAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewInkColorAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UIColor;

	collectionViewInkTouchControllerInkViewAtIndexPath(collectionView: UICollectionView, inkTouchController: MDCInkTouchController, indexPath: NSIndexPath): MDCInkView;

	collectionViewLayoutInsetForSectionAtIndex(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): UIEdgeInsets;

	collectionViewLayoutMinimumInteritemSpacingForSectionAtIndex(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): number;

	collectionViewLayoutMinimumLineSpacingForSectionAtIndex(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): number;

	collectionViewLayoutReferenceSizeForFooterInSection(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): CGSize;

	collectionViewLayoutReferenceSizeForHeaderInSection(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): CGSize;

	collectionViewLayoutSizeForItemAtIndexPath(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, indexPath: NSIndexPath): CGSize;

	collectionViewPerformActionForItemAtIndexPathWithSender(collectionView: UICollectionView, action: string, indexPath: NSIndexPath, sender: any): void;

	collectionViewShouldDeselectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldHideFooterBackgroundForSection(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideFooterSeparatorForSection(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideHeaderBackgroundForSection(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideHeaderSeparatorForSection(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideItemBackgroundAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldHideItemSeparatorAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldShowMenuForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldUpdateFocusInContext(collectionView: UICollectionView, context: UICollectionViewFocusUpdateContext): boolean;

	collectionViewTargetContentOffsetForProposedContentOffset(collectionView: UICollectionView, proposedContentOffset: CGPoint): CGPoint;

	collectionViewTargetIndexPathForMoveFromItemAtIndexPathToProposedIndexPath(collectionView: UICollectionView, originalIndexPath: NSIndexPath, proposedIndexPath: NSIndexPath): NSIndexPath;

	collectionViewTransitionLayoutForOldLayoutNewLayout(collectionView: UICollectionView, fromLayout: UICollectionViewLayout, toLayout: UICollectionViewLayout): UICollectionViewTransitionLayout;

	collectionViewWillBeginDraggingItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewWillBeginEditing(collectionView: UICollectionView): void;

	collectionViewWillBeginSwipeToDismissItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewWillBeginSwipeToDismissSection(collectionView: UICollectionView, section: number): void;

	collectionViewWillDeleteItemsAtIndexPaths(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewWillDeleteSections(collectionView: UICollectionView, sections: NSIndexSet): void;

	collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;

	collectionViewWillDisplaySupplementaryViewForElementKindAtIndexPath(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;

	collectionViewWillEndEditing(collectionView: UICollectionView): void;

	collectionViewWillMoveItemAtIndexPathToIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath, newIndexPath: NSIndexPath): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	indexPathForPreferredFocusedViewInCollectionView(collectionView: UICollectionView): NSIndexPath;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	self(): this;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

interface MDCCollectionViewEditing extends NSObjectProtocol {

	collectionView: UICollectionView;

	delegate: MDCCollectionViewEditingDelegate;

	dismissingCellIndexPath: NSIndexPath;

	dismissingSection: number;

	editing: boolean;

	reorderingCellIndexPath: NSIndexPath;

	setEditingAnimated(editing: boolean, animated: boolean): void;
}
declare var MDCCollectionViewEditing: {

	prototype: MDCCollectionViewEditing;
};

interface MDCCollectionViewEditingDelegate extends NSObjectProtocol {

	collectionViewAllowsEditing?(collectionView: UICollectionView): boolean;

	collectionViewAllowsReordering?(collectionView: UICollectionView): boolean;

	collectionViewAllowsSwipeToDismissItem?(collectionView: UICollectionView): boolean;

	collectionViewAllowsSwipeToDismissSection?(collectionView: UICollectionView): boolean;

	collectionViewCanEditItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanMoveItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanMoveItemAtIndexPathToIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath, newIndexPath: NSIndexPath): boolean;

	collectionViewCanSelectItemDuringEditingAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanSwipeToDismissItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewCanSwipeToDismissSection?(collectionView: UICollectionView, section: number): boolean;

	collectionViewDidBeginEditing?(collectionView: UICollectionView): void;

	collectionViewDidCancelSwipeToDismissItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidCancelSwipeToDismissSection?(collectionView: UICollectionView, section: number): void;

	collectionViewDidDeleteItemsAtIndexPaths?(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewDidDeleteSections?(collectionView: UICollectionView, sections: NSIndexSet): void;

	collectionViewDidEndDraggingItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidEndEditing?(collectionView: UICollectionView): void;

	collectionViewDidEndSwipeToDismissItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewDidEndSwipeToDismissSection?(collectionView: UICollectionView, section: number): void;

	collectionViewDidMoveItemAtIndexPathToIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath, newIndexPath: NSIndexPath): void;

	collectionViewWillBeginDraggingItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewWillBeginEditing?(collectionView: UICollectionView): void;

	collectionViewWillBeginSwipeToDismissItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;

	collectionViewWillBeginSwipeToDismissSection?(collectionView: UICollectionView, section: number): void;

	collectionViewWillDeleteItemsAtIndexPaths?(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewWillDeleteSections?(collectionView: UICollectionView, sections: NSIndexSet): void;

	collectionViewWillEndEditing?(collectionView: UICollectionView): void;

	collectionViewWillMoveItemAtIndexPathToIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath, newIndexPath: NSIndexPath): void;
}
declare var MDCCollectionViewEditingDelegate: {

	prototype: MDCCollectionViewEditingDelegate;
};

declare class MDCCollectionViewFlowLayout extends UICollectionViewFlowLayout {

	static alloc(): MDCCollectionViewFlowLayout; // inherited from NSObject

	static new(): MDCCollectionViewFlowLayout; // inherited from NSObject
}

declare class MDCCollectionViewLayoutAttributes extends UICollectionViewLayoutAttributes implements NSCopying {

	static alloc(): MDCCollectionViewLayoutAttributes; // inherited from NSObject

	static layoutAttributesForCellWithIndexPath(indexPath: NSIndexPath): MDCCollectionViewLayoutAttributes; // inherited from UICollectionViewLayoutAttributes

	static layoutAttributesForDecorationViewOfKindWithIndexPath(decorationViewKind: string, indexPath: NSIndexPath): MDCCollectionViewLayoutAttributes; // inherited from UICollectionViewLayoutAttributes

	static layoutAttributesForSupplementaryViewOfKindWithIndexPath(elementKind: string, indexPath: NSIndexPath): MDCCollectionViewLayoutAttributes; // inherited from UICollectionViewLayoutAttributes

	static new(): MDCCollectionViewLayoutAttributes; // inherited from NSObject

	animateCellsOnAppearanceDelay: number;

	animateCellsOnAppearanceDuration: number;

	backgroundImage: UIImage;

	backgroundImageViewInsets: UIEdgeInsets;

	editing: boolean;

	isGridLayout: boolean;

	sectionOrdinalPosition: MDCCollectionViewOrdinalPosition;

	separatorColor: UIColor;

	separatorInset: UIEdgeInsets;

	separatorLineHeight: number;

	shouldHideSeparators: boolean;

	shouldShowGridBackground: boolean;

	shouldShowReorderStateMask: boolean;

	shouldShowSelectorStateMask: boolean;

	willAnimateCellsOnAppearance: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MDCCollectionViewOrdinalPosition {

	VerticalTop = 1,

	VerticalCenter = 2,

	VerticalBottom = 4,

	VerticalTopBottom = 5,

	HorizontalLeft = 1024,

	HorizontalCenter = 2048,

	HorizontalRight = 4096
}

interface MDCCollectionViewStyling extends NSObjectProtocol {

	allowsItemInlay: boolean;

	allowsMultipleItemInlays: boolean;

	animateCellsOnAppearanceDuration: number;

	animateCellsOnAppearancePadding: number;

	cellBackgroundColor: UIColor;

	cellLayoutType: MDCCollectionViewCellLayoutType;

	cellStyle: MDCCollectionViewCellStyle;

	collectionView: UICollectionView;

	delegate: MDCCollectionViewStylingDelegate;

	gridColumnCount: number;

	gridPadding: number;

	separatorColor: UIColor;

	separatorInset: UIEdgeInsets;

	separatorLineHeight: number;

	shouldAnimateCellsOnAppearance: boolean;

	shouldHideSeparators: boolean;

	shouldInvalidateLayout: boolean;

	willAnimateCellsOnAppearance: boolean;

	applyInlayToAllItemsAnimated(animated: boolean): void;

	applyInlayToItemAtIndexPathAnimated(indexPath: NSIndexPath, animated: boolean): void;

	backgroundImageForCellLayoutAttributes(attr: MDCCollectionViewLayoutAttributes): UIImage;

	backgroundImageViewOutsetsForCellWithAttribute(attr: MDCCollectionViewLayoutAttributes): UIEdgeInsets;

	beginCellAppearanceAnimation(): void;

	cellStyleAtSectionIndex(section: number): MDCCollectionViewCellStyle;

	indexPathsForInlaidItems(): NSArray<NSIndexPath>;

	isItemInlaidAtIndexPath(indexPath: NSIndexPath): boolean;

	removeInlayFromAllItemsAnimated(animated: boolean): void;

	removeInlayFromItemAtIndexPathAnimated(indexPath: NSIndexPath, animated: boolean): void;

	resetIndexPathsForInlaidItems(): void;

	setCellStyleAnimated(cellStyle: MDCCollectionViewCellStyle, animated: boolean): void;

	shouldHideSeparatorForCellLayoutAttributes(attr: MDCCollectionViewLayoutAttributes): boolean;
}
declare var MDCCollectionViewStyling: {

	prototype: MDCCollectionViewStyling;
};

interface MDCCollectionViewStylingDelegate extends NSObjectProtocol {

	collectionViewCellBackgroundColorAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): UIColor;

	collectionViewCellHeightAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): number;

	collectionViewCellStyleForSection?(collectionView: UICollectionView, section: number): MDCCollectionViewCellStyle;

	collectionViewDidApplyInlayToItemAtIndexPaths?(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewDidRemoveInlayFromItemAtIndexPaths?(collectionView: UICollectionView, indexPaths: NSArray<NSIndexPath>): void;

	collectionViewHidesInkViewAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewInkColorAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): UIColor;

	collectionViewInkTouchControllerInkViewAtIndexPath?(collectionView: UICollectionView, inkTouchController: MDCInkTouchController, indexPath: NSIndexPath): MDCInkView;

	collectionViewShouldHideFooterBackgroundForSection?(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideFooterSeparatorForSection?(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideHeaderBackgroundForSection?(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideHeaderSeparatorForSection?(collectionView: UICollectionView, section: number): boolean;

	collectionViewShouldHideItemBackgroundAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;

	collectionViewShouldHideItemSeparatorAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
}
declare var MDCCollectionViewStylingDelegate: {

	prototype: MDCCollectionViewStylingDelegate;
};

declare class MDCCollectionViewTextCell extends MDCCollectionViewCell {

	static alloc(): MDCCollectionViewTextCell; // inherited from NSObject

	static appearance(): MDCCollectionViewTextCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCCollectionViewTextCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCCollectionViewTextCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCCollectionViewTextCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCCollectionViewTextCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCCollectionViewTextCell; // inherited from UIAppearance

	static new(): MDCCollectionViewTextCell; // inherited from NSObject

	readonly detailTextLabel: UILabel;

	readonly imageView: UIImageView;

	readonly textLabel: UILabel;
}

interface MDCColorScheme {

	primaryColor: UIColor;

	primaryDarkColor?: UIColor;

	primaryLightColor?: UIColor;

	secondaryColor?: UIColor;

	secondaryDarkColor?: UIColor;

	secondaryLightColor?: UIColor;
}
declare var MDCColorScheme: {

	prototype: MDCColorScheme;
};

declare class MDCDialogPresentationController extends UIPresentationController {

	static alloc(): MDCDialogPresentationController; // inherited from NSObject

	static new(): MDCDialogPresentationController; // inherited from NSObject

	dismissOnBackgroundTap: boolean;

	frameOfPresentedViewInContainerView(): CGRect;
}

declare class MDCDialogTransitionController extends NSObject implements UIViewControllerAnimatedTransitioning, UIViewControllerTransitioningDelegate {

	static alloc(): MDCDialogTransitionController; // inherited from NSObject

	static new(): MDCDialogTransitionController; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animateTransition(transitionContext: UIViewControllerContextTransitioning): void;

	animationControllerForDismissedController(dismissed: UIViewController): UIViewControllerAnimatedTransitioning;

	animationControllerForPresentedControllerPresentingControllerSourceController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning;

	animationEnded(transitionCompleted: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interactionControllerForPresentation(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interruptibleAnimatorForTransition(transitionContext: UIViewControllerContextTransitioning): UIViewImplicitlyAnimating;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIPresentationController;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	transitionDuration(transitionContext: UIViewControllerContextTransitioning): number;
}

declare class MDCFeatureHighlightColorThemer extends NSObject {

	static alloc(): MDCFeatureHighlightColorThemer; // inherited from NSObject

	static applyColorSchemeToFeatureHighlightView(colorScheme: NSObject, featureHighlightView: MDCFeatureHighlightView): void;

	static new(): MDCFeatureHighlightColorThemer; // inherited from NSObject
}

declare class MDCFeatureHighlightView extends UIView {

	static alloc(): MDCFeatureHighlightView; // inherited from NSObject

	static appearance(): MDCFeatureHighlightView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCFeatureHighlightView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCFeatureHighlightView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCFeatureHighlightView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCFeatureHighlightView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCFeatureHighlightView; // inherited from UIAppearance

	static new(): MDCFeatureHighlightView; // inherited from NSObject

	bodyColor: UIColor;

	innerHighlightColor: UIColor;

	outerHighlightColor: UIColor;

	titleColor: UIColor;
}

declare class MDCFeatureHighlightViewController extends UIViewController {

	static alloc(): MDCFeatureHighlightViewController; // inherited from NSObject

	static new(): MDCFeatureHighlightViewController; // inherited from NSObject

	bodyColor: UIColor;

	bodyText: string;

	innerHighlightColor: UIColor;

	outerHighlightColor: UIColor;

	titleColor: UIColor;

	titleText: string;

	constructor(o: { highlightedView: UIView; andShowView: UIView; completion: (p1: boolean) => void; });

	constructor(o: { highlightedView: UIView; completion: (p1: boolean) => void; });

	acceptFeature(): void;

	initWithHighlightedViewAndShowViewCompletion(highlightedView: UIView, displayedView: UIView, completion: (p1: boolean) => void): this;

	initWithHighlightedViewCompletion(highlightedView: UIView, completion: (p1: boolean) => void): this;

	rejectFeature(): void;
}

declare class MDCFlatButton extends MDCButton {

	static alloc(): MDCFlatButton; // inherited from NSObject

	static appearance(): MDCFlatButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCFlatButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCFlatButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCFlatButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCFlatButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCFlatButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCFlatButton; // inherited from UIButton

	static new(): MDCFlatButton; // inherited from NSObject

	hasOpaqueBackground: boolean;
}

declare class MDCFlexibleHeaderColorThemer extends NSObject {

	static alloc(): MDCFlexibleHeaderColorThemer; // inherited from NSObject

	static applyColorSchemeToFlexibleHeaderView(colorScheme: NSObject, flexibleHeaderView: MDCFlexibleHeaderView): void;

	static applyColorSchemeToMDCFlexibleHeaderController(colorScheme: NSObject, flexibleHeaderController: MDCFlexibleHeaderViewController): void;

	static new(): MDCFlexibleHeaderColorThemer; // inherited from NSObject
}

declare class MDCFlexibleHeaderContainerViewController extends UIViewController {

	static alloc(): MDCFlexibleHeaderContainerViewController; // inherited from NSObject

	static new(): MDCFlexibleHeaderContainerViewController; // inherited from NSObject

	contentViewController: UIViewController;

	readonly headerViewController: MDCFlexibleHeaderViewController;

	constructor(o: { contentViewController: UIViewController; });

	initWithContentViewController(contentViewController: UIViewController): this;
}

declare const enum MDCFlexibleHeaderContentImportance {

	Default = 0,

	High = 1
}

declare const enum MDCFlexibleHeaderScrollPhase {

	Shifting = 0,

	Collapsing = 1,

	OverExtending = 2
}

declare const enum MDCFlexibleHeaderShiftBehavior {

	Disabled = 0,

	Enabled = 1,

	EnabledWithStatusBar = 2
}

declare class MDCFlexibleHeaderView extends UIView {

	static alloc(): MDCFlexibleHeaderView; // inherited from NSObject

	static appearance(): MDCFlexibleHeaderView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCFlexibleHeaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCFlexibleHeaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCFlexibleHeaderView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCFlexibleHeaderView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCFlexibleHeaderView; // inherited from UIAppearance

	static new(): MDCFlexibleHeaderView; // inherited from NSObject

	behavior: MDCFlexibleHeaderShiftBehavior;

	canOverExtend: boolean;

	contentIsTranslucent: boolean;

	contentView: UIView;

	delegate: MDCFlexibleHeaderViewDelegate;

	headerContentImportance: MDCFlexibleHeaderContentImportance;

	inFrontOfInfiniteContent: boolean;

	maximumHeight: number;

	minimumHeight: number;

	readonly prefersStatusBarHidden: boolean;

	readonly scrollPhase: MDCFlexibleHeaderScrollPhase;

	readonly scrollPhasePercentage: number;

	readonly scrollPhaseValue: number;

	shadowLayer: CALayer;

	sharedWithManyScrollViews: boolean;

	shiftBehavior: MDCFlexibleHeaderShiftBehavior;

	statusBarHintCanOverlapHeader: boolean;

	trackingScrollView: UIScrollView;

	trackingScrollViewIsBeingScrubbed: boolean;

	visibleShadowOpacity: number;

	changeContentInsets(block: () => void): void;

	forwardTouchEventsForView(view: UIView): void;

	interfaceOrientationDidChange(): void;

	interfaceOrientationIsChanging(): void;

	interfaceOrientationWillChange(): void;

	setShadowLayerIntensityDidChangeBlock(shadowLayer: CALayer, block: (p1: CALayer, p2: number) => void): void;

	shiftHeaderOffScreenAnimated(animated: boolean): void;

	shiftHeaderOnScreenAnimated(animated: boolean): void;

	stopForwardingTouchEventsForView(view: UIView): void;

	trackingScrollViewDidEndDecelerating(): void;

	trackingScrollViewDidEndDraggingWillDecelerate(willDecelerate: boolean): void;

	trackingScrollViewDidScroll(): void;

	trackingScrollViewWillEndDraggingWithVelocityTargetContentOffset(velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): boolean;

	trackingScrollWillChangeToScrollView(scrollView: UIScrollView): void;

	viewWillTransitionToSizeWithTransitionCoordinator(size: CGSize, coordinator: UIViewControllerTransitionCoordinator): void;
}

declare class MDCFlexibleHeaderViewController extends UIViewController implements UIScrollViewDelegate, UITableViewDelegate {

	static alloc(): MDCFlexibleHeaderViewController; // inherited from NSObject

	static new(): MDCFlexibleHeaderViewController; // inherited from NSObject

	readonly headerView: MDCFlexibleHeaderView;

	layoutDelegate: MDCFlexibleHeaderViewLayoutDelegate;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	indexPathForPreferredFocusedViewInTableView(tableView: UITableView): NSIndexPath;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	preferredStatusBarStyle(): UIStatusBarStyle;

	prefersStatusBarHidden(): boolean;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	self(): this;

	tableViewAccessoryButtonTappedForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewAccessoryTypeForRowWithIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellAccessoryType;

	tableViewCanFocusRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewCanPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): boolean;

	tableViewDidDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidEndDisplayingCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;

	tableViewDidEndDisplayingFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewDidEndDisplayingHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewDidEndEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidUnhighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewDidUpdateFocusInContextWithAnimationCoordinator(tableView: UITableView, context: UITableViewFocusUpdateContext, coordinator: UIFocusAnimationCoordinator): void;

	tableViewEditActionsForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSArray<UITableViewRowAction>;

	tableViewEditingStyleForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): UITableViewCellEditingStyle;

	tableViewEstimatedHeightForFooterInSection(tableView: UITableView, section: number): number;

	tableViewEstimatedHeightForHeaderInSection(tableView: UITableView, section: number): number;

	tableViewEstimatedHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewHeightForFooterInSection(tableView: UITableView, section: number): number;

	tableViewHeightForHeaderInSection(tableView: UITableView, section: number): number;

	tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewIndentationLevelForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number;

	tableViewPerformActionForRowAtIndexPathWithSender(tableView: UITableView, action: string, indexPath: NSIndexPath, sender: any): void;

	tableViewShouldHighlightRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldIndentWhileEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldShowMenuForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): boolean;

	tableViewShouldUpdateFocusInContext(tableView: UITableView, context: UITableViewFocusUpdateContext): boolean;

	tableViewTargetIndexPathForMoveFromRowAtIndexPathToProposedIndexPath(tableView: UITableView, sourceIndexPath: NSIndexPath, proposedDestinationIndexPath: NSIndexPath): NSIndexPath;

	tableViewTitleForDeleteConfirmationButtonForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): string;

	tableViewViewForFooterInSection(tableView: UITableView, section: number): UIView;

	tableViewViewForHeaderInSection(tableView: UITableView, section: number): UIView;

	tableViewWillBeginEditingRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): void;

	tableViewWillDeselectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath;

	tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath): void;

	tableViewWillDisplayFooterViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewWillDisplayHeaderViewForSection(tableView: UITableView, view: UIView, section: number): void;

	tableViewWillSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath;

	updateTopLayoutGuide(): void;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

interface MDCFlexibleHeaderViewDelegate extends NSObjectProtocol {

	flexibleHeaderViewFrameDidChange(headerView: MDCFlexibleHeaderView): void;

	flexibleHeaderViewNeedsStatusBarAppearanceUpdate(headerView: MDCFlexibleHeaderView): void;
}
declare var MDCFlexibleHeaderViewDelegate: {

	prototype: MDCFlexibleHeaderViewDelegate;
};

interface MDCFlexibleHeaderViewLayoutDelegate extends NSObjectProtocol {

	flexibleHeaderViewControllerFlexibleHeaderViewFrameDidChange(flexibleHeaderViewController: MDCFlexibleHeaderViewController, flexibleHeaderView: MDCFlexibleHeaderView): void;
}
declare var MDCFlexibleHeaderViewLayoutDelegate: {

	prototype: MDCFlexibleHeaderViewLayoutDelegate;
};

declare class MDCFloatingButton extends MDCButton {

	static alloc(): MDCFloatingButton; // inherited from NSObject

	static appearance(): MDCFloatingButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCFloatingButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCFloatingButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCFloatingButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCFloatingButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCFloatingButton; // inherited from UIAppearance

	static buttonWithShape(shape: MDCFloatingButtonShape): MDCFloatingButton;

	static buttonWithType(buttonType: UIButtonType): MDCFloatingButton; // inherited from UIButton

	static defaultDimension(): number;

	static FloatButtonWithShape(shape: MDCFloatingButtonShape): MDCFloatingButton;

	static miniDimension(): number;

	static new(): MDCFloatingButton; // inherited from NSObject

	constructor(o: { frame: CGRect; shape: MDCFloatingButtonShape; });

	initWithFrameShape(frame: CGRect, shape: MDCFloatingButtonShape): this;
}

declare const enum MDCFloatingButtonShape {

	Default = 0,

	Mini = 1
}

declare const enum MDCFontTextStyle {

	Body1 = 0,

	Body2 = 1,

	Caption = 2,

	Headline = 3,

	Subheadline = 4,

	Title = 5,

	Display1 = 6,

	Display2 = 7,

	Display3 = 8,

	Display4 = 9,

	Button = 10
}

declare class MDCHeaderStackView extends UIView {

	static alloc(): MDCHeaderStackView; // inherited from NSObject

	static appearance(): MDCHeaderStackView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCHeaderStackView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCHeaderStackView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCHeaderStackView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCHeaderStackView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCHeaderStackView; // inherited from UIAppearance

	static new(): MDCHeaderStackView; // inherited from NSObject

	bottomBar: UIView;

	topBar: UIView;
}

declare class MDCHeaderStackViewColorThemer extends NSObject {

	static alloc(): MDCHeaderStackViewColorThemer; // inherited from NSObject

	static applyColorSchemeToHeaderStackView(colorScheme: NSObject, headerStackView: MDCHeaderStackView): void;

	static new(): MDCHeaderStackViewColorThemer; // inherited from NSObject
}

declare class MDCIcons extends NSObject {

	static alloc(): MDCIcons; // inherited from NSObject

	static bundleNamed(bundleName: string): NSBundle;

	static ic_arrow_backUseNewStyle(useNewStyle: boolean): void;

	static imageFor_ic_arrow_back(): UIImage;

	static imageFor_ic_check(): UIImage;

	static imageFor_ic_check_circle(): UIImage;

	static imageFor_ic_chevron_right(): UIImage;

	static imageFor_ic_info(): UIImage;

	static imageFor_ic_radio_button_unchecked(): UIImage;

	static imageFor_ic_reorder(): UIImage;

	static new(): MDCIcons; // inherited from NSObject

	static pathForIconNameWithBundleName(iconName: string, bundleName: string): string;

	static pathFor_ic_arrow_back(): string;

	static pathFor_ic_check(): string;

	static pathFor_ic_check_circle(): string;

	static pathFor_ic_chevron_right(): string;

	static pathFor_ic_info(): string;

	static pathFor_ic_radio_button_unchecked(): string;

	static pathFor_ic_reorder(): string;
}

declare class MDCInkColorThemer extends NSObject {

	static alloc(): MDCInkColorThemer; // inherited from NSObject

	static applyColorSchemeToInkView(colorScheme: NSObject, inkView: MDCInkView): void;

	static new(): MDCInkColorThemer; // inherited from NSObject
}

declare class MDCInkGestureRecognizer extends UIGestureRecognizer {

	static alloc(): MDCInkGestureRecognizer; // inherited from NSObject

	static new(): MDCInkGestureRecognizer; // inherited from NSObject

	cancelOnDragOut: boolean;

	dragCancelDistance: number;

	targetBounds: CGRect;

	isTouchWithinTargetBounds(): boolean;

	touchStartLocationInView(view: UIView): CGPoint;
}

declare const enum MDCInkStyle {

	Bounded = 0,

	Unbounded = 1
}

declare class MDCInkTouchController extends NSObject implements UIGestureRecognizerDelegate {

	static alloc(): MDCInkTouchController; // inherited from NSObject

	static new(): MDCInkTouchController; // inherited from NSObject

	cancelsOnDragOut: boolean;

	readonly defaultInkView: MDCInkView;

	delaysInkSpread: boolean;

	delegate: MDCInkTouchControllerDelegate;

	dragCancelDistance: number;

	readonly gestureRecognizer: MDCInkGestureRecognizer;

	targetBounds: CGRect;

	readonly view: UIView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { view: UIView; });

	addInkView(): void;

	cancelInkTouchProcessing(): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

	gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

	gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	initWithView(view: UIView): this;

	inkViewAtTouchLocation(location: CGPoint): MDCInkView;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface MDCInkTouchControllerDelegate extends NSObjectProtocol {

	inkTouchControllerDidProcessInkViewAtTouchLocation?(inkTouchController: MDCInkTouchController, inkView: MDCInkView, location: CGPoint): void;

	inkTouchControllerInkViewAtTouchLocation?(inkTouchController: MDCInkTouchController, location: CGPoint): MDCInkView;

	inkTouchControllerInsertInkViewIntoView?(inkTouchController: MDCInkTouchController, inkView: UIView, view: UIView): void;

	inkTouchControllerShouldProcessInkTouchesAtTouchLocation?(inkTouchController: MDCInkTouchController, location: CGPoint): boolean;
}
declare var MDCInkTouchControllerDelegate: {

	prototype: MDCInkTouchControllerDelegate;
};

declare class MDCInkView extends UIView {

	static alloc(): MDCInkView; // inherited from NSObject

	static appearance(): MDCInkView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCInkView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCInkView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCInkView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCInkView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCInkView; // inherited from UIAppearance

	static new(): MDCInkView; // inherited from NSObject

	customInkCenter: CGPoint;

	readonly defaultInkColor: UIColor;

	inkColor: UIColor;

	inkStyle: MDCInkStyle;

	maxRippleRadius: number;

	usesCustomInkCenter: boolean;

	cancelAllAnimationsAnimated(animated: boolean): void;

	startTouchBeganAnimationAtPointCompletion(point: CGPoint, completionBlock: () => void): void;

	startTouchEndedAnimationAtPointCompletion(point: CGPoint, completionBlock: () => void): void;
}

declare function MDCInsetsMakeWithLayoutDirection(top: number, leading: number, bottom: number, trailing: number, layoutDirection: UIUserInterfaceLayoutDirection): UIEdgeInsets;

declare class MDCKeyboardWatcher extends NSObject {

	static alloc(): MDCKeyboardWatcher; // inherited from NSObject

	static animationCurveOptionFromKeyboardNotification(notification: NSNotification): UIViewAnimationOptions;

	static animationDurationFromKeyboardNotification(notification: NSNotification): number;

	static new(): MDCKeyboardWatcher; // inherited from NSObject

	static sharedKeyboardWatcher(): MDCKeyboardWatcher;

	readonly keyboardOffset: number;

	readonly visibleKeyboardHeight: number;
}

declare var MDCKeyboardWatcherKeyboardWillChangeFrameNotification: string;

declare var MDCKeyboardWatcherKeyboardWillHideNotification: string;

declare var MDCKeyboardWatcherKeyboardWillShowNotification: string;

declare class MDCMaskedTransition extends NSObject implements MDMTransition {

	static alloc(): MDCMaskedTransition; // inherited from NSObject

	static new(): MDCMaskedTransition; // inherited from NSObject

	calculateFrameOfPresentedView: (p1: UIPresentationController) => CGRect;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { sourceView: UIView; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithSourceView(sourceView: UIView): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	startWithContext(context: MDMTransitionContext): void;
}

declare class MDCMultilineTextField extends UIView implements MDCMultilineTextInput, MDCTextInput {

	static alloc(): MDCMultilineTextField; // inherited from NSObject

	static appearance(): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCMultilineTextField; // inherited from UIAppearance

	static new(): MDCMultilineTextField; // inherited from NSObject

	adjustsFontForContentSizeCategory: boolean;

	layoutDelegate: MDCMultilineTextInputLayoutDelegate;

	textView: UITextView;

	attributedPlaceholder: NSAttributedString; // inherited from MDCTextInput

	attributedText: NSAttributedString; // inherited from MDCTextInput

	readonly clearButton: UIButton; // inherited from MDCTextInput

	clearButtonColor: UIColor; // inherited from MDCTextInput

	clearButtonMode: UITextFieldViewMode; // inherited from MDCTextInput

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly editing: boolean; // inherited from MDCTextInput

	enabled: boolean; // inherited from MDCTextInput

	expandsOnOverflow: boolean; // inherited from MDCMultilineTextInput

	font: UIFont; // inherited from MDCTextInput

	readonly hash: number; // inherited from NSObjectProtocol

	hidesPlaceholderOnInput: boolean; // inherited from MDCTextInput

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly leadingUnderlineLabel: UILabel; // inherited from MDCTextInput

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInput

	minimumLines: number; // inherited from MDCMultilineTextInput

	placeholder: string; // inherited from MDCTextInput

	readonly placeholderLabel: UILabel; // inherited from MDCTextInput

	positioningDelegate: MDCTextInputPositioningDelegate; // inherited from MDCTextInput

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	text: string; // inherited from MDCTextInput

	textColor: UIColor; // inherited from MDCTextInput

	readonly textInsets: UIEdgeInsets; // inherited from MDCTextInput

	readonly trailingUnderlineLabel: UILabel; // inherited from MDCTextInput

	trailingView: UIView; // inherited from MDCTextInput

	trailingViewMode: UITextFieldViewMode; // inherited from MDCTextInput

	readonly underline: MDCTextInputUnderlineView; // inherited from MDCTextInput

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface MDCMultilineTextInput extends MDCTextInput {

	expandsOnOverflow: boolean;

	minimumLines: number;
}
declare var MDCMultilineTextInput: {

	prototype: MDCMultilineTextInput;
};

interface MDCMultilineTextInputLayoutDelegate extends NSObjectProtocol {

	multilineTextFieldDidChangeContentSize?(multilineTextField: MDCMultilineTextInput, size: CGSize): void;
}
declare var MDCMultilineTextInputLayoutDelegate: {

	prototype: MDCMultilineTextInputLayoutDelegate;
};

declare class MDCNavigationBar extends UIView {

	static alloc(): MDCNavigationBar; // inherited from NSObject

	static appearance(): MDCNavigationBar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCNavigationBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCNavigationBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCNavigationBar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCNavigationBar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCNavigationBar; // inherited from UIAppearance

	static new(): MDCNavigationBar; // inherited from NSObject

	backItem: UIBarButtonItem;

	hidesBackButton: boolean;

	leadingBarButtonItem: UIBarButtonItem;

	leadingBarButtonItems: NSArray<UIBarButtonItem>;

	leadingItemsSupplementBackButton: boolean;

	leftBarButtonItem: UIBarButtonItem;

	leftBarButtonItems: NSArray<UIBarButtonItem>;

	leftItemsSupplementBackButton: boolean;

	rightBarButtonItem: UIBarButtonItem;

	rightBarButtonItems: NSArray<UIBarButtonItem>;

	textAlignment: NSTextAlignment;

	title: string;

	titleAlignment: MDCNavigationBarTitleAlignment;

	titleTextAttributes: NSDictionary<string, any>;

	titleView: UIView;

	trailingBarButtonItem: UIBarButtonItem;

	trailingBarButtonItems: NSArray<UIBarButtonItem>;

	observeNavigationItem(navigationItem: UINavigationItem): void;

	unobserveNavigationItem(): void;
}

declare class MDCNavigationBarColorThemer extends NSObject {

	static alloc(): MDCNavigationBarColorThemer; // inherited from NSObject

	static applyColorSchemeToNavigationBar(colorScheme: NSObject, navigationBar: MDCNavigationBar): void;

	static new(): MDCNavigationBarColorThemer; // inherited from NSObject
}

declare class MDCNavigationBarTextColorAccessibilityMutator extends NSObject {

	static alloc(): MDCNavigationBarTextColorAccessibilityMutator; // inherited from NSObject

	static new(): MDCNavigationBarTextColorAccessibilityMutator; // inherited from NSObject

	mutate(navBar: MDCNavigationBar): void;
}

declare const enum MDCNavigationBarTitleAlignment {

	Center = 0,

	Leading = 1
}

declare class MDCNumericValueLabel extends UIView {

	static alloc(): MDCNumericValueLabel; // inherited from NSObject

	static appearance(): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCNumericValueLabel; // inherited from UIAppearance

	static new(): MDCNumericValueLabel; // inherited from NSObject

	fontSize: number;

	text: string;

	textColor: UIColor;
}

interface MDCOverlay extends NSObjectProtocol {

	frame: CGRect;

	identifier: string;

	overlayFrameInView(targetView: UIView): CGRect;
}
declare var MDCOverlay: {

	prototype: MDCOverlay;
};

declare class MDCOverlayObserver extends NSObject {

	static alloc(): MDCOverlayObserver; // inherited from NSObject

	static new(): MDCOverlayObserver; // inherited from NSObject

	static observerForScreen(screen: UIScreen): MDCOverlayObserver;

	addTargetAction(target: any, action: string): void;

	removeTarget(target: any): void;

	removeTargetAction(target: any, action: string): void;
}

interface MDCOverlayTransitioning extends NSObjectProtocol {

	animationCurve: UIViewAnimationCurve;

	compositeFrame: CGRect;

	customTimingFunction: CAMediaTimingFunction;

	duration: number;

	animateAlongsideTransition(animations: () => void): void;

	animateAlongsideTransitionWithOptionsAnimationsCompletion(options: UIViewAnimationOptions, animations: () => void, completion: (p1: boolean) => void): void;

	compositeFrameInView(targetView: UIView): CGRect;

	enumerateOverlays(handler: (p1: MDCOverlay, p2: number, p3: interop.Pointer | interop.Reference<boolean>) => void): void;
}
declare var MDCOverlayTransitioning: {

	prototype: MDCOverlayTransitioning;
};

declare class MDCOverlayWindow extends UIWindow {

	static alloc(): MDCOverlayWindow; // inherited from NSObject

	static appearance(): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCOverlayWindow; // inherited from UIAppearance

	static new(): MDCOverlayWindow; // inherited from NSObject

	activateOverlayWithLevel(overlay: UIView, level: number): void;

	deactivateOverlay(overlay: UIView): void;
}

declare class MDCPageControl extends UIControl implements UIScrollViewDelegate {

	static alloc(): MDCPageControl; // inherited from NSObject

	static appearance(): MDCPageControl; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCPageControl; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCPageControl; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCPageControl; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCPageControl; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCPageControl; // inherited from UIAppearance

	static new(): MDCPageControl; // inherited from NSObject

	currentPage: number;

	currentPageIndicatorTintColor: UIColor;

	defersCurrentPageDisplay: boolean;

	hidesForSinglePage: boolean;

	numberOfPages: number;

	pageIndicatorTintColor: UIColor;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	self(): this;

	setCurrentPageAnimated(currentPage: number, animated: boolean): void;

	sizeForNumberOfPages(pageCount: number): CGSize;

	updateCurrentPageDisplay(): void;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

declare class MDCPageControlColorThemer extends NSObject {

	static alloc(): MDCPageControlColorThemer; // inherited from NSObject

	static applyColorSchemeToPageControl(colorScheme: NSObject, pageControl: MDCPageControl): void;

	static new(): MDCPageControlColorThemer; // inherited from NSObject
}

declare class MDCPalette extends NSObject {

	static alloc(): MDCPalette; // inherited from NSObject

	static new(): MDCPalette; // inherited from NSObject

	static paletteGeneratedFromColor(target500Color: UIColor): MDCPalette;

	static paletteWithTintsAccents(tints: NSDictionary<string, UIColor>, accents: NSDictionary<string, UIColor>): MDCPalette;

	readonly accent100: UIColor;

	readonly accent200: UIColor;

	readonly accent400: UIColor;

	readonly accent700: UIColor;

	readonly tint100: UIColor;

	readonly tint200: UIColor;

	readonly tint300: UIColor;

	readonly tint400: UIColor;

	readonly tint50: UIColor;

	readonly tint500: UIColor;

	readonly tint600: UIColor;

	readonly tint700: UIColor;

	readonly tint800: UIColor;

	readonly tint900: UIColor;

	static readonly amberPalette: MDCPalette;

	static readonly blueGreyPalette: MDCPalette;

	static readonly bluePalette: MDCPalette;

	static readonly brownPalette: MDCPalette;

	static readonly cyanPalette: MDCPalette;

	static readonly deepOrangePalette: MDCPalette;

	static readonly deepPurplePalette: MDCPalette;

	static readonly greenPalette: MDCPalette;

	static readonly greyPalette: MDCPalette;

	static readonly indigoPalette: MDCPalette;

	static readonly lightBluePalette: MDCPalette;

	static readonly lightGreenPalette: MDCPalette;

	static readonly limePalette: MDCPalette;

	static readonly orangePalette: MDCPalette;

	static readonly pinkPalette: MDCPalette;

	static readonly purplePalette: MDCPalette;

	static readonly redPalette: MDCPalette;

	static readonly tealPalette: MDCPalette;

	static readonly yellowPalette: MDCPalette;

	constructor(o: { tints: NSDictionary<string, UIColor>; accents: NSDictionary<string, UIColor>; });

	initWithTintsAccents(tints: NSDictionary<string, UIColor>, accents: NSDictionary<string, UIColor>): this;
}

declare var MDCPaletteAccent100Name: string;

declare var MDCPaletteAccent200Name: string;

declare var MDCPaletteAccent400Name: string;

declare var MDCPaletteAccent700Name: string;

declare var MDCPaletteTint100Name: string;

declare var MDCPaletteTint200Name: string;

declare var MDCPaletteTint300Name: string;

declare var MDCPaletteTint400Name: string;

declare var MDCPaletteTint500Name: string;

declare var MDCPaletteTint50Name: string;

declare var MDCPaletteTint600Name: string;

declare var MDCPaletteTint700Name: string;

declare var MDCPaletteTint800Name: string;

declare var MDCPaletteTint900Name: string;

declare class MDCProgressView extends UIView {

	static alloc(): MDCProgressView; // inherited from NSObject

	static appearance(): MDCProgressView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCProgressView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCProgressView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCProgressView; // inherited from UIAppearance

	static new(): MDCProgressView; // inherited from NSObject

	backwardProgressAnimationMode: MDCProgressViewBackwardAnimationMode;

	progress: number;

	progressTintColor: UIColor;

	trackTintColor: UIColor;

	setHiddenAnimatedCompletion(hidden: boolean, animated: boolean, completion: (p1: boolean) => void): void;

	setProgressAnimatedCompletion(progress: number, animated: boolean, completion: (p1: boolean) => void): void;
}

declare const enum MDCProgressViewBackwardAnimationMode {

	Reset = 0,

	Animate = 1
}

declare class MDCProgressViewColorThemer extends NSObject {

	static alloc(): MDCProgressViewColorThemer; // inherited from NSObject

	static applyColorSchemeToProgressView(colorScheme: NSObject, progressView: MDCProgressView): void;

	static new(): MDCProgressViewColorThemer; // inherited from NSObject
}

declare class MDCRaisedButton extends MDCButton {

	static alloc(): MDCRaisedButton; // inherited from NSObject

	static appearance(): MDCRaisedButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCRaisedButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCRaisedButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCRaisedButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCRaisedButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCRaisedButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCRaisedButton; // inherited from UIButton

	static new(): MDCRaisedButton; // inherited from NSObject
}

declare function MDCRectFlippedForRTL(leftToRightRect: CGRect, boundingWidth: number, layoutDirection: UIUserInterfaceLayoutDirection): CGRect;

declare var MDCShadowElevationAppBar: number;

declare var MDCShadowElevationCardPickedUp: number;

declare var MDCShadowElevationCardResting: number;

declare var MDCShadowElevationDialog: number;

declare var MDCShadowElevationFABPressed: number;

declare var MDCShadowElevationFABResting: number;

declare var MDCShadowElevationMenu: number;

declare var MDCShadowElevationModalBottomSheet: number;

declare var MDCShadowElevationNavDrawer: number;

declare var MDCShadowElevationNone: number;

declare var MDCShadowElevationPicker: number;

declare var MDCShadowElevationQuickEntry: number;

declare var MDCShadowElevationQuickEntryResting: number;

declare var MDCShadowElevationRaisedButtonPressed: number;

declare var MDCShadowElevationRaisedButtonResting: number;

declare var MDCShadowElevationRefresh: number;

declare var MDCShadowElevationRightDrawer: number;

declare var MDCShadowElevationSearchBarResting: number;

declare var MDCShadowElevationSearchBarScrolled: number;

declare var MDCShadowElevationSnackbar: number;

declare var MDCShadowElevationSubMenu: number;

declare var MDCShadowElevationSwitch: number;

declare class MDCShadowLayer extends CALayer {

	static alloc(): MDCShadowLayer; // inherited from NSObject

	static layer(): MDCShadowLayer; // inherited from CALayer

	static new(): MDCShadowLayer; // inherited from NSObject

	elevation: number;

	shadowMaskEnabled: boolean;
}

declare class MDCShadowMetrics extends NSObject {

	static alloc(): MDCShadowMetrics; // inherited from NSObject

	static metricsWithElevation(elevation: number): MDCShadowMetrics;

	static new(): MDCShadowMetrics; // inherited from NSObject

	readonly bottomShadowOffset: CGSize;

	readonly bottomShadowOpacity: number;

	readonly bottomShadowRadius: number;

	readonly topShadowOffset: CGSize;

	readonly topShadowOpacity: number;

	readonly topShadowRadius: number;
}

declare class MDCSlider extends UIControl implements NSSecureCoding {

	static alloc(): MDCSlider; // inherited from NSObject

	static appearance(): MDCSlider; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCSlider; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCSlider; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCSlider; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCSlider; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCSlider; // inherited from UIAppearance

	static new(): MDCSlider; // inherited from NSObject

	color: UIColor;

	continuous: boolean;

	delegate: MDCSliderDelegate;

	filledTrackAnchorValue: number;

	maximumValue: number;

	minimumValue: number;

	numberOfDiscreteValues: number;

	shouldDisplayDiscreteValueLabel: boolean;

	thumbHollowAtStart: boolean;

	trackBackgroundColor: UIColor;

	value: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	setValueAnimated(value: number, animated: boolean): void;
}

declare class MDCSliderColorThemer extends NSObject {

	static alloc(): MDCSliderColorThemer; // inherited from NSObject

	static applyColorSchemeToSlider(colorScheme: NSObject, slider: MDCSlider): void;

	static new(): MDCSliderColorThemer; // inherited from NSObject
}

interface MDCSliderDelegate extends NSObjectProtocol {

	sliderAccessibilityLabelForValue?(slider: MDCSlider, value: number): string;

	sliderDisplayedStringForValue?(slider: MDCSlider, value: number): string;

	sliderShouldJumpToValue?(slider: MDCSlider, value: number): boolean;
}
declare var MDCSliderDelegate: {

	prototype: MDCSliderDelegate;
};

declare class MDCSnackbarManager extends NSObject {

	static alloc(): MDCSnackbarManager; // inherited from NSObject

	static dismissAndCallCompletionBlocksWithCategory(category: string): void;

	static new(): MDCSnackbarManager; // inherited from NSObject

	static resumeMessagesWithToken(token: MDCSnackbarSuspensionToken): void;

	static setBottomOffset(offset: number): void;

	static setPresentationHostView(hostView: UIView): void;

	static showMessage(message: MDCSnackbarMessage): void;

	static suspendAllMessages(): MDCSnackbarSuspensionToken;

	static suspendMessagesWithCategory(category: string): MDCSnackbarSuspensionToken;
}

declare class MDCSnackbarMessage extends NSObject implements NSCopying, UIAccessibilityIdentification {

	static alloc(): MDCSnackbarMessage; // inherited from NSObject

	static messageWithAttributedText(attributedText: NSAttributedString): MDCSnackbarMessage;

	static messageWithText(text: string): MDCSnackbarMessage;

	static new(): MDCSnackbarMessage; // inherited from NSObject

	action: MDCSnackbarMessageAction;

	attributedText: NSAttributedString;

	buttonTextColor: UIColor;

	category: string;

	completionHandler: (p1: boolean) => void;

	duration: number;

	highlightedButtonTextColor: UIColor;

	text: string;

	readonly voiceNotificationText: string;

	accessibilityIdentifier: string; // inherited from UIAccessibilityIdentification

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCSnackbarMessageAction extends NSObject implements NSCopying, UIAccessibilityIdentification {

	static alloc(): MDCSnackbarMessageAction; // inherited from NSObject

	static new(): MDCSnackbarMessageAction; // inherited from NSObject

	handler: () => void;

	title: string;

	accessibilityIdentifier: string; // inherited from UIAccessibilityIdentification

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare var MDCSnackbarMessageBoldAttributeName: string;

declare var MDCSnackbarMessageDurationMax: number;

declare class MDCSnackbarMessageView extends UIView {

	static alloc(): MDCSnackbarMessageView; // inherited from NSObject

	static appearance(): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCSnackbarMessageView; // inherited from UIAppearance

	static new(): MDCSnackbarMessageView; // inherited from NSObject

	snackbarMessageViewBackgroundColor: UIColor;

	snackbarMessageViewShadowColor: UIColor;

	snackbarMessageViewTextColor: UIColor;
}

interface MDCSnackbarSuspensionToken extends NSObjectProtocol {
}
declare var MDCSnackbarSuspensionToken: {

	prototype: MDCSnackbarSuspensionToken;
};

declare class MDCSystemFontLoader extends NSObject implements MDCTypographyFontLoading {

	static alloc(): MDCSystemFontLoader; // inherited from NSObject

	static new(): MDCSystemFontLoader; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	boldFontFromFont(font: UIFont): UIFont;

	boldFontOfSize(fontSize: number): UIFont;

	boldItalicFontOfSize(fontSize: number): UIFont;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isLargeForContrastRatios(font: UIFont): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	italicFontFromFont(font: UIFont): UIFont;

	italicFontOfSize(fontSize: number): UIFont;

	lightFontOfSize(fontSize: number): UIFont;

	mediumFontOfSize(fontSize: number): UIFont;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	regularFontOfSize(fontSize: number): UIFont;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTabBar extends UIView implements UIBarPositioning {

	static alloc(): MDCTabBar; // inherited from NSObject

	static appearance(): MDCTabBar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTabBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTabBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCTabBar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTabBar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCTabBar; // inherited from UIAppearance

	static defaultHeightForItemAppearance(appearance: MDCTabBarItemAppearance): number;

	static new(): MDCTabBar; // inherited from NSObject

	alignment: MDCTabBarAlignment;

	barTintColor: UIColor;

	delegate: MDCTabBarDelegate;

	displaysUppercaseTitles: boolean;

	inkColor: UIColor;

	itemAppearance: MDCTabBarItemAppearance;

	items: NSArray<UITabBarItem>;

	selectedItem: UITabBarItem;

	selectedItemTintColor: UIColor;

	unselectedItemTintColor: UIColor;

	readonly barPosition: UIBarPosition; // inherited from UIBarPositioning

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	accessibilityElementForItem(item: UITabBarItem): any;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setAlignmentAnimated(alignment: MDCTabBarAlignment, animated: boolean): void;

	setSelectedItemAnimated(selectedItem: UITabBarItem, animated: boolean): void;
}

declare const enum MDCTabBarAlignment {

	Leading = 0,

	Justified = 1,

	Center = 2,

	CenterSelected = 3
}

declare class MDCTabBarColorThemer extends NSObject {

	static alloc(): MDCTabBarColorThemer; // inherited from NSObject

	static applyColorSchemeToTabBar(colorScheme: NSObject, tabBar: MDCTabBar): void;

	static new(): MDCTabBarColorThemer; // inherited from NSObject
}

interface MDCTabBarControllerDelegate extends NSObjectProtocol {

	tabBarControllerDidSelectViewController?(tabBarController: MDCTabBarViewController, viewController: UIViewController): void;

	tabBarControllerShouldSelectViewController?(tabBarController: MDCTabBarViewController, viewController: UIViewController): boolean;
}
declare var MDCTabBarControllerDelegate: {

	prototype: MDCTabBarControllerDelegate;
};

interface MDCTabBarDelegate extends UIBarPositioningDelegate {

	tabBarDidSelectItem?(tabBar: MDCTabBar, item: UITabBarItem): void;

	tabBarShouldSelectItem?(tabBar: MDCTabBar, item: UITabBarItem): boolean;

	tabBarWillSelectItem?(tabBar: MDCTabBar, item: UITabBarItem): void;
}
declare var MDCTabBarDelegate: {

	prototype: MDCTabBarDelegate;
};

declare const enum MDCTabBarItemAppearance {

	Titles = 0,

	Images = 1,

	TitledImages = 2
}

declare class MDCTabBarViewController extends UIViewController implements MDCTabBarDelegate, UIBarPositioningDelegate {

	static alloc(): MDCTabBarViewController; // inherited from NSObject

	static new(): MDCTabBarViewController; // inherited from NSObject

	delegate: MDCTabBarControllerDelegate;

	selectedViewController: UIViewController;

	readonly tabBar: MDCTabBar;

	tabBarHidden: boolean;

	viewControllers: NSArray<UIViewController>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	positionForBar(bar: UIBarPositioning): UIBarPosition;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setTabBarHiddenAnimated(hidden: boolean, animated: boolean): void;

	tabBarDidSelectItem(tabBar: MDCTabBar, item: UITabBarItem): void;

	tabBarShouldSelectItem(tabBar: MDCTabBar, item: UITabBarItem): boolean;

	tabBarWillSelectItem(tabBar: MDCTabBar, item: UITabBarItem): void;
}

declare var MDCTabBarViewControllerAnimationDuration: number;

declare class MDCTextField extends UITextField implements MDCTextInput {

	static alloc(): MDCTextField; // inherited from NSObject

	static appearance(): MDCTextField; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCTextField; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTextField; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCTextField; // inherited from UIAppearance

	static new(): MDCTextField; // inherited from NSObject

	leadingView: UIView;

	leadingViewMode: UITextFieldViewMode;

	attributedPlaceholder: NSAttributedString; // inherited from MDCTextInput

	attributedText: NSAttributedString; // inherited from MDCTextInput

	readonly clearButton: UIButton; // inherited from MDCTextInput

	clearButtonColor: UIColor; // inherited from MDCTextInput

	clearButtonMode: UITextFieldViewMode; // inherited from MDCTextInput

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly editing: boolean; // inherited from MDCTextInput

	enabled: boolean; // inherited from MDCTextInput

	font: UIFont; // inherited from MDCTextInput

	readonly hash: number; // inherited from NSObjectProtocol

	hidesPlaceholderOnInput: boolean; // inherited from MDCTextInput

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly leadingUnderlineLabel: UILabel; // inherited from MDCTextInput

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInput

	placeholder: string; // inherited from MDCTextInput

	readonly placeholderLabel: UILabel; // inherited from MDCTextInput

	positioningDelegate: MDCTextInputPositioningDelegate; // inherited from MDCTextInput

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	text: string; // inherited from MDCTextInput

	textColor: UIColor; // inherited from MDCTextInput

	readonly textInsets: UIEdgeInsets; // inherited from MDCTextInput

	readonly trailingUnderlineLabel: UILabel; // inherited from MDCTextInput

	trailingView: UIView; // inherited from MDCTextInput

	trailingViewMode: UITextFieldViewMode; // inherited from MDCTextInput

	readonly underline: MDCTextInputUnderlineView; // inherited from MDCTextInput

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTextFieldColorThemer extends NSObject {

	static alloc(): MDCTextFieldColorThemer; // inherited from NSObject

	static applyColorSchemeToAllTextInputControllerDefault(colorScheme: NSObject): void;

	static applyColorSchemeToTextInputController(colorScheme: NSObject, textInputController: NSObject): void;

	static applyColorSchemeToTextInputControllerDefault(colorScheme: NSObject, textInputControllerDefault: MDCTextInputControllerDefault): void;

	static new(): MDCTextFieldColorThemer; // inherited from NSObject
}

declare var MDCTextFieldTextDidSetTextNotification: string;

interface MDCTextInput extends NSObjectProtocol {

	attributedPlaceholder: NSAttributedString;

	attributedText: NSAttributedString;

	clearButton: UIButton;

	clearButtonColor: UIColor;

	clearButtonMode: UITextFieldViewMode;

	editing: boolean;

	enabled: boolean;

	font: UIFont;

	hidesPlaceholderOnInput: boolean;

	leadingUnderlineLabel: UILabel;

	mdc_adjustsFontForContentSizeCategory: boolean;

	placeholder: string;

	placeholderLabel: UILabel;

	positioningDelegate: MDCTextInputPositioningDelegate;

	text: string;

	textColor: UIColor;

	textInsets: UIEdgeInsets;

	trailingUnderlineLabel: UILabel;

	trailingView: UIView;

	trailingViewMode: UITextFieldViewMode;

	underline: MDCTextInputUnderlineView;
}
declare var MDCTextInput: {

	prototype: MDCTextInput;
};

declare class MDCTextInputAllCharactersCounter extends NSObject implements MDCTextInputCharacterCounter {

	static alloc(): MDCTextInputAllCharactersCounter; // inherited from NSObject

	static new(): MDCTextInputAllCharactersCounter; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	characterCountForTextInput(textInput: UIView): number;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface MDCTextInputCharacterCounter extends NSObjectProtocol {

	characterCountForTextInput(textInput: UIView): number;
}
declare var MDCTextInputCharacterCounter: {

	prototype: MDCTextInputCharacterCounter;
};

interface MDCTextInputController extends MDCTextInputPositioningDelegate, NSCoding, NSCopying, NSObjectProtocol {

	characterCountMax: number;

	characterCountViewMode: UITextFieldViewMode;

	characterCounter: MDCTextInputCharacterCounter;

	errorColor: UIColor;

	errorText: string;

	helperText: string;

	inlinePlaceholderColor: UIColor;

	mdc_adjustsFontForContentSizeCategory: boolean;

	textInput: UIView;

	underlineColorActive: UIColor;

	underlineColorNormal: UIColor;

	underlineViewMode: UITextFieldViewMode;

	initWithTextInput?(input: UIView): MDCTextInputController;

	setErrorTextErrorAccessibilityValue(errorText: string, errorAccessibilityValue: string): void;
}
declare var MDCTextInputController: {

	prototype: MDCTextInputController;
};

declare class MDCTextInputControllerDefault extends NSObject implements MDCTextInputController {

	static alloc(): MDCTextInputControllerDefault; // inherited from NSObject

	static new(): MDCTextInputControllerDefault; // inherited from NSObject

	floatingEnabled: boolean;

	floatingPlaceholderColor: UIColor;

	floatingPlaceholderScale: number;

	static floatingEnabledDefault: boolean;

	static floatingPlaceholderColorDefault: UIColor;

	static floatingPlaceholderScaleDefault: number;

	characterCountMax: number; // inherited from MDCTextInputController

	characterCountViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	characterCounter: MDCTextInputCharacterCounter; // inherited from MDCTextInputController

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	errorColor: UIColor; // inherited from MDCTextInputController

	readonly errorText: string; // inherited from MDCTextInputController

	readonly hash: number; // inherited from NSObjectProtocol

	helperText: string; // inherited from MDCTextInputController

	inlinePlaceholderColor: UIColor; // inherited from MDCTextInputController

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInputController

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	textInput: UIView; // inherited from MDCTextInputController

	underlineColorActive: UIColor; // inherited from MDCTextInputController

	underlineColorNormal: UIColor; // inherited from MDCTextInputController

	underlineViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	readonly  // inherited from NSObjectProtocol

	static errorColorDefault: UIColor; // inherited from MDCTextInputController

	static inlinePlaceholderColorDefault: UIColor; // inherited from MDCTextInputController

	static mdc_adjustsFontForContentSizeCategoryDefault: boolean; // inherited from MDCTextInputController

	static underlineColorActiveDefault: UIColor; // inherited from MDCTextInputController

	static underlineColorNormalDefault: UIColor; // inherited from MDCTextInputController

	static underlineViewModeDefault: UITextFieldViewMode; // inherited from MDCTextInputController

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { textInput: UIView; }); // inherited from MDCTextInputController

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	editingRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	initWithTextInput(input: UIView): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setErrorTextErrorAccessibilityValue(errorText: string, errorAccessibilityValue: string): void;

	textInsets(defaultInsets: UIEdgeInsets): UIEdgeInsets;
}

declare class MDCTextInputControllerFullWidth extends NSObject implements MDCTextInputController {

	static alloc(): MDCTextInputControllerFullWidth; // inherited from NSObject

	static new(): MDCTextInputControllerFullWidth; // inherited from NSObject

	characterCountMax: number; // inherited from MDCTextInputController

	characterCountViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	characterCounter: MDCTextInputCharacterCounter; // inherited from MDCTextInputController

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	errorColor: UIColor; // inherited from MDCTextInputController

	readonly errorText: string; // inherited from MDCTextInputController

	readonly hash: number; // inherited from NSObjectProtocol

	helperText: string; // inherited from MDCTextInputController

	inlinePlaceholderColor: UIColor; // inherited from MDCTextInputController

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInputController

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	textInput: UIView; // inherited from MDCTextInputController

	underlineColorActive: UIColor; // inherited from MDCTextInputController

	underlineColorNormal: UIColor; // inherited from MDCTextInputController

	underlineViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	readonly  // inherited from NSObjectProtocol

	static errorColorDefault: UIColor; // inherited from MDCTextInputController

	static inlinePlaceholderColorDefault: UIColor; // inherited from MDCTextInputController

	static mdc_adjustsFontForContentSizeCategoryDefault: boolean; // inherited from MDCTextInputController

	static underlineColorActiveDefault: UIColor; // inherited from MDCTextInputController

	static underlineColorNormalDefault: UIColor; // inherited from MDCTextInputController

	static underlineViewModeDefault: UITextFieldViewMode; // inherited from MDCTextInputController

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { textInput: UIView; }); // inherited from MDCTextInputController

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	editingRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	initWithTextInput(input: UIView): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setErrorTextErrorAccessibilityValue(errorText: string, errorAccessibilityValue: string): void;

	textInsets(defaultInsets: UIEdgeInsets): UIEdgeInsets;
}

interface MDCTextInputPositioningDelegate extends NSObjectProtocol {

	editingRectForBoundsDefaultRect?(bounds: CGRect, defaultRect: CGRect): CGRect;

	textInsets?(defaultInsets: UIEdgeInsets): UIEdgeInsets;
}
declare var MDCTextInputPositioningDelegate: {

	prototype: MDCTextInputPositioningDelegate;
};

declare class MDCTextInputUnderlineView extends UIView implements NSCoding, NSCopying {

	static alloc(): MDCTextInputUnderlineView; // inherited from NSObject

	static appearance(): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCTextInputUnderlineView; // inherited from UIAppearance

	static new(): MDCTextInputUnderlineView; // inherited from NSObject

	color: UIColor;

	disabledUnderline: CAShapeLayer;

	enabled: boolean;

	lineHeight: number;

	underline: CAShapeLayer;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;
}

declare class MDCThumbTrack extends UIControl {

	static alloc(): MDCThumbTrack; // inherited from NSObject

	static appearance(): MDCThumbTrack; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCThumbTrack; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCThumbTrack; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCThumbTrack; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCThumbTrack; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCThumbTrack; // inherited from UIAppearance

	static new(): MDCThumbTrack; // inherited from NSObject

	continuousUpdateEvents: boolean;

	delegate: MDCThumbTrackDelegate;

	disabledTrackHasThumbGaps: boolean;

	filledTrackAnchorValue: number;

	interpolateOnOffColors: boolean;

	maximumValue: number;

	minimumValue: number;

	numDiscreteValues: number;

	panningAllowedOnEntireControl: boolean;

	primaryColor: UIColor;

	shouldDisplayDiscreteDots: boolean;

	shouldDisplayDiscreteValueLabel: boolean;

	shouldDisplayInk: boolean;

	tapsAllowedOnThumb: boolean;

	thumbDisabledColor: UIColor;

	thumbGrowsWhenDragging: boolean;

	thumbIsHollowAtStart: boolean;

	thumbIsSmallerWhenDisabled: boolean;

	thumbMaxRippleRadius: number;

	thumbOffColor: UIColor;

	readonly thumbPosition: CGPoint;

	thumbRadius: number;

	thumbView: MDCThumbView;

	trackDisabledColor: UIColor;

	trackEndsAreInset: boolean;

	trackEndsAreRounded: boolean;

	trackHeight: number;

	trackOffColor: UIColor;

	value: number;

	constructor(o: { frame: CGRect; onTintColor: UIColor; });

	initWithFrameOnTintColor(frame: CGRect, onTintColor: UIColor): this;

	setIcon(icon: UIImage): void;

	setValueAnimated(value: number, animated: boolean): void;

	setValueAnimatedAnimateThumbAfterMoveUserGeneratedCompletion(value: number, animated: boolean, animateThumbAfterMove: boolean, userGenerated: boolean, completion: () => void): void;
}

interface MDCThumbTrackDelegate extends NSObjectProtocol {

	thumbTrackDidAnimateToValue?(thumbTrack: MDCThumbTrack, value: number): void;

	thumbTrackShouldJumpToValue?(thumbTrack: MDCThumbTrack, value: number): boolean;

	thumbTrackStringForValue?(thumbTrack: MDCThumbTrack, value: number): string;

	thumbTrackWillAnimateToValue?(thumbTrack: MDCThumbTrack, value: number): void;

	thumbTrackWillJumpToValue?(thumbTrack: MDCThumbTrack, value: number): void;
}
declare var MDCThumbTrackDelegate: {

	prototype: MDCThumbTrackDelegate;
};

declare class MDCThumbView extends UIView {

	static alloc(): MDCThumbView; // inherited from NSObject

	static appearance(): MDCThumbView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCThumbView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCThumbView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MDCThumbView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCThumbView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MDCThumbView; // inherited from UIAppearance

	static new(): MDCThumbView; // inherited from NSObject

	borderWidth: number;

	cornerRadius: number;

	hasShadow: boolean;

	setIcon(icon: UIImage): void;
}

declare class MDCTonalColorScheme extends NSObject implements MDCColorScheme, NSCopying {

	static alloc(): MDCTonalColorScheme; // inherited from NSObject

	static new(): MDCTonalColorScheme; // inherited from NSObject

	readonly primaryTonalPalette: MDCTonalPalette;

	readonly secondaryTonalPalette: MDCTonalPalette;

	readonly primaryColor: UIColor; // inherited from MDCColorScheme

	readonly primaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly primaryLightColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryLightColor: UIColor; // inherited from MDCColorScheme

	constructor(o: { primaryTonalPalette: MDCTonalPalette; secondaryTonalPalette: MDCTonalPalette; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithPrimaryTonalPaletteSecondaryTonalPalette(primaryTonalPalette: MDCTonalPalette, secondaryTonalPalette: MDCTonalPalette): this;
}

declare class MDCTonalPalette extends NSObject implements NSCoding, NSCopying {

	static alloc(): MDCTonalPalette; // inherited from NSObject

	static new(): MDCTonalPalette; // inherited from NSObject

	readonly colors: NSArray<UIColor>;

	readonly darkColor: UIColor;

	readonly darkColorIndex: number;

	readonly lightColor: UIColor;

	readonly lightColorIndex: number;

	readonly mainColor: UIColor;

	readonly mainColorIndex: number;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { colors: NSArray<UIColor>; mainColorIndex: number; lightColorIndex: number; darkColorIndex: number; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	initWithColorsMainColorIndexLightColorIndexDarkColorIndex(colors: NSArray<UIColor>, mainColorIndex: number, lightColorIndex: number, darkColorIndex: number): this;
}

declare class MDCTypography extends NSObject {

	static alloc(): MDCTypography; // inherited from NSObject

	static body1Font(): UIFont;

	static body1FontOpacity(): number;

	static body2Font(): UIFont;

	static body2FontOpacity(): number;

	static boldFontFromFont(font: UIFont): UIFont;

	static buttonFont(): UIFont;

	static buttonFontOpacity(): number;

	static captionFont(): UIFont;

	static captionFontOpacity(): number;

	static display1Font(): UIFont;

	static display1FontOpacity(): number;

	static display2Font(): UIFont;

	static display2FontOpacity(): number;

	static display3Font(): UIFont;

	static display3FontOpacity(): number;

	static display4Font(): UIFont;

	static display4FontOpacity(): number;

	static fontLoader(): MDCTypographyFontLoading;

	static headlineFont(): UIFont;

	static headlineFontOpacity(): number;

	static isLargeForContrastRatios(font: UIFont): boolean;

	static italicFontFromFont(font: UIFont): UIFont;

	static new(): MDCTypography; // inherited from NSObject

	static setFontLoader(fontLoader: MDCTypographyFontLoading): void;

	static subheadFont(): UIFont;

	static subheadFontOpacity(): number;

	static titleFont(): UIFont;

	static titleFontOpacity(): number;
}

interface MDCTypographyFontLoading extends NSObjectProtocol {

	boldFontFromFont?(font: UIFont): UIFont;

	boldFontOfSize?(fontSize: number): UIFont;

	boldItalicFontOfSize?(fontSize: number): UIFont;

	isLargeForContrastRatios?(font: UIFont): boolean;

	italicFontFromFont?(font: UIFont): UIFont;

	italicFontOfSize?(fontSize: number): UIFont;

	lightFontOfSize(fontSize: number): UIFont;

	mediumFontOfSize(fontSize: number): UIFont;

	regularFontOfSize(fontSize: number): UIFont;
}
declare var MDCTypographyFontLoading: {

	prototype: MDCTypographyFontLoading;
};

interface MDCUINavigationItemObservables extends NSObjectProtocol {

	hidesBackButton: boolean;

	leftBarButtonItem: UIBarButtonItem;

	leftBarButtonItems: NSArray<UIBarButtonItem>;

	leftItemsSupplementBackButton: boolean;

	rightBarButtonItem: UIBarButtonItem;

	rightBarButtonItems: NSArray<UIBarButtonItem>;

	title: string;

	titleView: UIView;
}
declare var MDCUINavigationItemObservables: {

	prototype: MDCUINavigationItemObservables;
};

declare var MaterialComponentsVersionNumber: number;

declare var MaterialComponentsVersionString: interop.Reference<number>;

declare var kDeselectedCellAccessibilityHintKey: string;

declare var kMDCFeatureHighlightOuterHighlightAlpha: number;

declare var kSelectedCellAccessibilityHintKey: string;
