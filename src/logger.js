export let log = function () {};
export let enabled = false;
export function setLogger(loggerFunction) {
  enabled = true;
  log = loggerFunction;
}
