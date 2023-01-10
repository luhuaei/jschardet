import CharSetProber from "./charsetprober.js";
import CodingStateMachine from "./codingstatemachine.js";
import * as escsm from "./escsm.js";
import constants from "./constants.js";
function EscCharSetProber() {
    CharSetProber.apply(this);
    var self = this;
    function init() {
        self._mCodingSM = [
            new CodingStateMachine(escsm.HZSMModel),
            new CodingStateMachine(escsm.ISO2022CNSMModel),
            new CodingStateMachine(escsm.ISO2022JPSMModel),
            new CodingStateMachine(escsm.ISO2022KRSMModel)
        ];
        self._supportedCharsetNames = [];
        for (const codingSM of self._mCodingSM) {
            self._supportedCharsetNames.push(codingSM.getCodingStateMachine());
        }
        self.reset();
    }
    this.reset = function () {
        EscCharSetProber.prototype.reset.apply(this);
        for (var i = 0, codingSM; codingSM = this._mCodingSM[i]; i++) {
            if (!codingSM)
                continue;
            codingSM.active = true;
            codingSM.reset();
        }
        this._mActiveSM = self._mCodingSM.length;
        this._mDetectedCharset = null;
    };
    this.getCharsetName = function () {
        return this._mDetectedCharset;
    };
    this.getSupportedCharsetNames = function () {
        return self._supportedCharsetNames;
    };
    this.getConfidence = function () {
        if (this._mDetectedCharset) {
            return 0.99;
        }
        else {
            return 0.00;
        }
    };
    this.feed = function (aBuf) {
        for (var i = 0, c; i < aBuf.length; i++) {
            c = aBuf[i];
            for (var j = 0, codingSM; codingSM = this._mCodingSM[j]; j++) {
                if (!codingSM || !codingSM.active)
                    continue;
                var codingState = codingSM.nextState(c);
                if (codingState == constants.error) {
                    codingSM.active = false;
                    this._mActiveSM--;
                    if (this._mActiveSM <= 0) {
                        this._mState = constants.notMe;
                        return this.getState();
                    }
                }
                else if (codingState == constants.itsMe) {
                    this._mState = constants.foundIt;
                    this._mDetectedCharset = codingSM.getCodingStateMachine();
                    return this.getState();
                }
            }
        }
        return this.getState();
    };
    init();
}
EscCharSetProber.prototype = new CharSetProber();
export default EscCharSetProber;
