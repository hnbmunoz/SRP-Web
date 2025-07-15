import { useState, useEffect } from 'react';
 
const useDebounceHook = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
 
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
 
  return debouncedValue;
};

export default useDebounceHook