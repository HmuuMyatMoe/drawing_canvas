import { GiPaintBucket } from "react-icons/gi";
import "./Toolbar.css";
import { ToolType } from "../../types/ToolType";
import FillPanel from "./FillPanel";
import { useGlobalContext } from "../../context/Context";

const FillTool = () => {
    const { toolSelected,
        onToolSelected,
        setCanvasBackgroundColor,
     } = useGlobalContext();

    const onClickHandler = () => {
        onToolSelected(ToolType.Fill, 
            true, 
            <FillPanel setCanvasBackgroundColor={setCanvasBackgroundColor}/>, 
            "Background Fill"
        );
    }

    return (
        <div>
            <div onClick={onClickHandler}>
                <GiPaintBucket
                    size={30}
                    color={toolSelected === ToolType.Fill ? 
                        "rgba(202, 44, 44, 1)" : "rgb(56, 56, 56"}
                />
            </div>
        </div>
    );
}

export default FillTool;