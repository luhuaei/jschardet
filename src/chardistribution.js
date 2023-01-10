import * as jisfreq from "./jisfreq.js";
import * as euctwfreq from "./euctwfreq.js";
import * as euckrfreq from "./euckrfreq.js";
import * as gb2312freq from "./gb2312freq.js";
import * as big5freq from "./big5freq.js";
function CharDistributionAnalysis() {
    var ENOUGH_DATA_THRESHOLD = 1024;
    var SURE_YES = 0.99;
    var SURE_NO = 0.01;
    var MINIMUM_DATA_THRESHOLD = 3;
    var self = this;
    function init() {
        self._mCharToFreqOrder = null; // Mapping table to get frequency order from char order (get from GetOrder())
        self._mTableSize = null; // Size of above table
        self._mTypicalDistributionRatio = null; // This is a constant value which varies from language to language, used in calculating confidence.  See http://www.mozilla.org/projects/intl/UniversalCharsetDetection.html for further detail.
        self.reset();
    }
    /**
     * reset analyser, clear any state
     */
    this.reset = function () {
        this._mDone = false; // If this flag is set to constants.True, detection is done and conclusion has been made
        this._mTotalChars = 0; // Total characters encountered
        this._mFreqChars = 0; // The number of characters whose frequency order is less than 512
    };
    /**
     * feed a character with known length
     */
    this.feed = function (aStr, aCharLen) {
        if (aCharLen == 2) {
            // we only care about 2-bytes character in our distribution analysis
            var order = this.getOrder(aStr);
        }
        else {
            order = -1;
        }
        if (order >= 0) {
            this._mTotalChars++;
            // order is valid
            if (order < this._mTableSize) {
                if (512 > this._mCharToFreqOrder[order]) {
                    this._mFreqChars++;
                }
            }
        }
    };
    /**
     * return confidence based on existing data
     */
    this.getConfidence = function () {
        // if we didn't receive any character in our consideration range, return negative answer
        if (this._mTotalChars <= 0 || this._mFreqChars <= MINIMUM_DATA_THRESHOLD) {
            return SURE_NO;
        }
        if (this._mTotalChars != this._mFreqChars) {
            var r = this._mFreqChars / ((this._mTotalChars - this._mFreqChars) * this._mTypicalDistributionRatio);
            if (r < SURE_YES) {
                return r;
            }
        }
        // normalize confidence (we don't want to be 100% sure)
        return SURE_YES;
    };
    this.gotEnoughData = function () {
        // It is not necessary to receive all data to draw conclusion. For charset detection,
        // certain amount of data is enough
        return this._mTotalChars > ENOUGH_DATA_THRESHOLD;
    };
    this.getOrder = function (aStr) {
        // We do not handle characters based on the original encoding string, but
        // convert this encoding string to a number, here called order.
        // This allows multiple encodings of a language to share one frequency table.
        return -1;
    };
    init();
}
function EUCTWDistributionAnalysis() {
    CharDistributionAnalysis.apply(this);
    var self = this;
    function init() {
        self._mCharToFreqOrder = euctwfreq.EUCTWCharToFreqOrder;
        self._mTableSize = euctwfreq.EUCTW_TABLE_SIZE;
        self._mTypicalDistributionRatio = euctwfreq.EUCTW_TYPICAL_DISTRIBUTION_RATIO;
    }
    this.getOrder = function (aStr) {
        // for euc-TW encoding, we are interested
        //   first  byte range: 0xc4 -- 0xfe
        //   second byte range: 0xa1 -- 0xfe
        // no validation needed here. State machine has done that
        if (aStr.charCodeAt(0) >= 0xC4) {
            return 94 * (aStr.charCodeAt(0) - 0xC4) + aStr.charCodeAt(1) - 0xA1;
        }
        else {
            return -1;
        }
    };
    init();
}
EUCTWDistributionAnalysis.prototype = new CharDistributionAnalysis();
function EUCKRDistributionAnalysis() {
    CharDistributionAnalysis.apply(this);
    var self = this;
    function init() {
        self._mCharToFreqOrder = euckrfreq.EUCKRCharToFreqOrder;
        self._mTableSize = euckrfreq.EUCKR_TABLE_SIZE;
        self._mTypicalDistributionRatio = euckrfreq.EUCKR_TYPICAL_DISTRIBUTION_RATIO;
    }
    this.getOrder = function (aStr) {
        // for euc-KR encoding, we are interested
        //   first  byte range: 0xb0 -- 0xfe
        //   second byte range: 0xa1 -- 0xfe
        // no validation needed here. State machine has done that
        if (aStr.charCodeAt(0) >= 0xB0) {
            return 94 * (aStr.charCodeAt(0) - 0xB0) + aStr.charCodeAt(1) - 0xA1;
        }
        else {
            return -1;
        }
    };
    init();
}
EUCKRDistributionAnalysis.prototype = new CharDistributionAnalysis();
function GB2312DistributionAnalysis() {
    CharDistributionAnalysis.apply(this);
    var self = this;
    function init() {
        self._mCharToFreqOrder = gb2312freq.GB2312CharToFreqOrder;
        self._mTableSize = gb2312freq.GB2312_TABLE_SIZE;
        self._mTypicalDistributionRatio = gb2312freq.GB2312_TYPICAL_DISTRIBUTION_RATIO;
    }
    this.getOrder = function (aStr) {
        // for GB2312 encoding, we are interested
        //  first  byte range: 0xb0 -- 0xfe
        //  second byte range: 0xa1 -- 0xfe
        // no validation needed here. State machine has done that
        if (aStr.charCodeAt(0) >= 0xB0 && aStr.charCodeAt(1) >= 0xA1) {
            return 94 * (aStr.charCodeAt(0) - 0xB0) + aStr.charCodeAt(1) - 0xA1;
        }
        else {
            return -1;
        }
    };
    init();
}
GB2312DistributionAnalysis.prototype = new CharDistributionAnalysis();
function Big5DistributionAnalysis() {
    CharDistributionAnalysis.apply(this);
    var self = this;
    function init() {
        self._mCharToFreqOrder = big5freq.Big5CharToFreqOrder;
        self._mTableSize = big5freq.BIG5_TABLE_SIZE;
        self._mTypicalDistributionRatio = big5freq.BIG5_TYPICAL_DISTRIBUTION_RATIO;
    }
    this.getOrder = function (aStr) {
        // for big5 encoding, we are interested
        //   first  byte range: 0xa4 -- 0xfe
        //   second byte range: 0x40 -- 0x7e , 0xa1 -- 0xfe
        // no validation needed here. State machine has done that
        if (aStr.charCodeAt(0) >= 0xA4) {
            if (aStr.charCodeAt(1) >= 0xA1) {
                return 157 * (aStr.charCodeAt(0) - 0xA4) + aStr.charCodeAt(1) - 0xA1 + 63;
            }
            else {
                return 157 * (aStr.charCodeAt(0) - 0xA4) + aStr.charCodeAt(1) - 0x40;
            }
        }
        else {
            return -1;
        }
    };
    init();
}
Big5DistributionAnalysis.prototype = new CharDistributionAnalysis();
function SJISDistributionAnalysis() {
    CharDistributionAnalysis.apply(this);
    var self = this;
    function init() {
        self._mCharToFreqOrder = jisfreq.JISCharToFreqOrder;
        self._mTableSize = jisfreq.JIS_TABLE_SIZE;
        self._mTypicalDistributionRatio = jisfreq.JIS_TYPICAL_DISTRIBUTION_RATIO;
    }
    this.getOrder = function (aStr) {
        // for sjis encoding, we are interested
        //   first  byte range: 0x81 -- 0x9f , 0xe0 -- 0xef
        //   second byte range: 0x40 -- 0x7e,  0x80 -- 0xfc
        // no validation needed here. State machine has done that
        if (aStr.charCodeAt(0) >= 0x81 && aStr.charCodeAt(0) <= 0x9F) {
            var order = 188 * (aStr.charCodeAt(0) - 0x81);
        }
        else if (aStr.charCodeAt(0) >= 0xE0 && aStr.charCodeAt(0) <= 0xEF) {
            order = 188 * (aStr.charCodeAt(0) - 0xE0 + 31);
        }
        else {
            return -1;
        }
        order += aStr.charCodeAt(1) - 0x40;
        if (aStr.charCodeAt(1) < 0x40 || aStr.charCodeAt(1) === 0x7F || aStr.charCodeAt(1) > 0xFC) {
            order = -1;
        }
        return order;
    };
    init();
}
SJISDistributionAnalysis.prototype = new CharDistributionAnalysis();
function EUCJPDistributionAnalysis() {
    CharDistributionAnalysis.apply(this);
    var self = this;
    function init() {
        self._mCharToFreqOrder = jisfreq.JISCharToFreqOrder;
        self._mTableSize = jisfreq.JIS_TABLE_SIZE;
        self._mTypicalDistributionRatio = jisfreq.JIS_TYPICAL_DISTRIBUTION_RATIO;
    }
    this.getOrder = function (aStr) {
        // for euc-JP encoding, we are interested
        //   first  byte range: 0xa0 -- 0xfe
        //   second byte range: 0xa1 -- 0xfe
        // no validation needed here. State machine has done that
        if (aStr[0] >= "\xA0") {
            return 94 * (aStr.charCodeAt(0) - 0xA1) + aStr.charCodeAt(1) - 0xA1;
        }
        else {
            return -1;
        }
    };
    init();
}
EUCJPDistributionAnalysis.prototype = new CharDistributionAnalysis();
export { CharDistributionAnalysis };
export { EUCTWDistributionAnalysis };
export { EUCKRDistributionAnalysis };
export { GB2312DistributionAnalysis };
export { Big5DistributionAnalysis };
export { SJISDistributionAnalysis };
export { EUCJPDistributionAnalysis };
