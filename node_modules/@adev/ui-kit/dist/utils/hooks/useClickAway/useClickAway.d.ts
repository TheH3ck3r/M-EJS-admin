import { ReactElement, HTMLAttributes, FunctionComponent, RefObject } from "react";
declare const useClickAway: (ref: RefObject<HTMLElement | null>, callback: (event: Event) => void) => void;
type FocusEvents = "focusin" | "focusout";
type MouseEvents = "click" | "mousedown" | "mouseup";
type TouchEvents = "touchstart" | "touchend";
type Events = FocusEvent | MouseEvent | TouchEvent;
interface Props extends HTMLAttributes<HTMLElement> {
    onClickAway: (event: Events) => void;
    focusEvent?: FocusEvents;
    mouseEvent?: MouseEvents;
    touchEvent?: TouchEvents;
    children: ReactElement<any>;
}
declare const ClickAwayListener: FunctionComponent<Props>;
export { useClickAway, ClickAwayListener };
