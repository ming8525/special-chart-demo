import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import defaultConfig from './config.json'
import lodash from 'lodash'
import './style.css'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const Root = (props) => {
  const chartRef = React.useRef()
  const [config, setConfig] = React.useState(defaultConfig)

  React.useEffect(() => {
    chartRef.current.config = config
  }, [config])

  const handleClick = () => {
    const isASC = config.series[0].query.orderByFields[0].includes('ASC')
    const orderByFields = [`Year ${isASC ? 'DESC' : 'ASC'}`]
    const newConfig = lodash.set(config, 'series[0].query.orderByFields', orderByFields)
    setConfig(lodash.cloneDeep(newConfig))
  }

  return (
    <div className='d-flex'>
      <div
        style={{ height: 600, width: 600 }}
        className='border'
      >
        <arcgis-charts-bar-chart ref={chartRef} />
      </div>
      <button onClick={handleClick}>{config.series[0].query.orderByFields[0]}</button>
    </div>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Root />)
