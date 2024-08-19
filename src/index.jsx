import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import SuptypeGroupLayer from '@arcgis/core/layers/SubtypeGroupLayer'
import config from './config.json'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const SubGroupLayerURL = 'https://services1.arcgis.com/oC086ufSSQ6Avnw2/arcgis/rest/services/Subtype_group_layer_unique_value_using_material_and_width_field1_WFL1/FeatureServer/0'

const createSubGroupSubLayer = (url) => {
  const layer = new SuptypeGroupLayer({ url })
  return layer.loadAll(() => {
    return layer
  })
}

const Root = (props) => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    createSubGroupSubLayer(SubGroupLayerURL).then((layer) => {
      chartRef.current.layer = layer
      chartRef.current.config = config
    })
  }, [])

  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 600 }}
        className='border'
      >
        <arcgis-charts-histogram ref={chartRef} />
      </div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
