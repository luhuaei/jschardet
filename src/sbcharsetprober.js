import CharSetProber from "./charsetprober.js";
import constants from "./constants.js";
import * as logger from "./logger.js";
function SingleByteCharSetProber(model, reversed, nameProber) {
    CharSetProber.apply(this);
    var SAMPLE_SIZE = 64;
    var SB_ENOUGH_REL_THRESHOLD = 1024;
    var POSITIVE_SHORTCUT_THRESHOLD = 0.95;
    var NEGATIVE_SHORTCUT_THRESHOLD = 0.05;
    var SYMBOL_CAT_ORDER = 250;
    var NUMBER_OF_SEQ_CAT = 4;
    var POSITIVE_CAT = NUMBER_OF_SEQ_CAT - 1;
    //var NEGATIVE_CAT = 0;
    var self = this;
    function init(model, reversed, nameProber) {
        self._mModel = model;
        self._mReversed = reversed; // "true" if we need to reverse every pair in the model lookup
        self._mNameProber = nameProber; // Optional auxiliary prober for name decision
        self.reset();
    }
    this.reset = function () {
        SingleByteCharSetProber.prototype.reset.apply(this);
        this._mLastOrder = 255; // char order of last character
        this._mSeqCounters = [];
        for (var i = 0; i < NUMBER_OF_SEQ_CAT; this._mSeqCounters[i++] = 0)
            ;
        this._mTotalSeqs = 0;
        this._mTotalChar = 0;
        this._mFreqChar = 0; // characters that fall in our sampling range
    };
    this.getCharsetName = function () {
        if (this._mNameProber) {
            return this._mNameProber.getCharsetName();
        }
        else {
            return this._mModel.charsetName;
        }
    };
    this.feed = function (aBuf) {
        if (!this._mModel.keepEnglishLetter) {
            aBuf = this.filterWithoutEnglishLetters(aBuf);
        }
        var aLen = aBuf.length;
        if (!aLen) {
            return this.getState();
        }
        for (var i = 0, c; i < aLen; i++) {
            c = aBuf.charCodeAt(i);
            var order = this._mModel.charToOrderMap[c];
            if (order < SYMBOL_CAT_ORDER) {
                this._mTotalChar++;
            }
            if (order < SAMPLE_SIZE) {
                this._mFreqChar++;
                if (this._mLastOrder < SAMPLE_SIZE) {
                    this._mTotalSeqs++;
                    if (!this._mReversed) {
                        this._mSeqCounters[this._mModel.precedenceMatrix[(this._mLastOrder * SAMPLE_SIZE) + order]]++;
                    }
                    else { // reverse the order of the letters in the lookup
                        this._mSeqCounters[this._mModel.precedenceMatrix[(order * SAMPLE_SIZE) + this._mLastOrder]]++;
                    }
                }
            }
            this._mLastOrder = order;
        }
        if (this.getState() == constants.detecting) {
            if (self._mTotalSeqs > SB_ENOUGH_REL_THRESHOLD) {
                var cf = this.getConfidence();
                if (cf > POSITIVE_SHORTCUT_THRESHOLD) {
                    logger.log(this._mModel.charsetName + " confidence = " + cf + ", we have a winner\n");
                }
                else if (cf < NEGATIVE_SHORTCUT_THRESHOLD) {
                    logger.log(this._mModel.charsetName + " confidence = " + cf + ", below negative shortcut threshhold " + NEGATIVE_SHORTCUT_THRESHOLD + "\n");
                    this._mState = constants.notMe;
                }
            }
        }
        return this.getState();
    };
    this.getConfidence = function () {
        var r = 0.01;
        if (this._mTotalSeqs > 0) {
            //logger.log(this._mSeqCounters[POSITIVE_CAT] + " " + this._mTotalSeqs + " " + this._mModel.mTypicalPositiveRatio);
            r = (1.0 * this._mSeqCounters[POSITIVE_CAT]) / this._mTotalSeqs / this._mModel.mTypicalPositiveRatio;
            //logger.log(r + " " + this._mFreqChar + " " + this._mTotalChar);
            r *= this._mFreqChar / this._mTotalChar;
            if (r >= 1.0) {
                r = 0.99;
            }
        }
        return r;
    };
    reversed = reversed !== undefined ? reversed : false;
    nameProber = nameProber !== undefined ? nameProber : null;
    init(model, reversed, nameProber);
}
SingleByteCharSetProber.prototype = new CharSetProber();
export default SingleByteCharSetProber;
