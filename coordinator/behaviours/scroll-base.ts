import { layout } from 'utils/utils';
import { View, isAndroid, Color, isIOS } from 'ui/core/view';
import { AnimationCurve } from 'ui/enums';
import { ProducerData, Producer, Behaviour } from "./behaviour";
import { Interpolator } from "./interpolator";
import * as Rx from 'rxjs/Rx';

export enum ScrollState {
    TOUCHING, ANIMATING, IDLE
}

export enum ScrollDirection {
    TOP, BOTTOM, LEFT, RIGHT, NOOP
}
export enum ScrollEvent {
    StateChanged, ScrollChanged
}

export interface ScrollData extends ProducerData {
    dy: number;
    dx: number;
    offsetY: number;
    offsetX: number;
    state: ScrollState;
}

export abstract class ScrollTrackerBehavior implements Behaviour {
    view: View;
    height: number;
    ignoreNegativeOffset = true;
    //PROTECTED
    protected moving = false;
    protected throttling = 50;
    protected initDistance = 0;
    protected currentOffset = 0;
    protected currentDirection = ScrollDirection.NOOP;
    // 
    subscriptions: Rx.Subscription[] = [];
    constructor(protected producer: Producer) {
    }
    onInitNative() {
        this.producer.init();
    }
    onDispose() { }
    onUnloaded() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions = [];
        this.producer.stop();
    }
    onLoaded() {
        this.updateValues();
        const stream: Rx.Observable<ScrollData> = (() => {
            let s: Rx.Observable<ScrollData> = <any>this.producer.stream;
            if (this.ignoreNegativeOffset) {
                s = s.map(data => {
                    data.offsetY = data.offsetY < 0 ? 0 : data.offsetY;
                    return data;
                })
            }
            return s;
        })();
        const distinctState = stream.filter(data => data.event == ScrollEvent.StateChanged)//
            .distinctUntilKeyChanged("state");
        //LISTEN WHEN START MOVING
        const consumerStarting = distinctState.filter(data => data.state != ScrollState.IDLE);
        this.subscriptions.push(consumerStarting.subscribe(data => {
            this.initDistance = data.offsetY;
            this.currentOffset = data.offsetY;
            this.moving = true;
        }));
        //LISTEN WHEN MOVING
        const consumerMoving = stream.filter(data => data.event == ScrollEvent.ScrollChanged && data.dy != 0)//
            .throttleTime(this.throttling);
        this.subscriptions.push(consumerMoving.subscribe(data => {
            //console.log("CURRENT OFFSET : ", this.currentOffset)
            let dy = this.currentOffset - data.offsetY;
            this.currentDirection = dy > 0 ? ScrollDirection.BOTTOM : ScrollDirection.TOP;
            this.currentOffset = data.offsetY;
            this.move(dy);
        }));
        //LISTEN WHEN FINISH MOVING
        const consumerStoping = distinctState.filter(data => data.state == ScrollState.IDLE);
        this.subscriptions.push(consumerStoping.subscribe(data => {
            this.currentOffset = data.offsetY;
            this.moving = false;
            this.checkPartial();
        }));
        this.producer.start();
    }
    abstract move(dy: number);
    abstract checkPartial();
    abstract updateValues();
    get distanceToTop() {
        return this.height;
    }
}

export class FixedHeaderBehaviorBase extends ScrollTrackerBehavior {
    playOpacity = true;
    speedFactor = 0.5;
    deferHideFactor = 0;
    deferShowFactor = 0;
    animationDuration = 150;
    maxTranslate: number = 0;
    hideAnimation: (behav) => void;
    showAnimation: (behav) => void;
    hideDirection = ScrollDirection.TOP;
    showWhenOffsetLessThanHeight = true;
    thresholdFactor = 0.1; //SEUIL POUR COMPLETER ANIM
    //PROTECTED
    protected deferHide = 0;
    protected deferShow = 0;
    protected translateShow = 0;
    protected translateHide = 0;
    protected translateHideMin = 0;
    protected translateShowMin = 0;

