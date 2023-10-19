import React, { FC } from "react";
import "./FullScreenSlider.scss";
export interface IFullScreenSliderLayout {
    image: string;
}
export type FullScreenSliderProps = {
    open?: boolean;
    slides: React.ReactNode[];
    onClose?: () => void;
};
declare const FullScreenSlider: FC<FullScreenSliderProps>;
export default FullScreenSlider;
