import { useGlobalContext } from "../../context/Context";
import "./ControlPanel.css";

const ControlPanel = () => {
    
    const { isControlPanelOpen,
        controlPanelChildren,
        controlPanelTitle
     } = useGlobalContext();
     
    if (!isControlPanelOpen) return null;

    return (
        <div className="ControlPanel-overlay">
            <div className="ControlPanel-content">
                <header className="ControlPanel-title">{controlPanelTitle}</header>
                <div>{controlPanelChildren}</div>
            </div>
        </div>
    );
};

export default ControlPanel;
