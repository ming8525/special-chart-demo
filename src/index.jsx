import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import WebMap from '@arcgis/core/WebMap'
import { ArcgisChart } from '@arcgis/charts-components-react'
import { defineCustomElements } from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css'

defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })

const CacheLayers = {}
const createMapLayer = (portalUrl, itemId) => {
  return new Promise((resolve, reject) => {
    if (!portalUrl || !itemId) return reject()
    if (!CacheLayers[itemId]) {
      const webMap = new WebMap({
        portalItem: {
          id: itemId,
          portal: portalUrl
        }
      })
      webMap.loadAll().then(() => {
        const layers = webMap.layers.toArray()
        const layer = layers[0]
        CacheLayers[itemId] = layer
        resolve(layer)
      })
    } else {
      resolve(CacheLayers[itemId])
    }
  })
}
const portalUrl = 'https://www.arcgis.com/'
const itemId = '9de91931156e4c9b97004a96a60e206d'

const Root = (props) => {
  const [layer, setLayer] = React.useState(null)

  React.useEffect(() => {
    createMapLayer(portalUrl, itemId).then((layer) => {
      setLayer(layer)
    })
  }, [])

  return (
    <div style={{ height: 500, width: 500 }}>
      {layer && (
        <ArcgisChart
          className='border'
          config={config}
          layer={layer}
          usePopupTemplateFieldsInfo={true}
        />
      )}
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
