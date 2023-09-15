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

const getAllSelectionIndexes = (selectionIndexes) => {
  let indexs = []
  selectionIndexes?.forEach((serie) => {
    indexs = indexs.concat(serie.indexesToSelect)
  })
  return Array.from(new Set(indexs.sort()))
}

const Root = (props) => {
  const ref = React.useRef()
  const [records, setRecords] = React.useState([])
  const [selectedRecords, setSelectedRecords] = React.useState([])
  const recordsRef = React.useRef(records)
  recordsRef.current = records


  const handleDataProcessComplete = React.useCallback((e) => {
    const dataItems = e.detail.dataItems
    const records = dataItems.map((dataItem, index) => ({ id: index, label: dataItem.ZONING, value: dataItem.PERCENTAGE_sum }))
    setRecords(records)
  }, [])

  const handleSelectionChange = React.useCallback((e) => {
    // Only trigger selection change message if selection source is from the user operation
    const selectionByUser =
    e.detail.selectionSource === 'SelectionByClickOrRange' ||
    e.detail.selectionSource === 'ClearSelection'

    if (!selectionByUser) return

    const selectedIndexs = getAllSelectionIndexes(e.detail.selectionIndexes) ?? []
    let sRecords = []
    if (selectedIndexs?.length) {
      sRecords = recordsRef.current.filter(record => {
        const id = record.id
        return selectedIndexs.includes(id)
      })
    }
    setSelectedRecords(sRecords)
  }, [])

  React.useEffect(() => {
    const layer = createFeatureLayer(config.service)
    layer.load().then(() => {
      const webChart = config.webChart
      ref.current.config = webChart
      ref.current.layer = layer
      ref.current.returnSelectionIndexes = true
      ref.current.returnSelectionOIDs = false
    })
  }, [])

  useRegisterEvent(ref, 'arcgisChartsDataProcessComplete', handleDataProcessComplete)
  useRegisterEvent(ref, 'arcgisChartsSelectionComplete', handleSelectionChange)

  return (
    <div className='root d-flex w-100'>
      <div className='w-50 h-100 border'>
        <arcgis-charts-pie-chart ref={ref} />
      </div>
      <div className='d-flex flex-column w-50 h-100 border'>{
        records.map(({ id, label, value }) => {
          return <div key={id} className={`d-flex py-1 px-3 w-100 record ${selectedRecords.find(r => r.id === id) ? 'selected' : ''}`}>
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
