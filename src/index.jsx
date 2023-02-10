import React from 'react';
import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import configs from './config.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const config = configs.config
const inlineData = configs.inlineData

const newSlices = [
  {
    sliceId: 'District',
    fillSymbol: {
      type: 'esriSFS',
      style: 'esriSFSSolid',
      color: [
        214,
        85,
        139,
        255
      ],
      outline: {
        type: 'esriSLS',
        style: 'esriSLSSolid',
        color: [
          240,
          240,
          240,
          255
        ],
        width: 1
      }
    }
  },
  {
    sliceId: 'Ward',
    fillSymbol: {
      type: 'esriSFS',
      style: 'esriSFSSolid',
      color: [
        119,
        180,
        132,
        255
      ],
      outline: {
        type: 'esriSLS',
        style: 'esriSLSSolid',
        color: [
          240,
          240,
          240,
          255
        ],
        width: 1
      }
    }
  },
  {
    sliceId: 'Community',
    fillSymbol: {
      type: 'esriSFS',
      style: 'esriSFSSolid',
      color: [
        223,
        107,
        53,
        255
      ],
      outline: {
        type: 'esriSLS',
        style: 'esriSLSSolid',
        color: [
          240,
          240,
          240,
          255
        ],
        width: 1
      }
    }
  }
]

const defaultSelectionData = {
  selectionIndexes: new Map([['indexesToSelect', []]])
}

const Root = (props) => {
  const {
    returnSelectionIndexes = true,
    returnSelectionOIDs = false
  } = props

  const ref = React.useRef(null)

  React.useEffect(() => {
    ref.current.config = config
    ref.current.inlineData = inlineData
    ref.current.selectionData = defaultSelectionData
  }, [])


  const handleUpdateSlicesColor = () => {
    const newConfig = {
      ...config,
      series: [{
        ...config.series[0],
        slices: newSlices
      }]
    }
    ref.current.config = newConfig
    ref.current.inlineData = inlineData
  }



  return <div style={{ height: 400 }}>
    <arcgis-charts-pie-chart ref={ref} />
    <button onClick={handleUpdateSlicesColor}>Update slice color</button>
  </div>
}

ReactDOM.render(<Root />, document.getElementById('root'));