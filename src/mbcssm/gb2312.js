import consts from "../constants.js";
var GB2312_cls = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 4,
    5, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 0 // f8 - ff
];
var GB2312_st = [
    consts.error, consts.start, consts.start, consts.start, consts.start, consts.start, 3, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.error, consts.error, consts.start,
    4, consts.error, consts.start, consts.start, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, 5, consts.error, consts.error, consts.error, consts.itsMe, consts.error,
    consts.error, consts.error, consts.start, consts.start, consts.start, consts.start, consts.start, consts.start //28-2f
];
// To be accurate, the length of class 6 can be either 2 or 4.
// But it is not necessary to discriminate between the two since
// it is used for frequency analysis only, and we are validing
// each code range there as well. So it is safe to set it to be
// 2 here.
var GB2312CharLenTable = [0, 1, 1, 1, 1, 1, 2];
export const classFactor = 7;
export const name = "GB2312";
export { GB2312_cls as classTable };
export { GB2312_st as stateTable };
export { GB2312CharLenTable as charLenTable };
export default {
    classTable: GB2312_cls,
    classFactor,
    stateTable: GB2312_st,
    charLenTable: GB2312CharLenTable,
    name
};
