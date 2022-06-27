import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce 


// const useDebounce = (func: any, wait: number) => {
//   let timeout: NodeJS.Timeout | null;
//   return (...args: any) => {
//     const context = this; 
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       timeout = null;
//       func.apply(context, args);
//     }, wait);
//   }
// }

// export default useDebounce;