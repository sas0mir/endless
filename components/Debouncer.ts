const debouncer = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number = 300,
) => {
  let timeoutTimer: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
    timeoutTimer = setTimeout(() => {
      callback(...args);
      timeoutTimer = null;
    }, delay);
  };
}


export default debouncer;
