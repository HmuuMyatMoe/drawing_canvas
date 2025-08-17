import { createContext, useContext, useState } from "react";
import { ToolType } from "../types/ToolType";
import { Layer } from "../types/Layer";

interface GlobalContextProviderProps {
    children: React.ReactNode;
}

export interface GlobalContextProps {
    canvasElement: HTMLCanvasElement | null;
    setCanvasElement: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
    canvasContext: CanvasRenderingContext2D | null;
    setCanvasContext: React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>;
    toolSelected: ToolType;
    setToolSelected: React.Dispatch<React.SetStateAction<ToolType>>;
    isControlPanelOpen: boolean,
    controlPanelChildren: React.ReactNode,
    controlPanelTitle: string,
    drawLineWidth: number;
    setDrawLineWidth: React.Dispatch<React.SetStateAction<number>>;
    canvasBackgroundColor: string;
    setCanvasBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
    onToolSelected: (toolType: ToolType, isControlPanelOpen: boolean, 
        controlPanelChildren: React.ReactNode, controlPanelTitle: string) => void;
    numLayers: number;
    layerList: Layer[];
    setLayerList: React.Dispatch<React.SetStateAction<Layer[]>>;
    createNewCanvas: (tool: ToolType) => void;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === null) {
        throw new Error("Global context is null.");
    }
    return context;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    
    const [toolSelected, setToolSelected] = useState<ToolType>(ToolType.Arrow);

    const [isControlPanelOpen, setIsControlPanelOpen] = useState<boolean>(false);
    const [controlPanelChildren, setControlPanelChildren] = useState<React.ReactNode>(<div></div>);
    const [controlPanelTitle, setControlPanelTitle] = useState<string>("");

    const [drawLineWidth, setDrawLineWidth] = useState(10);
    const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#ffffff");

    const [numLayers, setNumLayers] = useState<number>(0);
    const [layerList, setLayerList] = useState<Layer[]>([]);
    
    const onToolSelected = (toolType: ToolType, 
        isControlPanelOpen: boolean, 
        controlPanelChildren: React.ReactNode, 
        controlPanelTitle: string) => {
        
        setToolSelected(toolType);
        setIsControlPanelOpen(isControlPanelOpen);
        setControlPanelChildren(controlPanelChildren);
        setControlPanelTitle(controlPanelTitle);
        createNewCanvas(toolType);
    }

    const createNewCanvas = (tool: ToolType) => {
        if (tool !== ToolType.Arrow) {
            const newLayer: Layer = {
                id: numLayers + 1,
                tool: tool,
                points: [],
                background: "#fff6bd",
            };
            setLayerList(prev => [...prev, newLayer]);
            setNumLayers(prev => prev+1);
        }
    }

    return (
        <GlobalContext.Provider 
            value={{canvasElement,
                setCanvasElement,
                canvasContext,
                setCanvasContext,
                toolSelected,
                setToolSelected,
                isControlPanelOpen,
                controlPanelChildren,
                controlPanelTitle,
                drawLineWidth,
                setDrawLineWidth,
                canvasBackgroundColor,
                setCanvasBackgroundColor,
                onToolSelected,
                numLayers,
                layerList,
                setLayerList,
                createNewCanvas,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;