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
