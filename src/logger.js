export const log = function () { };
export function setLogger(loggerFunction) {
    exports.enabled = true;
    exports.log = loggerFunction;
}
