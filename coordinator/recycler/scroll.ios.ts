import { layout } from 'utils/utils';
import * as Rx from 'rxjs/Rx';
import { ScrollState, ScrollData, ScrollEvent } from "../behaviours/scroll-base";
import { RecyclerProducerBase, FixedHeaderBehavior as FixedHeaderBehaviorBase, ScrollScaleBehavior } from "./scroll.common";
export { ScrollScaleBehavior };
export class FixedHeaderBehavior extends FixedHeaderBehaviorBase {
    onLoaded() {
        super.onLoaded();
        let view = this.recycler.nativeView;
        let refresh: UIRefreshControl = view.refreshControl;
        let offset = layout.toDevicePixels(this.height) - (<any>refresh).triggerVerticalOffset;
        refresh.bounds = CGRectOffset(refresh.bounds, 0, -offset);
    }
}
class ScrollDelegate extends NSObject implements UITableViewDelegate {
    offsetX = 0;
    offsetY = 0;
    state = ScrollState.IDLE;
    private producer: Rx.Subject<ScrollData>;
    private test: Rx.Subject<ScrollData> = new Rx.Subject;
    private original: UITableViewDelegate;
    send(event: ScrollEvent, dx = 0, dy = 0) {
        this.producer.next({
            dy,
            dx,
            event,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            state: this.state
        });
    }
    scrollViewDidScroll?(scrollView: UIScrollView): void {
        /*console.log("SCROLL...")*/
        let nextX = layout.toDeviceIndependentPixels(scrollView.contentOffset.x);
        let nextY = layout.toDeviceIndependentPixels(scrollView.contentOffset.y);
        let dx = nextX - this.offsetX;
        let dy = nextY - this.offsetY;
        this.offsetX = nextX;
        this.offsetY = nextY;
        this.send(ScrollEvent.ScrollChanged, dx, dy);
    }
    //SCROLL VIEW
    scrollViewDidEndDecelerating(scrollView: UIScrollView): void {
        this.state = ScrollState.IDLE;
        this.send(ScrollEvent.StateChanged);
    }
    scrollViewDidEndDraggingWillDecelerate?(scrollView: UIScrollView, decelerate: boolean): void {
        if (decelerate) {
            this.state = ScrollState.ANIMATING;
        } else {
            this.state = ScrollState.IDLE;
        }
        this.send(ScrollEvent.StateChanged);
    }
    scrollViewDidEndScrollingAnimation?(scrollView: UIScrollView): void {
        this.state = ScrollState.IDLE;
        this.send(ScrollEvent.StateChanged);
    }
    scrollViewWillBeginDecelerating(scrollView: UIScrollView): void {
        this.state = ScrollState.ANIMATING;
        this.send(ScrollEvent.StateChanged);
    }
    scrollViewWillBeginDragging?(scrollView: UIScrollView): void {
        //console.log("BEGIN DRAG...")
        this.state = ScrollState.TOUCHING;
        this.send(ScrollEvent.StateChanged);
    }
    //TABLEVIEW

    public tableViewWillDisplayCellForRowAtIndexPath(tableView: UITableView, cell: UITableViewCell, indexPath: NSIndexPath) {
        return this.original.tableViewWillDisplayCellForRowAtIndexPath(tableView, cell, indexPath);
    }
    public tableViewWillSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): NSIndexPath {
        return this.original.tableViewWillSelectRowAtIndexPath(tableView, indexPath);
    }
    public tableViewDidSelectRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath) {
        return this.original.tableViewDidSelectRowAtIndexPath(tableView, indexPath);
    }
    public tableViewHeightForRowAtIndexPath(tableView: UITableView, indexPath: NSIndexPath): number {
        return this.original.tableViewHeightForRowAtIndexPath(tableView, indexPath);
    }
    //INIT
    static initWithProducer(producer: Rx.Subject<ScrollData>, original: UITableViewDelegate) {
        let del = <ScrollDelegate>ScrollDelegate.new();
        del.producer = producer;
        del.original = original;
        return del;
    }

    // A selector will be exposed so it can be called from native.
    static ObjCProtocols = [UITableViewDelegate] // define our native protocalls
}
class Multicast extends NSObject {
    delegates = [];
    respondsToSelector(aSelector: string) {
        console.log("RESPOND TO DELEGATEs1:", aSelector)
        if (super.respondsToSelector(aSelector)) {
            return true;
        }
        for (let i = 0; i < this.delegates.length; i++) {
            let delegate = this.delegates[i];
            console.log("RESPOND TO DELEGATE 1:", aSelector)
            if (delegate.respondsToSelector(aSelector)) {
                return true;
            }
        }
        return false;
    }

    methodSignatureForSelector(aSelector: string) {
        console.log("RESPOND TO DaELEGATEs1:", aSelector)
        // can this class create the signature?
        let signature = super.methodSignatureForSelector(aSelector);
        // if not, try our delegates
        if (!signature) {
            for (let i = 0; i < this.delegates.length; i++) {
                let delegate = this.delegates[i];
                if (delegate.respondsToSelector(aSelector)) {
                    console.log("RESPOND TO DELEGATE:", aSelector)
                    return delegate.methodSignatureForSelector(aSelector);
                }
            }
        }
        return signature;
    }
    forwardInvocation(anInvocation: NSInvocation) {
        console.log("RESPOND TO DELEGssATEs1:", anInvocation.selector)
        for (let i = 0; i < this.delegates.length; i++) {
            let delegate = this.delegates[i];
            if (delegate.respondsToSelector(anInvocation.selector)) {
                console.log("FORWARD TO DELEGATE:", anInvocation.selector)
                return anInvocation.invokeWithTarget(delegate);
            }
        }
    }
    public static init(d) {
        let del = <Multicast>Multicast.new();
        del.delegates = []
        del.delegates.push(d)
        return del;
    }
    public static ObjCExposedMethods = {
        "respondsToSelector": { returns: interop.types.bool, params: [interop.types.selector] },
        "methodSignatureForSelector": { returns: interop.types.id, params: [interop.types.selector] },
        "forwardInvocation": { returns: interop.types.void, params: [interop.types.id] }
    };
}
export class RecyclerProducer extends RecyclerProducerBase {
    init() {
        this.view.on("loaded", () => {
            let oldDelegate: UITableViewDelegate = this.view["_delegate"];
            let del = ScrollDelegate.initWithProducer(this.stream, oldDelegate);
            this.view["_delegate"] = del;
        });
    }
    startNative() {
    }
    stopNative() {
        let recycler: UITableView = this.view.recycler;
        recycler.delegate = null;
    }
}
