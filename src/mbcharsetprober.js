import CharSetProber from "./charsetprober.js";
import constants from "./constants.js";
import * as logger from "./logger.js";
function MultiByteCharSetProber() {
    CharSetProber.apply(this);
    var self = this;
    function init() {
        self._mDistributionAnalyzer = null;
        self._mCodingSM = null;
        self._mLastChar = ["\x00", "\x00"];
    }
    this.reset = function () {
        MultiByteCharSetProber.prototype.reset.apply(this);
        if (this._mCodingSM) {
            this._mCodingSM.reset();
        }
        if (this._mDistributionAnalyzer) {
            this._mDistributionAnalyzer.reset();
        }
        this._mLastChar = ["\x00", "\x00"];
    };
    this.getCharsetName = function () {
    };
    this.feed = function (aBuf) {
        var aLen = aBuf.length;
        for (var i = 0; i < aLen; i++) {
            var codingState = this._mCodingSM.nextState(aBuf[i]);
            if (codingState == constants.error) {
                logger.log(this.getCharsetName() + " prober hit error at byte " + i + "\n");
                this._mState = constants.notMe;
                break;
            }
            else if (codingState == constants.itsMe) {
                this._mState = constants.foundIt;
                break;
            }
            else if (codingState == constants.start) {
                var charLen = this._mCodingSM.getCurrentCharLen();
                if (i == 0) {
                    this._mLastChar[1] = aBuf[0];
                    this._mDistributionAnalyzer.feed(this._mLastChar.join(''), charLen);
                }
                else {
                    this._mDistributionAnalyzer.feed(aBuf.slice(i - 1, i + 1), charLen);
                }
            }
        }
        this._mLastChar[0] = aBuf[aLen - 1];
        if (this.getState() == constants.detecting) {
            if (this._mDistributionAnalyzer.gotEnoughData() &&
                this.getConfidence() > constants.SHORTCUT_THRESHOLD) {
                this._mState = constants.foundIt;
            }
        }
        return this.getState();
    };
    this.getConfidence = function () {
        return this._mDistributionAnalyzer.getConfidence();
    };
}
MultiByteCharSetProber.prototype = new CharSetProber();
export default MultiByteCharSetProber;
