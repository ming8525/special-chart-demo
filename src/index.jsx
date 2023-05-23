import React from 'react';
import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'
import config from './config.json'
import './style.css';

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})


const Root = (props) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if(ref.current) {
      ref.current.config = config
    }
  }, [])

  return <div style={{ height: 400 }}>
    <arcgis-charts-pie-chart ref={ref} />
  </div>
}

ReactDOM.render(<Root />, document.getElementById('root'));