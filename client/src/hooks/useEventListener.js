import { useEffect, useRef } from "react";

export default function useEventListener(
  eventType,
  callback,
  targetElement = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e) => callbackRef.current(e);
    targetElement.addEventListener(eventType, handler);

    return () => targetElement.removeEventListener(eventType, handler);
  }, [eventType, targetElement]);
}
