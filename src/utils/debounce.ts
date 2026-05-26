export function debounce<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  delay = 1000
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const result = fn(...args);

      if (result instanceof Promise) {
        result.catch((err) => {
          console.error(`Ошибка во время выполнения дебаунса: ${err}`);
        });
      }
    }, delay);
  };
}
