import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Portal from '@arcgis/core/portal/Portal'
import PortalItem from '@arcgis/core/portal/PortalItem'
import WebMap from '@arcgis/core/WebMap'
import config from './config.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})


const createFeatureLayer = (url) => {
  const fl = new FeatureLayer({ url })
  return fl
}

const Root = (props) => {
  const ref = React.useRef()
  const container1 = React.useRef()
  const container2 = React.useRef()

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    const webChart = config.webChart
    ref.current.config = webChart
    ref.current.layer = layer
  }, [])

  const handleSwitchContainer = () => {
    if (container1.current.hasChildNodes()) {
      container2.current.appendChild(ref.current)
    } else {
      container1.current.appendChild(ref.current)
    }
  }

  const draggedRef = React.useRef(null)

  const handleDrag = (event) => {
    event.target.classList.add("dragging");
    draggedRef.current = event.target
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDragEnd = () => {
    event.target.classList.remove("dragging");
    event.target.refresh()
  }

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.target.className.includes("dropzone")) {
      event.target.appendChild(draggedRef.current);
    }
  }

  return <div>
    <div style={{ height: 500, width: '100%', display: 'flex' }}>
      <div id="container" className='border' style={{ height: '100%', width: '100%' }} ref={container1}>
        <arcgis-charts-bar-chart
          ref={ref}
          draggable="true"
          onDragStart={handleDrag}
          onDragEnd={handleDragEnd}
        />
      </div>
      <div className="dropzone border" onDragOver={handleDragOver} onDrop={handleDrop} style={{ height: '100%', width: '100%' }} ref={container2}></div>
    </div>
    <button onClick={handleSwitchContainer}>Switch container</button>
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)