import consts from "../constants.js";
var EUCTW_cls = [
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 0, 0,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 0, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 6, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 4, 4, 4, 4, 4, 4,
    5, 5, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 3, 1, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 0 // f8 - ff
];
var EUCTW_st = [
    consts.error, consts.error, consts.start, 3, 3, 3, 4, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.error, consts.start, consts.error,
    consts.start, consts.start, consts.start, consts.error, consts.error, consts.error, consts.error, consts.error,
    5, consts.error, consts.error, consts.error, consts.start, consts.error, consts.start, consts.start,
    consts.start, consts.error, consts.start, consts.start, consts.start, consts.start, consts.start, consts.start //28-2f
];
var EUCTWCharLenTable = [0, 0, 1, 2, 2, 2, 3];
export const classFactor = 7;
export const name = "x-euc-tw";
export { EUCTW_cls as classTable };
export { EUCTW_st as stateTable };
export { EUCTWCharLenTable as charLenTable };
export default {
    classTable: EUCTW_cls,
    classFactor,
    stateTable: EUCTW_st,
    charLenTable: EUCTWCharLenTable,
    name
};