    updateValues() {
        this.translateHide = -this.distanceToTop + this.maxTranslate;
        this.translateHideMin = this.translateHide * this.thresholdFactor;
        this.translateShowMin = this.translateHide - this.translateHideMin;
        this.deferHide = this.distanceToTop * this.deferHideFactor;
        this.deferShow = this.distanceToTop * this.deferShowFactor;
    }
    canMove() {
        let distance = Math.abs(this.initDistance - this.currentOffset);
        let defer = this.currentDirection == this.hideDirection ? this.deferHide : this.deferShow;
        //DISTANCE IS GREATER THAN NEED OR TOP IS REACHED
        return this.moving && (defer < distance || this.currentOffset <= defer);
    }
    computeOpacity(value: number) {
        value = 1 - (value / this.translateHide);
        return value;
    }
    move(dy: number) {
        if (this.canMove()) {
            let current = this.view.translateY;
            let next = current + (dy * this.speedFactor);
            if (this.currentDirection == this.hideDirection) {
                next = Math.max(this.translateHide, next);
            } else {
                next = Math.min(this.translateShow, next);
            }
            //
            if (isNaN(next)) {
                next = 0;
            }
            if (next != current) {
                this.view.translateY = next;
                if (this.playOpacity) {
                    this.view.opacity = this.computeOpacity(next);
                }
                //console.log("MOVE TO :", (this.currentDirection == this.hideDirection) ? "HIDE " : "SHOW ", next, this.view.translateY, " -> ", dy)
            }
        }
    }
    checkPartial() {
        if (this.showWhenOffsetLessThanHeight) {
            if (this.currentOffset < this.distanceToTop) {
                this.view.animate({ translate: { x: 0, y: 0 }, opacity: 1, curve: AnimationCurve.easeOut, duration: this.animationDuration })
                this.showAnimation && this.showAnimation(this);
                return;
            }
        }
        let moved = this.view.translateY;
        if (this.translateHide < moved && moved < 0) {
            let translate = (this.currentDirection == this.hideDirection) ? this.translateHide : this.translateShow;
            let curve = this.currentDirection == ScrollDirection.BOTTOM ? AnimationCurve.easeOut : AnimationCurve.easeInOut;
            let opacity = this.playOpacity ? this.computeOpacity(translate) : this.view.opacity;
            this.view.animate({ translate: { x: 0, y: translate }, opacity, curve, duration: this.animationDuration })
            this.hideAnimation && this.hideAnimation(this);
            //console.log("CHECK PARTIAL: ", translate);
        }
    }
}

export abstract class ScaleBehaviorBase extends FixedHeaderBehaviorBase {

    computeOpacity(value: number) {
        return value;
    }
    move(dy: number) {
        if (this.canMove()) {
            let current = this.view.scaleX;
            let next = current + (dy * this.speedFactor / this.height);
            if (this.currentDirection == this.hideDirection) {
                next = Math.max(0, next);
            } else {
                next = Math.min(1, next);
            }
            //
            if (isNaN(next)) {
                next = 1;
            }
            if (next != current) {
                this.view.scaleX = next;
                this.view.scaleY = next;
                if (this.playOpacity) {
                    this.view.opacity = this.computeOpacity(next);
                }
                //console.log("SCALE TO :", (this.currentDirection == this.hideDirection) ? "HIDE " : "SHOW ", next, this.view.scaleY, " -> ", dy)
            }
        }
    }
    checkPartial() {
        if (this.showWhenOffsetLessThanHeight) {
            if (this.currentOffset < this.height) {
                this.view.animate({ scale: { x: 1, y: 1 }, opacity: 1, curve: AnimationCurve.easeOut, duration: this.animationDuration });
                return;
            }
        }
        let moved = this.view.scaleX;
        if (0 < moved && moved < 1) {
            let translate = (this.currentDirection == this.hideDirection) ? 0 : 1;
            let curve = this.currentDirection == ScrollDirection.BOTTOM ? AnimationCurve.easeOut : AnimationCurve.easeInOut;
            let opacity = this.playOpacity ? this.computeOpacity(translate) : this.view.opacity;
            this.view.animate({ scale: { x: translate, y: translate }, opacity, curve, duration: this.animationDuration })
            //console.log("CHECK PARTIAL: ", translate);
        }
    }
}



export abstract class ExpandableHeaderBehaviorBase extends ScrollTrackerBehavior {
    deferHideFactor = 0;
    deferShowFactor = 0;
    animationDuration = 150;
    disappearAt: number;
    hideDirection = ScrollDirection.TOP;
    hideAnimation: (behav) => void;
    showAnimation: (behav) => void;
    //
    protected deferHide = 0;
    protected deferShow = 0;
    updateValues() {
        this.deferHide = this.distanceToTop * this.deferHideFactor;
        this.deferShow = this.distanceToTop * this.deferShowFactor;
        this.showAnimation(this);
    }
    canMove() {
        let distance = Math.abs(this.initDistance - this.currentOffset);
        let defer = this.currentDirection == this.hideDirection ? this.deferHide : this.deferShow;
        //DISTANCE IS GREATER THAN NEED OR TOP IS REACHED
        //NO NEED TO TEST MOVING => scroll view dont have change state
        return (this.currentOffset <= this.distanceToTop);
    }
    move(dy: number) {
        if (this.canMove()) {
            let current = this.view.getActualSize().height;
            if (isNaN(current) || isNaN(dy)) {
                return;
            }
            let next = current + dy;
            next = Math.min(next, this.distanceToTop);
            next = Math.max(next, this.disappearAt);
            if (next != current) {
                this.view.height = next;
            }
            this.check(next);
        } else {
            //SCROLL FAR FROM TOP BUT STILL VISIBLE
            if (this.view.opacity > 0) {
                this.view.animate({ opacity: 0, duration: this.animationDuration, curve: AnimationCurve.easeOut });
                this.hideAnimation && this.hideAnimation(this);
            }
        }
    }
    checkPartial() {
        this.check(this.view.getActualSize().height);
    }
    check(next: number) {
        if (next == this.disappearAt) {
            this.view.animate({ opacity: 0, duration: this.animationDuration, curve: AnimationCurve.easeOut });
            this.hideAnimation && this.hideAnimation(this);
        } else if (next > this.disappearAt && this.view.opacity < 1) {
            this.view.animate({ opacity: 1, duration: this.animationDuration, curve: AnimationCurve.easeIn });
            this.showAnimation && this.showAnimation(this);
        }
    }
}