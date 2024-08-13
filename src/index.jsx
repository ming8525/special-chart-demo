import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsBarChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import fakerLayer from './faker-layer.json'
import './style.css'
defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })

const Chart = () => {
  const [layer, setLayer] = React.useState(null)
  
  React.useEffect(() => {
    const layer = new FeatureLayer({
      objectIdField: "FID",
      fields: fakerLayer.fields,
      source: fakerLayer.features
    })
    setLayer(layer)
  }, [])

  return <ArcgisChartsBarChart layer={layer} config={config} />
}

const Root = (props) => {
  const [activated, setActivated] = React.useState('second')

  return (
    <div className='container border'>
      <div
        className='header border-bottom'
        style={{ width: '100%', display: 'flex' }}
      >
        <button
          className={activated === 'first' ? 'activated' : ''}
          style={{ width: '50%' }}
          onClick={() => setActivated('first')}
        >
          First
        </button>
        <button
          className={activated === 'second' ? 'activated' : ''}
          style={{ width: '50%' }}
          onClick={() => setActivated('second')}
        >
          Second
        </button>
      </div>
      <div className='contents'>
        <div
          className='content first-content'
          style={{ display: activated === 'first' ? 'block' : 'none' }}
        >
          Please switch to the second tab content
        </div>
        <div
          className='content second-content'
          style={{ display: activated === 'second' ? 'block' : 'none' }}
        >
          <Chart />
        </div>
      </div>
    </div>
  )
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
