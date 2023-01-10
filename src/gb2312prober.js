import MultiByteCharSetProber from "./mbcharsetprober.js";
import CodingStateMachine from "./codingstatemachine.js";
import GB2312SMModel from "./mbcssm/gb2312.js";
import { GB2312DistributionAnalysis as GB2312DistributionAnalysis$0 } from "./chardistribution.js";
var GB2312DistributionAnalysis = { GB2312DistributionAnalysis: GB2312DistributionAnalysis$0 }.GB2312DistributionAnalysis;
function GB2312Prober() {
    MultiByteCharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = new CodingStateMachine(GB2312SMModel);
        self._mDistributionAnalyzer = new GB2312DistributionAnalysis();
        self.reset();
    }
    this.getCharsetName = function () {
        return "GB2312";
    };
    init();
}
GB2312Prober.prototype = new MultiByteCharSetProber();
export default GB2312Prober;
