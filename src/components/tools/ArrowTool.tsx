import "./Toolbar.css";
import { ToolType } from "../../types/ToolType";
import { FaArrowPointer } from "react-icons/fa6";
import { useGlobalContext } from "../../context/Context";

const ArrowTool = () => {
    const { toolSelected,
        onToolSelected
     } = useGlobalContext();
     
    const onClickHandler = () => {
        onToolSelected(ToolType.Arrow, false, <></>, "Arrow");
    }

    return (
        <div>
            <div onClick={onClickHandler}>
                <FaArrowPointer
                    color={toolSelected === ToolType.Arrow ? 
                        "rgba(202, 44, 44, 1)" : "rgb(56, 56, 56"}
                />
            </div>
        </div>
    );
}

export default ArrowTool;