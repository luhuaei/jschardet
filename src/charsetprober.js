import constants from "./constants.js";
function CharSetProber() {
    this.reset = function () {
        this._mState = constants.detecting;
    };
    this.getCharsetName = function () {
        return null;
    };
    this.getSupportedCharsetNames = function () {
        throw new Error("Unimplemented method getSupportedCharsetNames()");
    };
    this.feed = function (aBuf) {
    };
    this.getState = function () {
        return this._mState;
    };
    this.getConfidence = function () {
        return 0.0;
    };
    this.filterHighBitOnly = function (aBuf) {
        aBuf = aBuf.replace(/[\x00-\x7F]+/g, " ");
        return aBuf;
    };
    this.filterWithoutEnglishLetters = function (aBuf) {
        aBuf = aBuf.replace(/[A-Za-z]+/g, " ");
        return aBuf;
    };
    // Input: aBuf is a string containing all different types of characters
    // Output: a string that contains all alphabetic letters, high-byte characters, and word immediately preceding `>`, but nothing else within `<>`
    // Ex: input - '¡£º <div blah blah> abcdef</div> apples! * and oranges 9jd93jd>'
    //     output - '¡£º blah div apples and oranges jd jd '
    this.filterWithEnglishLetters = function (aBuf) {
        var result = '';
        var inTag = false;
        var prev = 0;
        for (var curr = 0; curr < aBuf.length; curr++) {
            var c = aBuf[curr];
            if (c == '>') {
                inTag = false;
            }
            else if (c == '<') {
                inTag = true;
            }
            var isAlpha = /[a-zA-Z]/.test(c);
            var isASCII = /^[\x00-\x7F]*$/.test(c);
            if (isASCII && !isAlpha) {
                if (curr > prev && !inTag) {
                    result = result + aBuf.substring(prev, curr) + ' ';
                }
                prev = curr + 1;
            }
        }
        if (!inTag) {
            result = result + aBuf.substring(prev);
        }
        return result;
    };
}
export default CharSetProber;
