import { useState, useCallback, useEffect } from 'react';
import { useCallbackRef, useRefProxy, getDimensions } from './util';

function useResizeDetector({ skipOnMount = false, refreshMode, refreshRate = 1000, refreshOptions, handleWidth = true, handleHeight = true, targetRef, observerOptions, onResize } = {}) {
    // If `skipOnMount` is enabled, skip the first resize event
    // Wrap the `onResize` callback with a ref to avoid re-renders
    const onResizeRef = useCallbackRef(onResize);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    });
    // Create a proxy ref to handle conditional rendering and dynamic ref changes of the target element
    const { refElement } = useRefProxy(targetRef);
    const { box } = observerOptions || {};
    const resizeCallback = useCallback((entries) => {
        entries.forEach(entry => {
            const dimensions = getDimensions(entry, box);

          //   onResizeRef({
          //     width: dimensions.width,
          //     height: dimensions.height,
          //     entry
          // });
            setSize(prevSize => {
                onResizeRef({
                    width: dimensions.width,
                    height: dimensions.height,
                    entry
                });
                return dimensions;
            });
        });
    }, [handleWidth, handleHeight, box]);

    // Attach ResizeObserver to the element
    useEffect(() => {
        let resizeObserver;
        if (refElement) {
            resizeObserver = new window.ResizeObserver(resizeCallback);
            resizeObserver.observe(refElement, observerOptions);
        }
    }, [refElement, resizeCallback]);
    return null;
}

export { useResizeDetector as default };