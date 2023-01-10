import CodingStateMachine from "./codingstatemachine.js";
import CharSetProber from "./charsetprober.js";
import constants from "./constants.js";
import UTF8SMModel from "./mbcssm/utf8.js";
function UTF8Prober() {
    CharSetProber.apply(this);
    var ONE_CHAR_PROB = 0.5;
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(UTF8SMModel);
        self.reset();
    }
    this.reset = function () {
        UTF8Prober.prototype.reset.apply(this);
        this._mCodingSM.reset();
        this._mNumOfMBChar = 0;
        this._mMBCharLen = 0;
        this._mFullLen = 0;
        this._mBasicAsciiLen = 0;
    };
    this.getCharsetName = function () {
        return "UTF-8";
    };
    this.feed = function (aBuf) {
        this._mFullLen += aBuf.length;
        for (var i = 0, c; i < aBuf.length; i++) {
            c = aBuf[i];
            var codingState = this._mCodingSM.nextState(c);
            if (codingState == constants.error) {
                this._mState = constants.notMe;
                break;
            }
            else if (codingState == constants.itsMe) {
                this._mState = constants.foundIt;
                break;
            }
            else if (codingState == constants.start) {
                if (this._mCodingSM.getCurrentCharLen() >= 2) {
                    this._mNumOfMBChar++;
                    this._mMBCharLen += this._mCodingSM.getCurrentCharLen();
                }
                else if (c.charCodeAt(0) < 128) { // codes higher than 127 are extended ASCII
                    this._mBasicAsciiLen++;
                }
            }
        }
        if (this.getState() == constants.detecting) {
            if (this.getConfidence() > constants.SHORTCUT_THRESHOLD) {
                this._mState = constants.foundIt;
            }
        }
        return this.getState();
    };
    this.getConfidence = function () {
        var unlike = 0.99;
        var mbCharRatio = 0;
        var nonBasciAsciiLen = (this._mFullLen - this._mBasicAsciiLen);
        if (nonBasciAsciiLen > 0) {
            mbCharRatio = this._mMBCharLen / nonBasciAsciiLen;
        }
        if (this._mNumOfMBChar < 6 && mbCharRatio <= 0.6) {
            unlike *= Math.pow(ONE_CHAR_PROB, this._mNumOfMBChar);
            return 1 - unlike;
        }
        else {
            return unlike;
        }
    };
    init();
}
UTF8Prober.prototype = new CharSetProber();
export default UTF8Prober;
