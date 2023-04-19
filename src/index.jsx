import React from 'react';
import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

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

const ChartLimits = {"behaviorAfterLimit":"reject","maxBarUniqueSeriesCountTotal":10000,"maxBarTwoSeriesCountPerSeries":1000,"maxBarTwoSeriesCountTotal":2000,"maxBarThreePlusSeriesCountPerSeries":100,"maxBarThreePlusSeriesCountTotal":2000,"maxScatterPointsBeforeAggregation":10000,"maxScatterPointsAfterAggregation":10000,"maxLineChartMarkersCountTotal":10000,"maxLineChartSeriesCount":100,"maxPieChartSliceCountTotal":300}

const ServiceURL = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3'

const Root = (props) => {
  const ref = React.useRef(null)
  const [featureLayer, setFeatureLayer] = React.useState(null)

  React.useEffect(() => {
    const featureLayer = createFeatureLayer(ServiceURL)
    setFeatureLayer(featureLayer)
  }, [])

  const arcgisChartsDataProcessComplete = React.useCallback((event) => {
    console.log('arcgisChartsDataProcessComplete', event.detail)
  }, [])

  const arcgisChartsDataProcessError = React.useCallback((event) => {
    console.log('arcgisChartsDataProcessError')
  }, [])

  const arcgisChartsSelectionComplete = React.useCallback((event) => {
    console.log('arcgisChartsSelectionComplete', event.detail)
  }, [])


  React.useEffect(() => {
    if(ref.current && featureLayer) {
      ref.current.config = config
      ref.current.layer = featureLayer
      ref.current.returnSelectionIndexes = true
      ref.current.returnSelectionOIDs = false
      ref.current.queueChartCreation = true
      ref.current.autoDisposeChart = true
      ref.current.enableResponsiveFeatures = false
      ref.current.useAnimatedCharts = false
      ref.current.chartLimits = ChartLimits

      ref.current.selectionData = { selectionIndexes: undefined }
    }
  }, [featureLayer])

  useRegisterEvent(ref, 'arcgisChartsDataProcessComplete', arcgisChartsDataProcessComplete)
  useRegisterEvent(ref, 'arcgisChartsDataProcessError', arcgisChartsDataProcessError)
  useRegisterEvent(ref, 'arcgisChartsSelectionComplete', arcgisChartsSelectionComplete)

  return <div style={{ height: 400 }}>
    <arcgis-charts-pie-chart ref={ref} />
  </div>
}

ReactDOM.render(<Root />, document.getElementById('root'));