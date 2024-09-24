import React from 'react';

const ResizableDiv = ({ children }) => {
  const resizableRef = React.useRef(null);
  const isResizingRef = React.useRef(false);
  const startWidthRef = React.useRef(0);
  const startHeightRef = React.useRef(0);
  const startXRef = React.useRef(0);
  const startYRef = React.useRef(0);

  const initResize = (e) => {
    isResizingRef.current = true
    startWidthRef.current = resizableRef.current.offsetWidth
    startHeightRef.current = resizableRef.current.offsetHeight
    startXRef.current = e.clientX
    startYRef.current = e.clientY

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  };

  const resize = (e) => {
    if (isResizingRef.current) {
      const newWidth = startWidthRef.current + (e.clientX - startXRef.current);
      const newHeight = startHeightRef.current + (e.clientY - startYRef.current);
      resizableRef.current.style.width = `${newWidth}px`;
      resizableRef.current.style.height = `${newHeight}px`;
    }
  };

  const stopResize = () => {
    isResizingRef.current = false
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  };

  return (
    <div className="resizable border" ref={resizableRef}>
      {children}
      <div className="resizer" onMouseDown={initResize}></div>
    </div>
  );
};

export default ResizableDiv;
