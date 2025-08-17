import ArrowTool from "./ArrowTool";
import DrawTool from "./DrawTool";
import FillTool from "./FillTool";
import "./Toolbar.css";

const Toolbar = () => {
    return (
        <header className="Toolbar-header">
            <p>[Toolbar]</p>
            <ArrowTool />
            <DrawTool />
            <FillTool  />
        </header>
    );
}

export default Toolbar;