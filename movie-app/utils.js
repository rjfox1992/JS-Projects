const debounce = (callback, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // Apply calls function passes all args as separate obj
      callback.apply(null, args);
    }, delay);
  };
};
