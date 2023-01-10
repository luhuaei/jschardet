import consts from "../constants.js";
var EUCJP_cls = [
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 5, 5,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 5, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 1, 3,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 5 // f8 - ff
];
var EUCJP_st = [
    3, 4, 3, 5, consts.start, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.start, consts.error, consts.start, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.start, consts.error, consts.error, consts.error, 3, consts.error,
    3, consts.error, consts.error, consts.error, consts.start, consts.start, consts.start, consts.start //20-27
];
var EUCJPCharLenTable = [2, 2, 2, 3, 1, 0];
export const classFactor = 6;
export const name = "EUC-JP";
export { EUCJP_cls as classTable };
export { EUCJP_st as stateTable };
export { EUCJPCharLenTable as charLenTable };
export default {
    classTable: EUCJP_cls,
    classFactor,
    stateTable: EUCJP_st,
    charLenTable: EUCJPCharLenTable,
    name
};
