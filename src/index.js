import UniversalDetector from "./universaldetector.js";
import { setLogger as setLogger$0 } from "./logger.js";
var setLogger = { setLogger: setLogger$0 }.setLogger;
function runUniversalDetector(buffer, options) {
    var u = new UniversalDetector(options);
    u.reset();
    if (typeof Buffer == 'function' && buffer instanceof Buffer) {
        u.feed(buffer.toString('binary'));
    }
    else {
        u.feed(buffer);
    }
    u.close();
    return u;
}
export const detect = function (buffer, options) {
    var u = runUniversalDetector(buffer, options);
    return u.result;
};
export const detectAll = function (buffer, options) {
    var u = runUniversalDetector(buffer, options);
    return u.results;
};
export const enableDebug = function () {
    setLogger(console.log.bind(console));
};
export { UniversalDetector };
