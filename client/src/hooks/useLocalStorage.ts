import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState(() => {
    try {
      let item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setItem = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (e) {
      setState(initialValue);
    }
  };

  return [state, setItem] as const;
}

export default useLocalStorage;
