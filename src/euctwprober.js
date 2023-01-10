import CodingStateMachine from "./codingstatemachine.js";
import MultiByteCharSetProber from "./mbcharsetprober.js";
import { EUCTWDistributionAnalysis as EUCTWDistributionAnalysis$0 } from "./chardistribution.js";
import EUCTWSMModel from "./mbcssm/euctw.js";
var EUCTWDistributionAnalysis = { EUCTWDistributionAnalysis: EUCTWDistributionAnalysis$0 }.EUCTWDistributionAnalysis;
function EUCTWProber() {
    MultiByteCharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(EUCTWSMModel);
        self._mDistributionAnalyzer = new EUCTWDistributionAnalysis();
        self.reset();
    }
    this.getCharsetName = function () {
        return "EUC-TW";
    };
    init();
}
EUCTWProber.prototype = new MultiByteCharSetProber();
export default EUCTWProber;
