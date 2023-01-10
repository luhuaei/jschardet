import CharSetProber from "./charsetprober.js";
import constants from "./constants.js";
// https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array/IndexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
function HebrewProber() {
    CharSetProber.apply(this);
    // windows-1255 / ISO-8859-8 code points of interest
    var FINAL_KAF = '\xea';
    var NORMAL_KAF = '\xeb';
    var FINAL_MEM = '\xed';
    var NORMAL_MEM = '\xee';
    var FINAL_NUN = '\xef';
    var NORMAL_NUN = '\xf0';
    var FINAL_PE = '\xf3';
    var NORMAL_PE = '\xf4';
    var FINAL_TSADI = '\xf5';
    var NORMAL_TSADI = '\xf6';
    // Minimum Visual vs Logical final letter score difference.
    // If the difference is below this, don't rely solely on the final letter score distance.
    var MIN_FINAL_CHAR_DISTANCE = 5;
    // Minimum Visual vs Logical model score difference.
    // If the difference is below this, don't rely at all on the model score distance.
    var MIN_MODEL_DISTANCE = 0.01;
    var VISUAL_HEBREW_NAME = "ISO-8859-8";
    var LOGICAL_HEBREW_NAME = "windows-1255";
    var self = this;
    function init() {
        self._mLogicalProber = null;
        self._mVisualProber = null;
        self.reset();
    }
    this.reset = function () {
        this._mFinalCharLogicalScore = 0;
        this._mFinalCharVisualScore = 0;
        // The two last characters seen in the previous buffer,
        // mPrev and mBeforePrev are initialized to space in order to simulate a word
        // delimiter at the beginning of the data
        this._mPrev = " ";
        this._mBeforePrev = " ";
        // These probers are owned by the group prober.
    };
    this.setModelProbers = function (logicalProber, visualProber) {
        this._mLogicalProber = logicalProber;
        this._mVisualProber = visualProber;
    };
    this.isFinal = function (c) {
        return [FINAL_KAF, FINAL_MEM, FINAL_NUN, FINAL_PE, FINAL_TSADI].indexOf(c) != -1;
    };
    this.isNonFinal = function (c) {
        // The normal Tsadi is not a good Non-Final letter due to words like
        // 'lechotet' (to chat) containing an apostrophe after the tsadi. This
        // apostrophe is converted to a space in FilterWithoutEnglishLetters causing
        // the Non-Final tsadi to appear at an end of a word even though this is not
        // the case in the original text.
        // The letters Pe and Kaf rarely display a related behavior of not being a
        // good Non-Final letter. Words like 'Pop', 'Winamp' and 'Mubarak' for
        // example legally end with a Non-Final Pe or Kaf. However, the benefit of
        // these letters as Non-Final letters outweighs the damage since these words
        // are quite rare.
        return [NORMAL_KAF, NORMAL_MEM, NORMAL_NUN, NORMAL_PE].indexOf(c) != -1;
    };
    this.feed = function (aBuf) {
        // Final letter analysis for logical-visual decision.
        // Look for evidence that the received buffer is either logical Hebrew or
        // visual Hebrew.
        // The following cases are checked:
        // 1) A word longer than 1 letter, ending with a final letter. This is an
        //    indication that the text is laid out "naturally" since the final letter
        //    really appears at the end. +1 for logical score.
        // 2) A word longer than 1 letter, ending with a Non-Final letter. In normal
        //    Hebrew, words ending with Kaf, Mem, Nun, Pe or Tsadi, should not end with
        //    the Non-Final form of that letter. Exceptions to this rule are mentioned
        //    above in isNonFinal(). This is an indication that the text is laid out
        //    backwards. +1 for visual score
        // 3) A word longer than 1 letter, starting with a final letter. Final letters
        //    should not appear at the beginning of a word. This is an indication that
        //    the text is laid out backwards. +1 for visual score.
        //
        // The visual score and logical score are accumulated throughout the text and
        // are finally checked against each other in GetCharSetName().
        // No checking for final letters in the middle of words is done since that case
        // is not an indication for either Logical or Visual text.
        //
        // We automatically filter out all 7-bit characters (replace them with spaces)
        // so the word boundary detection works properly. [MAP]
        if (this.getState() == constants.notMe) {
            // Both model probers say it's not them. No reason to continue.
            return constants.notMe;
        }
        aBuf = this.filterHighBitOnly(aBuf);
        for (var i = 0, cur; i < aBuf.length; i++) {
            cur = aBuf[i];
            if (cur == " ") {
                // We stand on a space - a word just ended
                if (this._mBeforePrev != " ") {
                    // next-to-last char was not a space so self._mPrev is not a 1 letter word
                    if (this.isFinal(this._mPrev)) {
                        // case (1) [-2:not space][-1:final letter][cur:space]
                        this._mFinalCharLogicalScore++;
                    }
                    else if (this.isNonFinal(this._mPrev)) {
                        // case (2) [-2:not space][-1:Non-Final letter][cur:space]
                        this._mFinalCharVisualScore++;
                    }
                }
            }
            else {
                // Not standing on a space
                if (this._mBeforePrev == " " && this.isFinal(this._mPrev) && cur != " ") {
                    // case (3) [-2:space][-1:final letter][cur:not space]
                    this._mFinalCharVisualScore++;
                }
            }
            this._mBeforePrev = this._mPrev;
            this._mPrev = cur;
        }
        // Forever detecting, till the end or until both model probers return eNotMe (handled above)
        return constants.detecting;
    };
    this.getCharsetName = function () {
        // Make the decision: is it Logical or Visual?
        // If the final letter score distance is dominant enough, rely on it.
        var finalsub = this._mFinalCharLogicalScore - this._mFinalCharVisualScore;
        if (finalsub >= MIN_FINAL_CHAR_DISTANCE) {
            return LOGICAL_HEBREW_NAME;
        }
        if (finalsub <= -MIN_FINAL_CHAR_DISTANCE) {
            return VISUAL_HEBREW_NAME;
        }
        // It's not dominant enough, try to rely on the model scores instead.
        var modelsub = this._mLogicalProber.getConfidence() - this._mVisualProber.getConfidence();
        if (modelsub > MIN_MODEL_DISTANCE) {
            return LOGICAL_HEBREW_NAME;
        }
        if (modelsub < -MIN_MODEL_DISTANCE) {
            return VISUAL_HEBREW_NAME;
        }
        // Still no good, back to final letter distance, maybe it'll save the day.
        if (finalsub < 0) {
            return VISUAL_HEBREW_NAME;
        }
        // (finalsub > 0 - Logical) or (don't know what to do) default to Logical.
        return LOGICAL_HEBREW_NAME;
    };
    this.getState = function () {
        // Remain active as long as any of the model probers are active.
        if (this._mLogicalProber.getState() == constants.notMe &&
            this._mVisualProber.getState() == constants.notMe) {
            return constants.notMe;
        }
        return constants.detecting;
    };
    init();
}
HebrewProber.prototype = new CharSetProber();
export default HebrewProber;
