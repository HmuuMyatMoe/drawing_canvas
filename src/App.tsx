import './App.css';
import Toolbar from './components/tools/Toolbar';
import Canvas from './components/canvas/Canvas';
import ControlPanel from './components/tools/ControlPanel';
import GlobalContextProvider from './context/Context';
import LayerPanel from './components/layers/LayerPanel';

function App() {
  
  return (
    <GlobalContextProvider>
      <div className="App">
        <Toolbar />
        <Canvas />
        <ControlPanel />
        <LayerPanel />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
