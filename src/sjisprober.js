import CodingStateMachine from "./codingstatemachine.js";
import MultiByteCharSetProber from "./mbcharsetprober.js";
import SJISSMModel from "./mbcssm/sjis.js";
import { SJISDistributionAnalysis as SJISDistributionAnalysis$0 } from "./chardistribution.js";
import { SJISContextAnalysis as SJISContextAnalysis$0 } from "./jpcntx.js";
import constants from "./constants.js";
import * as logger from "./logger.js";
var SJISDistributionAnalysis = { SJISDistributionAnalysis: SJISDistributionAnalysis$0 }.SJISDistributionAnalysis;
var SJISContextAnalysis = { SJISContextAnalysis: SJISContextAnalysis$0 }.SJISContextAnalysis;
function SJISProber() {
    MultiByteCharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(SJISSMModel);
        self._mDistributionAnalyzer = new SJISDistributionAnalysis();
        self._mContextAnalyzer = new SJISContextAnalysis();
        self.reset();
    }
    this.reset = function () {
        SJISProber.prototype.reset.apply(this);
        this._mContextAnalyzer.reset();
    };
    this.getCharsetName = function () {
        return "SHIFT_JIS";
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
                    this._mContextAnalyzer.feed(this._mLastChar.slice(2 - charLen).join(''), charLen);
                    this._mDistributionAnalyzer.feed(this._mLastChar.join(''), charLen);
                }
                else {
                    this._mContextAnalyzer.feed(aBuf.slice(i + 1 - charLen, i + 3 - charLen), charLen);
                    this._mDistributionAnalyzer.feed(aBuf.slice(i - 1, i + 1), charLen);
                }
            }
        }
        this._mLastChar[0] = aBuf[aLen - 1];
        if (this.getState() == constants.detecting) {
            if (this._mContextAnalyzer.gotEnoughData() &&
                this.getConfidence() > constants.SHORTCUT_THRESHOLD) {
                this._mState = constants.foundIt;
            }
        }
        return this.getState();
    };
    this.getConfidence = function () {
        var contxtCf = this._mContextAnalyzer.getConfidence();
        var distribCf = this._mDistributionAnalyzer.getConfidence();
        return Math.max(contxtCf, distribCf);
    };
    init();
}
SJISProber.prototype = new MultiByteCharSetProber();
export default SJISProber;
