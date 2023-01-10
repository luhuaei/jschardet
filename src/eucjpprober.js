import CodingStateMachine from "./codingstatemachine.js";
import MultiByteCharSetProber from "./mbcharsetprober.js";
import { EUCJPDistributionAnalysis as EUCJPDistributionAnalysis$0 } from "./chardistribution.js";
import { EUCJPContextAnalysis as EUCJPContextAnalysis$0 } from "./jpcntx.js";
import EUCJPSMModel from "./mbcssm/eucjp.js";
import constants from "./constants.js";
import * as logger from "./logger.js";
var EUCJPDistributionAnalysis = { EUCJPDistributionAnalysis: EUCJPDistributionAnalysis$0 }.EUCJPDistributionAnalysis;
var EUCJPContextAnalysis = { EUCJPContextAnalysis: EUCJPContextAnalysis$0 }.EUCJPContextAnalysis;
function EUCJPProber() {
    MultiByteCharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(EUCJPSMModel);
        self._mDistributionAnalyzer = new EUCJPDistributionAnalysis();
        self._mContextAnalyzer = new EUCJPContextAnalysis();
        self.reset();
    }
    this.reset = function () {
        EUCJPProber.prototype.reset.apply(this);
        this._mContextAnalyzer.reset();
    };
    this.getCharsetName = function () {
        return "EUC-JP";
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
                    var lastCharStr = this._mLastChar.join('');
                    this._mContextAnalyzer.feed(lastCharStr, charLen);
                    this._mDistributionAnalyzer.feed(lastCharStr, charLen);
                }
                else {
                    this._mContextAnalyzer.feed(aBuf.slice(i - 1, i + 1), charLen);
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
EUCJPProber.prototype = new MultiByteCharSetProber();
export default EUCJPProber;
