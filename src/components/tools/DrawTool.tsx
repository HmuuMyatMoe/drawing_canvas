import { FaPaintBrush } from "react-icons/fa";
import { ToolType } from "../../types/ToolType";
import DrawPanel from "./DrawPanel";
import { useGlobalContext } from "../../context/Context";

const DrawTool = () => {
    const { toolSelected,
            onToolSelected,
            setDrawLineWidth
    } = useGlobalContext();

    const onClickHandler = () => {
        onToolSelected(ToolType.Draw, 
            true, 
            <DrawPanel setDrawLineWidth={setDrawLineWidth}/>, 
            "Draw");
    }
        
    return (
        <div
            onClick={onClickHandler}
        >
            <FaPaintBrush 
                color={toolSelected === ToolType.Draw ? "rgba(202, 44, 44, 1)" : "rgb(56, 56, 56"}
            />
        </div>
    );
}

export default DrawTool;