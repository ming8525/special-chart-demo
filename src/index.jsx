import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {
  applyPolyfills,
  defineCustomElements,
} from '@arcgis/charts-components/dist/loader'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import config from './config.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const createFeatureLayer = (url) => {
  const fl = new FeatureLayer({ url })
  return fl
}

const Root = (props) => {
  const ref = React.useRef()
  const [activated, setActivated] = React.useState('first')

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    })
  }, [])

  const handleRefresh = () => {
    ref.current.refresh()
  }

  return (
    <div className='container border'>
      <div className='header border-bottom' style={{ width: '100%', display: 'flex' }}>
        <button onClick={() => setActivated('first')}>First</button>
        <button onClick={() => setActivated('second')}>Second</button>
      </div>
      <div className='contents border'>
        <div className='content first-content' style={{ display: activated === 'first' ? 'block' : 'none' }}>Please switch to the second tab content</div>
        <div className='content second-content' style={{ display: activated === 'second' ? 'block' : 'none' }}>
          <arcgis-charts-histogram ref={ref} />
        </div>
      </div>

    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
