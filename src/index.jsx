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

const Root = () => {
  return <ArcgisChartsBarChart config={config} />
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
