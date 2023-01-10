import CharSetGroupProber from "./charsetgroupprober.js";
import Big5Prober from "./big5prober.js";
import UTF8Prober from "./utf8prober.js";
import SJISProber from "./sjisprober.js";
import EUCJPProber from "./eucjpprober.js";
import GB2312Prober from "./gb2312prober.js";
import EUCKRProber from "./euckrprober.js";
import EUCTWProber from "./euctwprober.js";
function MBCSGroupProber() {
    CharSetGroupProber.apply(this);
    this._mProbers = [
        new UTF8Prober(),
        new SJISProber(),
        new EUCJPProber(),
        new GB2312Prober(),
        new EUCKRProber(),
        new Big5Prober(),
        new EUCTWProber()
    ];
    const supportedCharsetNames = (function () {
        const charsetNames = [];
        for (const prober of this._mProbers) {
            charsetNames.push(prober.getCharsetName());
        }
        return charsetNames;
    });
    this.getSupportedCharsetNames = function () {
        return supportedCharsetNames;
    };
    this.reset();
}
MBCSGroupProber.prototype = new CharSetGroupProber();
export default MBCSGroupProber;
