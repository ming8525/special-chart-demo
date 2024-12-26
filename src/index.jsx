import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import useResizeDetector from './react-resize';
import './style.css'

const ReactResizeDetector = (props) => {
  const { onResize, targetRef, refreshMode = 'debounce', refreshRate = 200, handleWidth = true, handleHeight } = props
  const ref = React.useRef()

  useResizeDetector({ onResize, targetRef, refreshMode, refreshRate, handleWidth, handleHeight })

  return <div ref={ref} className='w-100 h-100'>1232</div>
}

const Root = (props) => {
  const ref = React.useRef()
  const [width, setWidth] = React.useState('')

  const onResize = ({ width }) => {
    setWidth(width)
  }

  return (<div ref={ref} className='border' style={{ height: '300px', width: '100%' }}> 
    {width}
    <ReactResizeDetector onResize={onResize} targetRef={ref} />
  </div>)
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(<Root />)
