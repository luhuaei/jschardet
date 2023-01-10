import consts from "../constants.js";
var SJIS_cls = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 1,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3,
    // 0xa0 is illegal in sjis encoding, but some pages does
    // contain such byte. We need to be more consts.error forgiven.
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 0, 0, 0 // f8 - ff
];
var SJIS_st = [
    consts.error, consts.start, consts.start, 3, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.error, consts.error, consts.start, consts.start, consts.start, consts.start //10-17
];
var SJISCharLenTable = [0, 1, 1, 2, 0, 0];
export const classFactor = 6;
export const name = "Shift_JIS";
export { SJIS_cls as classTable };
export { SJIS_st as stateTable };
export { SJISCharLenTable as charLenTable };
export default {
    classTable: SJIS_cls,
    classFactor,
    stateTable: SJIS_st,
    charLenTable: SJISCharLenTable,
    name
};
