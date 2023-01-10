import constants from "./constants.js";
import CharSetProber from "./charsetprober.js";
import * as logger from "./logger.js";
function CharSetGroupProber() {
    CharSetProber.apply(this);
    var self = this;
    function init() {
        self._mActiveNum = 0;
        self._mProbers = [];
        self._mBestGuessProber = null;
    }
    this.reset = function () {
        CharSetGroupProber.prototype.reset.apply(this);
        this._mActiveNum = 0;
        for (var i = 0, prober; prober = this._mProbers[i]; i++) {
            if (prober) {
                prober.reset();
                prober.active = true;
                this._mActiveNum++;
            }
        }
        this._mBestGuessProber = null;
    };
    this.getCharsetName = function () {
        if (!this._mBestGuessProber) {
            this.getConfidence();
            if (!this._mBestGuessProber)
                return null;
        }
        return this._mBestGuessProber.getCharsetName();
    };
    this.getSupportedCharsetNames = function () {
        throw new Error("Unimplemented method getSupportedCharsetNames()");
    };
    this.feed = function (aBuf) {
        for (var i = 0, prober; prober = this._mProbers[i]; i++) {
            if (!prober || !prober.active)
                continue;
            var st = prober.feed(aBuf);
            if (!st)
                continue;
            if (st == constants.foundIt) {
                this._mBestGuessProber = prober;
                return this.getState();
            }
            else if (st == constants.notMe) {
                prober.active = false;
                this._mActiveNum--;
                if (this._mActiveNum <= 0) {
                    this._mState = constants.notMe;
                    return this.getState();
                }
            }
        }
        return this.getState();
    };
    this.getConfidence = function () {
        var st = this.getState();
        if (st == constants.foundIt) {
            return 0.99;
        }
        else if (st == constants.notMe) {
            return 0.01;
        }
        var bestConf = 0.0;
        this._mBestGuessProber = null;
        for (var i = 0, prober; prober = this._mProbers[i]; i++) {
            if (!prober)
                continue;
            if (!prober.active) {
                logger.log(prober.getCharsetName() + " not active\n");
                continue;
            }
            var cf = prober.getConfidence();
            logger.log(prober.getCharsetName() + " confidence = " + cf + "\n");
            if (bestConf < cf) {
                bestConf = cf;
                this._mBestGuessProber = prober;
            }
        }
        if (!this._mBestGuessProber)
            return 0.0;
        return bestConf;
    };
    init();
}
CharSetGroupProber.prototype = new CharSetProber();
export default CharSetGroupProber;
