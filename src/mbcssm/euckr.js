import consts from "../constants.js";
var EUCKR_cls = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 3, 3, 3,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 3, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 0 // f8 - ff
];
var EUCKR_st = [
    consts.error, consts.start, 3, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.error, consts.error, consts.start, consts.start //08-0f
];
var EUCKRCharLenTable = [0, 1, 2, 0];
export const classFactor = 4;
export const name = "EUC-KR";
export { EUCKR_cls as classTable };
export { EUCKR_st as stateTable };
export { EUCKRCharLenTable as charLenTable };
export default {
    classTable: EUCKR_cls,
    classFactor,
    stateTable: EUCKR_st,
    charLenTable: EUCKRCharLenTable,
    name
};
