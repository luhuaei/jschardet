import CodingStateMachine from "./codingstatemachine.js";
import MultiByteCharSetProber from "./mbcharsetprober.js";
import { EUCKRDistributionAnalysis as EUCKRDistributionAnalysis$0 } from "./chardistribution.js";
import EUCKRSMModel from "./mbcssm/euckr.js";
var EUCKRDistributionAnalysis = { EUCKRDistributionAnalysis: EUCKRDistributionAnalysis$0 }.EUCKRDistributionAnalysis;
function EUCKRProber() {
    MultiByteCharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(EUCKRSMModel);
        self._mDistributionAnalyzer = new EUCKRDistributionAnalysis();
        self.reset();
    }
    this.getCharsetName = function () {
        return "EUC-KR";
    };
    init();
}
EUCKRProber.prototype = new MultiByteCharSetProber();
export default EUCKRProber;
