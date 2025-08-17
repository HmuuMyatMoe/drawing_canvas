import { useRef, useEffect, useState } from "react";
import { ToolType } from "../../types/ToolType";
import "./Canvas.css";
import { useGlobalContext } from "../../context/Context";
import React from "react";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const { canvasElement, 
        setCanvasElement, 
        canvasContext, 
        setCanvasContext,
        toolSelected,
        drawLineWidth,
        canvasBackgroundColor,
        layerList,
        setLayerList,
     } = useGlobalContext();
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [prevCoords, setPrevCoords] = useState<{x: number, y: number} | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        setCanvasElement(canvasRef.current);

        const context = canvas.getContext('2d');
        if (!context) return;
        setCanvasContext(context);
    },);

    useEffect(() => {
        if (!canvasElement || !canvasContext) return;

        canvasContext.fillStyle = canvasBackgroundColor;
        canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }, [canvasBackgroundColor]);

    const draw = (clientX: number, clientY: number) => {
        if (toolSelected !== ToolType.Draw || !isMouseDown || !canvasContext) return;
        
        // get canvas coords
        const canvasBoundary = canvasElement?.getBoundingClientRect();
        const x = clientX - canvasBoundary!.left;
        const y = clientY - canvasBoundary!.top;

        if (x < 1 || x > canvasBoundary!.right || y < canvasBoundary!.top || y > canvasBoundary!.bottom) {
            return mouseUpHandler();
        }

        canvasContext.beginPath();
        canvasContext.lineWidth = drawLineWidth / 10;
        if (prevCoords) {
            canvasContext.moveTo(prevCoords.x, prevCoords.y);
            canvasContext.lineTo(x, y);
        }
        canvasContext.stroke();
        setPrevCoords({x, y});

        //get latest layers and store
        const layers = [...layerList];
        const activeLayer = layers[layers.length - 1];
        activeLayer.points.push({x,y});
        setLayerList((prevLayers) =>
            prevLayers.map((layer) =>
                layer.id === layers.length - 1
                    ? { ...layer, points: activeLayer.points }
                    : layer
            )
        );
    }

    const mouseDownHandler = (event: React.MouseEvent) => {
        setIsMouseDown(true);
        const canvasBoundary = canvasElement?.getBoundingClientRect();
        const x = event.clientX - canvasBoundary!.left;
        const y = event.clientY - canvasBoundary!.top;

        switch (toolSelected) {
            case ToolType.Draw:
                const layers = [...layerList];
                const activeLayer = layers[layers.length - 1];
                activeLayer.points.push({x,y});
                setLayerList((prevLayers) =>
                    prevLayers.map((layer) =>
                        layer.id === layers.length - 1
                            ? { ...layer, points: activeLayer.points }
                            : layer
                    )
                );
                break;
        }
        setIsMouseDown(true);
    }

    const mouseUpHandler = () => {
        setIsMouseDown(false);
        setPrevCoords(null);
        canvasContext?.save();
    }

    const mouseMoveHandler = (event: React.MouseEvent) => {
        switch (toolSelected) {
            case ToolType.Draw:
                draw(event.clientX, event.clientY);
                break;
        }
    }

    return (
        <canvas
            className="Canvas"
            ref={canvasRef}
            width={window.innerWidth}
            height={600}
            onMouseMove={(event) => mouseMoveHandler(event)}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
        />
    );
}

export default Canvas;