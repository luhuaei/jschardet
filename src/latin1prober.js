import CharSetProber from "./charsetprober.js";
import Constants from "./constants.js";
var UDF = 0; // undefined
var OTH = 1; // other
var ASC = 2; // ascii capital letter
var ASS = 3; // ascii small letter
var ACV = 4; // accent capital vowel
var ACO = 5; // accent capital other
var ASV = 6; // accent small vowel
var ASO = 7; // accent small other
var Latin1_CharToClass = [
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, ASC, ASC, ASC, ASC, ASC, ASC, ASC,
    ASC, ASC, ASC, ASC, ASC, ASC, ASC, ASC,
    ASC, ASC, ASC, ASC, ASC, ASC, ASC, ASC,
    ASC, ASC, ASC, OTH, OTH, OTH, OTH, OTH,
    OTH, ASS, ASS, ASS, ASS, ASS, ASS, ASS,
    ASS, ASS, ASS, ASS, ASS, ASS, ASS, ASS,
    ASS, ASS, ASS, ASS, ASS, ASS, ASS, ASS,
    ASS, ASS, ASS, OTH, OTH, OTH, OTH, OTH,
    OTH, UDF, OTH, ASO, OTH, OTH, OTH, OTH,
    OTH, OTH, ACO, OTH, ACO, UDF, ACO, UDF,
    UDF, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, ASO, OTH, ASO, UDF, ASO, ACO,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    OTH, OTH, OTH, OTH, OTH, OTH, OTH, OTH,
    ACV, ACV, ACV, ACV, ACV, ACV, ACO, ACO,
    ACV, ACV, ACV, ACV, ACV, ACV, ACV, ACV,
    ACO, ACO, ACV, ACV, ACV, ACV, ACV, OTH,
    ACV, ACV, ACV, ACV, ACV, ACO, ACO, ACO,
    ASV, ASV, ASV, ASV, ASV, ASV, ASO, ASO,
    ASV, ASV, ASV, ASV, ASV, ASV, ASV, ASV,
    ASO, ASO, ASV, ASV, ASV, ASV, ASV, OTH,
    ASV, ASV, ASV, ASV, ASV, ASO, ASO, ASO // F8 - FF
];
// 0 : illegal
// 1 : very unlikely
// 2 : normal
// 3 : very likely
var Latin1ClassModel = [
    // UDF OTH ASC ASS ACV ACO ASV ASO
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 3, 3, 3, 3, 3,
    0, 3, 3, 3, 3, 3, 3, 3,
    0, 3, 3, 3, 1, 1, 3, 3,
    0, 3, 3, 3, 1, 2, 1, 2,
    0, 3, 3, 3, 3, 3, 3, 3,
    0, 3, 1, 3, 1, 1, 1, 3,
    0, 3, 1, 3, 1, 1, 3, 3 // ASO
];
function Latin1Prober() {
    CharSetProber.apply(this);
    var FREQ_CAT_NUM = 4;
    var CLASS_NUM = 8; // total classes
    var self = this;
    function init() {
        self.reset();
    }
    this.reset = function () {
        this._mLastCharClass = OTH;
        this._mFreqCounter = [];
        for (var i = 0; i < FREQ_CAT_NUM; this._mFreqCounter[i++] = 0)
            ;
        Latin1Prober.prototype.reset.apply(this);
    };
    this.getCharsetName = function () {
        return "windows-1252";
    };
    this.getSupportedCharsetNames = function () {
        return [this.getCharsetName()];
    };
    this.feed = function (aBuf) {
        aBuf = this.filterWithEnglishLetters(aBuf);
        for (var i = 0; i < aBuf.length; i++) {
            var c = aBuf.charCodeAt(i);
            var charClass = Latin1_CharToClass[c];
            var freq = Latin1ClassModel[(this._mLastCharClass * CLASS_NUM) + charClass];
            if (freq == 0) {
                this._mState = Constants.notMe;
                break;
            }
            this._mFreqCounter[freq]++;
            this._mLastCharClass = charClass;
        }
        return this.getState();
    };
    this.getConfidence = function () {
        var confidence;
        var constants;
        if (this.getState() == Constants.notMe) {
            return 0.01;
        }
        var total = 0;
        for (var i = 0; i < this._mFreqCounter.length; i++) {
            total += this._mFreqCounter[i];
        }
        if (total < 0.01) {
            constants = 0.0;
        }
        else {
            confidence = (this._mFreqCounter[3] / total) - (this._mFreqCounter[1] * 20 / total);
        }
        if (confidence < 0) {
            confidence = 0.0;
        }
        // lower the confidence of latin1 so that other more accurate detector
        // can take priority.
        //
        // antonio.afonso: need to change this otherwise languages like pt, es, fr using latin1 will never be detected.
        confidence = confidence * 0.95;
        return confidence;
    };
    init();
}
Latin1Prober.prototype = new CharSetProber();
export default Latin1Prober;
