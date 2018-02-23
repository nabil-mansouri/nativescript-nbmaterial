
declare class UIRefreshControl extends UIControl {

    static alloc(): UIRefreshControl; // inherited from NSObject

    static appearance(): UIRefreshControl; // inherited from UIAppearance

    static appearanceForTraitCollection(trait: UITraitCollection): UIRefreshControl; // inherited from UIAppearance

    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): UIRefreshControl; // inherited from UIAppearance

    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): UIRefreshControl; // inherited from UIAppearance

    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): UIRefreshControl; // inherited from UIAppearance

    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): UIRefreshControl; // inherited from UIAppearance

    static new(): UIRefreshControl; // inherited from NSObject

    attributedTitle: NSAttributedString;

    readonly refreshing: boolean;

    triggerVerticalOffset: number;

    beginRefreshing(): void;

    endRefreshing(): void;
}
declare class UIScrollView extends UIView implements NSCoding {

    static alloc(): UIScrollView; // inherited from NSObject

    static appearance(): UIScrollView; // inherited from UIAppearance

    static appearanceForTraitCollection(trait: UITraitCollection): UIScrollView; // inherited from UIAppearance

    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): UIScrollView; // inherited from UIAppearance

    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): UIScrollView; // inherited from UIAppearance

    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): UIScrollView; // inherited from UIAppearance

    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): UIScrollView; // inherited from UIAppearance

    static new(): UIScrollView; // inherited from NSObject

    alwaysBounceHorizontal: boolean;

    alwaysBounceVertical: boolean;

    bottomRefreshControl: UIRefreshControl;

    bounces: boolean;

    bouncesZoom: boolean;

    canCancelContentTouches: boolean;

    contentInset: UIEdgeInsets;

    contentOffset: CGPoint;

    contentSize: CGSize;

    readonly decelerating: boolean;

    decelerationRate: number;

    delaysContentTouches: boolean;

    delegate: UIScrollViewDelegate;

    directionalLockEnabled: boolean;

    readonly dragging: boolean;

    indexDisplayMode: UIScrollViewIndexDisplayMode;

    indicatorStyle: UIScrollViewIndicatorStyle;

    keyboardDismissMode: UIScrollViewKeyboardDismissMode;

    maximumZoomScale: number;

    minimumZoomScale: number;

    pagingEnabled: boolean;

    readonly panGestureRecognizer: UIPanGestureRecognizer;

    readonly pinchGestureRecognizer: UIPinchGestureRecognizer;

    refreshControl: UIRefreshControl;

    scrollEnabled: boolean;

    scrollIndicatorInsets: UIEdgeInsets;

    scrollsToTop: boolean;

    showsHorizontalScrollIndicator: boolean;

    showsVerticalScrollIndicator: boolean;

    readonly tracking: boolean;

    readonly zoomBouncing: boolean;

    zoomScale: number;

    readonly zooming: boolean;

    constructor(o: { coder: NSCoder; }); // inherited from NSCoding

    encodeWithCoder(aCoder: NSCoder): void;

    flashScrollIndicators(): void;

    initWithCoder(aDecoder: NSCoder): this;

    scrollRectToVisibleAnimated(rect: CGRect, animated: boolean): void;

    setContentOffsetAnimated(contentOffset: CGPoint, animated: boolean): void;

    setZoomScaleAnimated(scale: number, animated: boolean): void;

    touchesShouldBeginWithEventInContentView(touches: NSSet<UITouch>, event: UIEvent, view: UIView): boolean;

    touchesShouldCancelInContentView(view: UIView): boolean;

    zoomToRectAnimated(rect: CGRect, animated: boolean): void;
}
