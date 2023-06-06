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

let selectionIndex = 0
const selectionIndexes = new Map()
selectionIndexes.set(0, { indexesToSelect: [] })
const DefaultSelectionData = { selectionIndexes: undefined }

const useRegisterEvent = (nodeRef, eventName, callback) => {
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

const PieChart = ({ layer, chartRef }) => {
  const ref = React.useRef()

  React.useEffect(() => {
    chartRef.current = ref.current

    const webChart = config.webChart
    ref.current.config = webChart
    setTimeout(() => {
      ref.current.layer = layer
    })
    ref.current.runtimeDataFilters = { where: "(obstakels = 'beheer_en_onderhoud')" }
    ref.current.selectionData = DefaultSelectionData

    ref.current.returnSelectionIndexes = true
    ref.current.returnSelectionOIDs = false
    ref.current.queueChartCreation = true
    ref.current.autoDisposeChart = true
    ref.current.enableResponsiveFeatures = false
    ref.current.useAnimatedCharts = false
  }, [layer])


  const arcgisChartsDataProcessComplete = React.useCallback((event) => {
    console.log('arcgisChartsDataProcessComplete', event.detail)
  }, [])

  const arcgisChartsDataProcessError = React.useCallback((event) => {
    console.log('arcgisChartsDataProcessError')
  }, [])

  const arcgisChartsSelectionComplete = React.useCallback((event) => {
    console.log('arcgisChartsSelectionComplete', event.detail)
  }, [])


  useRegisterEvent(ref, 'arcgisChartsDataProcessComplete', arcgisChartsDataProcessComplete)
  useRegisterEvent(ref, 'arcgisChartsDataProcessError', arcgisChartsDataProcessError)
  useRegisterEvent(ref, 'arcgisChartsSelectionComplete', arcgisChartsSelectionComplete)


  return <arcgis-charts-pie-chart ref={ref} />
}

const Root = (props) => {
  const chartRef = React.useRef()
  const [layer, setLayer] = React.useState(null)

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    setLayer(layer)
  }, [])


  React.useEffect(() => {
    if (chartRef.current) {
      setTimeout(() => {
        chartRef.current.refresh()
      })
    }
  }, [layer])

  return <div style={{ height: 500 }}>
    {layer && <PieChart ref={chartRef} layer={layer} />}
  </div>
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)