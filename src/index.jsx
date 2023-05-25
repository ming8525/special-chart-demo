import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const CacheLayers = {}
const createFeatureLayer = (url) => {
  if (!url) return null
  if (!CacheLayers[url]) {
    const fl = new FeatureLayer({ url })
    CacheLayers[url] = fl
    return fl
  } else {
    return CacheLayers[url]
  }
}

const createDefaultSelectionData = () => {
  const selectionIndexes = new Map()
  selectionIndexes.set(0, { indexesToSelect: [-1] })
  const selectionData = { selectionIndexes }
  return selectionData
}

const getNextSelection = (inputSelectionData) => {
  let newSelectionData = inputSelectionData
  const selectionIndexes = newSelectionData.selectionIndexes
  const selectionIndex = selectionIndexes.get(0).indexesToSelect[0] + 1
  selectionIndexes.set(0, { indexesToSelect: [selectionIndex] })
  return { selectionIndexes }
}

const BarChart = ({ title = 'Chart 1', style }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const service = config.service
    const layer = createFeatureLayer(service)

    let webChart = config.webChart

    webChart = {
      ...webChart,
      title: {
        ...webChart.title,
        content: {
          ...webChart.title.content,
          text: title
        }
      },
      rotated: Math.random() >= 0.5
    }
    ref.current.config = webChart
    ref.current.layer = layer

    setTimeout(() => {
      let newSelectionData = getNextSelection(createDefaultSelectionData())
      ref.current.selectionData = newSelectionData
      setTimeout(() => {
        newSelectionData = getNextSelection(newSelectionData)
        ref.current.selectionData = newSelectionData
        setTimeout(() => {
          newSelectionData = getNextSelection(newSelectionData)
          ref.current.selectionData = newSelectionData
        }, 200)
      }, 200)
    }, 200)
  }, [])

  return <div style={{ height: '100%', width: '100%', transform: 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)', ...style }}>
    <arcgis-charts-bar-chart ref={ref} />
  </div>
}

const Charts = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['10', '11', '12']]

const Root = (props) => {
  const [displayIndex, setDisplayIndex] = React.useState(0)

  const switchChart = () => {
    let newIndex = displayIndex + 1
    if (newIndex > (Charts.length - 1)) {
      newIndex = 0
    }
    setDisplayIndex(newIndex)
  }

  return <div style={{ height: 300 }}>
    <div style={{ height: '100%', width: '1200px', position: 'relative' }}>
      {
        Charts.map((subCharts, idx) => {
          const activate = displayIndex === idx
          return <div key={idx} style={{ height: '100%', width: '1200px', position: 'absolute', display: activate ? 'flex' : 'none', opacity: activate ? 1 : 0, zIndex: activate ? 1 : 0 }}>
              {
                subCharts.map((titleIndex, subIdx) => {
                  return <BarChart key={`${idx}-${subIdx}`} title={`Chart ${titleIndex}`} />
                })
              }
          </div>
        })
      }
    </div>
    <button onClick={switchChart}>Siwtch chart</button>
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)