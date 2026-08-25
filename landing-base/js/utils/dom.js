export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export function on(element, eventName, handler, options) {
  if (!element) return () => {};
  element.addEventListener(eventName, handler, options);
  return () => element.removeEventListener(eventName, handler, options);
}
