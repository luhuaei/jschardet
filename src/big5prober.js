import CodingStateMachine from "./codingstatemachine.js";
import MultiByteCharSetProber from "./mbcharsetprober.js";
import Big5SMModel from "./mbcssm/big5.js";
import { Big5DistributionAnalysis as Big5DistributionAnalysis$0 } from "./chardistribution.js";
var Big5DistributionAnalysis = { Big5DistributionAnalysis: Big5DistributionAnalysis$0 }.Big5DistributionAnalysis;
function Big5Prober() {
    MultiByteCharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(Big5SMModel);
        self._mDistributionAnalyzer = new Big5DistributionAnalysis();
        self.reset();
    }
    this.getCharsetName = function () {
        return "Big5";
    };
    init();
}
Big5Prober.prototype = new MultiByteCharSetProber();
export default Big5Prober;
