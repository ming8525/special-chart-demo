import React from "react"

const defaultOptions = {
  tag: 'div',
  mode: 'code',
  allowedModes: ['tree', 'code'],
  history: false,
  search: true,
  navigationBar: false,
  statusBar: false,
  sortObjectKeys: false,
}

export const JsonEditor = React.forwardRef((props, ref) => {
  const { defaultValue, disabled, onUpdate } = props
  const editorRef = React.useRef(null)


  React.useEffect(() => {
    const editor = new JSONEditor(editorRef.current, defaultOptions)
    ref.current = editor
    if (defaultValue) {
      editor.set(defaultValue)
    }
  }, [])

  return (<div style={{ width: '100%', height: '100%', position: 'relative' }} className="json-editor">
    <div style={{ width: '100%', height: '100%' }} ref={editorRef} />
    <button style={{ position: 'absolute', right: '20px', bottom: '10px' }} disabled={disabled} onClick={onUpdate}>Update</button>
  </div>)
})