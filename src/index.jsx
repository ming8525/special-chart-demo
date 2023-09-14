import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
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

export const useRegisterEvent = (nodeRef, eventName, callback) => {
  React.useEffect(() => {
    const node = nodeRef?.current
    if (node && eventName && callback) {
      node.addEventListener(eventName, callback)
    }

    return () => {
      if (node && eventName && callback) {
        node.removeEventListener(eventName, callback)
      }
    }
  }, [eventName, nodeRef, callback])
}

const Root = (props) => {
  const ref = React.useRef()
  const [data, setData] = React.useState([])


  const handleDataProcessComplete = React.useCallback((e) => {
    const dataItems = e.detail.dataItems
    const data = dataItems.map((dataItem) => ({ label: dataItem.ZONING, value: dataItem.PERCENTAGE_sum }))
    setData(data)
  }, [])

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
    })
  }, [])

  useRegisterEvent(ref, 'arcgisChartsDataProcessComplete', handleDataProcessComplete)


  return (
    <div className='root d-flex w-100'>
      <div className='w-50 h-100 border'>
        <arcgis-charts-pie-chart ref={ref} />
      </div>
      <div className='d-flex flex-column w-50 h-100 border'>{
        data.map(({ label, value }) => {
          return <div className='d-flex py-1 px-3 w-100'>
            <div className='w-50'>{label}</div>
            <div className='w-50'>{value}</div>
          </div>
        })
      }</div>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
