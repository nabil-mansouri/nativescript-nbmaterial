import { layout } from 'utils/utils';
import * as Rx from 'rxjs/Rx';
import { ScrollState, ScrollData, ScrollEvent } from "../behaviours/scroll-base";
import { RecyclerProducerBase, FixedHeaderBehavior, ScrollScaleBehavior } from "./scroll.common";
export { FixedHeaderBehavior, ScrollScaleBehavior };
let ListenerClazz = null;
function ensureClass() {
    if (ListenerClazz) {
        return;
    }
    class ListenerImpl extends android.support.v7.widget.RecyclerView.OnScrollListener {
        offsetX = 0;
        offsetY = 0;
        state = ScrollState.IDLE;
        constructor(private producer: Rx.Subject<ScrollData>) {
            super();
            return global.__native(this);
        }
        public onScrolled(recyclerView: android.support.v7.widget.RecyclerView, dx: number, dy: number): void {
            this.offsetX += dx;
            this.offsetY += dy;
            this.producer.next({
                dy: dy,
                dx: dx,
                event: ScrollEvent.ScrollChanged,
                offsetX: layout.toDeviceIndependentPixels(this.offsetX),
                offsetY: layout.toDeviceIndependentPixels(this.offsetY),
                state: this.state
            });
        }
        public onScrollStateChanged(recyclerView: android.support.v7.widget.RecyclerView, newState: number): void {
            switch (newState) {
                case android.support.v7.widget.RecyclerView.SCROLL_STATE_IDLE:
                    this.state = ScrollState.IDLE;
                    break;
                case android.support.v7.widget.RecyclerView.SCROLL_STATE_DRAGGING:
                    this.state = ScrollState.TOUCHING;
                    break;
                case android.support.v7.widget.RecyclerView.SCROLL_STATE_SETTLING:
                    this.state = ScrollState.ANIMATING;
                    break;
            }
            this.producer.next({
                dy: 0,
                dx: 0,
                event: ScrollEvent.StateChanged,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                state: this.state
            });
        }
    }
    ListenerClazz = ListenerImpl;
}

export class RecyclerProducer extends RecyclerProducerBase {
    scrollListener;
    startNative() {
        let recycler: android.support.v7.widget.RecyclerView = this.view.recycler;
        ensureClass();
        this.scrollListener = new ListenerClazz(this.stream);
        recycler.addOnScrollListener(this.scrollListener);
    }
    stopNative() {
        let recycler: android.support.v7.widget.RecyclerView = this.view.recycler;
        recycler.removeOnScrollListener(this.scrollListener);
        this.scrollListener = null;
    }
}