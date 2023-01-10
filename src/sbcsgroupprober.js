import SingleByteCharSetProber from "./sbcharsetprober.js";
import CharSetGroupProber from "./charsetgroupprober.js";
import { Win1255HebrewModel as Win1255HebrewModel$0 } from "./langhebrewmodel.js";
import HebrewProber from "./hebrewprober.js";
import * as cyrillicModels from "./langcyrillicmodel.js";
import * as greekModels from "./langgreekmodel.js";
import { TIS620ThaiModel as TIS620ThaiModel$0 } from "./langthaimodel.js";
import * as hungarianModels from "./langhungarianmodel.js";
import * as bulgarianModels from "./langbulgarianmodel.js";
var Win1255HebrewModel = { Win1255HebrewModel: Win1255HebrewModel$0 }.Win1255HebrewModel;
var TIS620ThaiModel = { TIS620ThaiModel: TIS620ThaiModel$0 }.TIS620ThaiModel;
function SBCSGroupProber() {
    CharSetGroupProber.apply(this);
    var self = this;
    function init() {
        self._mProbers = [
            new SingleByteCharSetProber(cyrillicModels.Win1251CyrillicModel),
            new SingleByteCharSetProber(cyrillicModels.Koi8rModel),
            new SingleByteCharSetProber(cyrillicModels.Latin5CyrillicModel),
            new SingleByteCharSetProber(cyrillicModels.MacCyrillicModel),
            new SingleByteCharSetProber(cyrillicModels.Ibm866Model),
            new SingleByteCharSetProber(cyrillicModels.Ibm855Model),
            new SingleByteCharSetProber(greekModels.Latin7GreekModel),
            new SingleByteCharSetProber(greekModels.Win1253GreekModel),
            new SingleByteCharSetProber(bulgarianModels.Latin5BulgarianModel),
            new SingleByteCharSetProber(bulgarianModels.Win1251BulgarianModel),
            new SingleByteCharSetProber(hungarianModels.Latin2HungarianModel),
            new SingleByteCharSetProber(hungarianModels.Win1250HungarianModel),
            new SingleByteCharSetProber(TIS620ThaiModel)
        ];
        var hebrewProber = new HebrewProber();
        var logicalHebrewProber = new SingleByteCharSetProber(Win1255HebrewModel, false, hebrewProber);
        var visualHebrewProber = new SingleByteCharSetProber(Win1255HebrewModel, true, hebrewProber);
        hebrewProber.setModelProbers(logicalHebrewProber, visualHebrewProber);
        self._mProbers.push(hebrewProber, logicalHebrewProber, visualHebrewProber);
        self._supportedCharsetNames = [];
        for (const prober of self._mProbers) {
            self._supportedCharsetNames.push(prober.getCharsetName());
        }
        self.reset();
    }
    this.getSupportedCharsetNames = function () {
        return self._supportedCharsetNames;
    };
    init();
}
SBCSGroupProber.prototype = new CharSetGroupProber();
export default SBCSGroupProber;
