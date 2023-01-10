import consts from "../constants.js";
var UTF8_cls = [
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
    2, 2, 2, 2, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5,
    0, 0, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    7, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 9, 8, 8,
    10, 11, 11, 11, 11, 11, 11, 11,
    12, 13, 13, 13, 14, 15, 0, 0 // f8 - ff
];
var UTF8_st = [
    consts.error, consts.start, consts.error, consts.error, consts.error, consts.error, 12, 10,
    9, 11, 8, 7, 6, 5, 4, 3,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.error, consts.error, 5, 5, 5, 5, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, 5, 5, 5, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, 7, 7, 7, 7, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, 7, 7, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, 9, 9, 9, 9, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, 9, 9, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, 12, 12, 12, 12, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, 12, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, 12, 12, 12, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.start, consts.start, consts.start, consts.start, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error //c8-cf
];
var UTF8CharLenTable = [0, 1, 0, 0, 0, 0, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6];
export const classFactor = 16;
export const name = "UTF-8";
export { UTF8_cls as classTable };
export { UTF8_st as stateTable };
export { UTF8CharLenTable as charLenTable };
export default {
    classTable: UTF8_cls,
    classFactor,
    stateTable: UTF8_st,
    charLenTable: UTF8CharLenTable,
    name
};
