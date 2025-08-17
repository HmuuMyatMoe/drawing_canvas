import { ToolType } from "./ToolType";

export interface Layer {
    id: number;
    tool: ToolType;
    points: { x: number; y: number }[];
    background: string;
}