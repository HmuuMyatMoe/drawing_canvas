import { useGlobalContext } from "../../context/Context";
import "./LayerPanel.css";
import { LuFiles } from "react-icons/lu";

interface LayerProps {
    layerID: number;
}

export const Layer: React.FC<LayerProps> = ({layerID}) => {
    return (
        <div>
            <LuFiles />
            <p>Layer {layerID}</p>
        </div>
    )
}

const LayerPanel = () => {
    const { layerList } = useGlobalContext();

    return (
        <div className="LayerPanel-overlay">
            <div className="LayerPanel-content">
                <header className="LayerPanel-title">Layers</header>
                    {layerList.map((layer) => (
                        <div key={layer.id} 
                            style={{display:"flex", alignItems: "center", flexDirection:"row"}}
                        >
                            <LuFiles />
                            <p>Layer {layer.id}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default LayerPanel;