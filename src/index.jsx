import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ArcgisChartsBarChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import SuptypeGroupLayer from '@arcgis/core/layers/SubtypeGroupLayer'
import config from './config.json'
import './style.css'

defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })

const SubGroupLayerURL = 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/MarineLife/FeatureServer/0'

const createSubGroupSubLayer = (url) => {
  const layer = new SuptypeGroupLayer({ url })
  return layer.loadAll().then(() => {
    return layer.sublayers.find((layer) => layer.title === 'Echinoderm')
  })
}

const Root = (props) => {
  const [layer, setLayer] = React.useState(null)

  React.useEffect(() => {
    createSubGroupSubLayer(SubGroupLayerURL).then((layer) => {
      setLayer(layer)
    })
  }, [])

  return (
    <div style={{ height: 600, width: 600 }} className='border'>
      <ArcgisChartsBarChart layer={layer} config={config} />
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
