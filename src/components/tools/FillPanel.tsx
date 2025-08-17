import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useGlobalContext } from "../../context/Context";

interface FillPanelProps {
    setCanvasBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
}

const FillPanel: React.FC<FillPanelProps> = ({setCanvasBackgroundColor}) => {
    const {canvasContext, numLayers, setLayerList} = useGlobalContext();
    const [color, setColor] = useState("#111111");
    const onChangeHandler = (newColor: string) => {
        setColor(newColor);
    }

    const onBackgroundChangeHandler = () => {
        setCanvasBackgroundColor(color);
        canvasContext?.save();
        setLayerList((prev) =>
            prev.map((layer) =>
                layer.id === numLayers
                    ? { ...layer, background: color }
                    : layer
            )
        );
    }

    return (
        <div>
            <HexColorPicker color={color} onChange={onChangeHandler} />
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <p>Color picked: {color}</p>
                <div style={{
                    width: 20, 
                    height: 20, 
                    backgroundColor: color, 
                    marginLeft: 10, 
                    borderStyle: "solid", 
                    borderWidth: "1px", 
                    borderColor: "black"}}
                >
                </div>
            </div>
            <button onClick={onBackgroundChangeHandler}>Set as background</button>
        </div>
    );
};

export default FillPanel;