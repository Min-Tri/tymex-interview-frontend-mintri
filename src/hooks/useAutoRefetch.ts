import { useEffect, useRef } from 'react';

interface UseAutoRefreshProps {
  callback: () => void;
  interval?: number;
  enabled?: boolean;
}

const useAutoRefresh = ({
  callback,
  interval = 60000,
  enabled = true
}: UseAutoRefreshProps) => {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (!enabled) return;
    
    const id = setInterval(() => {
      savedCallback.current();
    }, interval);
    
    return () => clearInterval(id);
  }, [interval, enabled]);
};

export default useAutoRefresh;