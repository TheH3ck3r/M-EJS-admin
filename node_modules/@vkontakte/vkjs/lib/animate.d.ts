import { SupportEvent } from './types';
declare type TimingInterface = (timeFraction: number) => number;
declare type DrawInterface = (progress: number) => void;
interface AnimateArgumentsInterface {
    duration: number;
    timing: TimingInterface;
    draw: DrawInterface;
}
export declare function animate({ duration, timing, draw }: AnimateArgumentsInterface): void;
export declare const animationEvent: SupportEvent<'animationend'>;
export declare const transitionEvent: SupportEvent<'transitionend'>;
export declare function waitAnimationEnd(listener: (ev?: AnimationEvent) => any, fallbackTime: number, el?: GlobalEventHandlers): number | undefined;
export declare function cancelWaitAnimationEnd(listener: (ev?: AnimationEvent) => any, handle?: number, el?: GlobalEventHandlers): void;
export declare function waitTransitionEnd(el: GlobalEventHandlers, listener: (ev?: TransitionEvent) => any, fallbackTime: number): number | undefined;
export declare function cancelWaitTransitionEnd(listener: (ev?: TransitionEvent) => any, handle?: number, el?: GlobalEventHandlers): void;
export {};
