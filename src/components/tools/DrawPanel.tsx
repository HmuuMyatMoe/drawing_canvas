import { ChangeEvent, useState } from "react";

interface DrawPanelProps {
    setDrawLineWidth: React.Dispatch<React.SetStateAction<number>>;
}

const DrawPanel: React.FC<DrawPanelProps> = ({setDrawLineWidth}) => {
    const [sliderValue, setSliderValue] = useState(10);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const sliderNum = event.target.valueAsNumber;
        setSliderValue(sliderNum);
        setDrawLineWidth(sliderNum);
    }

    return (
        <div>
            <p>Select pen size from 10 to 100</p>
            <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={sliderValue}
                onChange={onChangeHandler}
            />
            <p>Current value: {sliderValue}</p>
        </div>
    );
};

export default DrawPanel;
