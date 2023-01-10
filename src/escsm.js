import consts from "./constants.js";
var HZ_cls = [
    1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 4, 0, 5, 2, 0,
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
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1 // f8 - ff
];
var HZ_st = [
    consts.start, consts.error, 3, consts.start, consts.start, consts.start, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.error, consts.error, consts.start, consts.start, 4, consts.error,
    5, consts.error, 6, consts.error, 5, 5, 4, consts.error,
    4, consts.error, 4, 4, 4, consts.error, 4, consts.error,
    4, consts.itsMe, consts.start, consts.start, consts.start, consts.start, consts.start, consts.start // 28-2f
];
var HZCharLenTable = [0, 0, 0, 0, 0, 0];
var ISO2022CN_cls = [
    2, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 4, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
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
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2 // f8 - ff
];
var ISO2022CN_st = [
    consts.start, 3, consts.error, consts.start, consts.start, consts.start, consts.start, consts.start,
    consts.start, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.error, consts.error, consts.error, 4, consts.error,
    consts.error, consts.error, consts.error, consts.itsMe, consts.error, consts.error, consts.error, consts.error,
    5, 6, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.itsMe, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.error, consts.start // 38-3f
];
var ISO2022CNCharLenTable = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var ISO2022JP_cls = [
    2, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 7, 0, 0, 0,
    3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    6, 0, 4, 0, 8, 0, 0, 0,
    0, 9, 5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
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
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2 // f8 - ff
];
var ISO2022JP_st = [
    consts.start, 3, consts.error, consts.start, consts.start, consts.start, consts.start, consts.start,
    consts.start, consts.start, consts.error, consts.error, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe, consts.error, consts.error,
    consts.error, 5, consts.error, consts.error, consts.error, 4, consts.error, consts.error,
    consts.error, consts.error, consts.error, 6, consts.itsMe, consts.error, consts.itsMe, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe,
    consts.error, consts.error, consts.error, consts.itsMe, consts.error, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.error, consts.start, consts.start // 40-47
];
var ISO2022JPCharLenTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var ISO2022KR_cls = [
    2, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 0,
    0, 4, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 5, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
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
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2 // f8 - ff
];
var ISO2022KR_st = [
    consts.start, 3, consts.error, consts.start, consts.start, consts.start, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, consts.itsMe, consts.itsMe, consts.itsMe, consts.itsMe,
    consts.itsMe, consts.itsMe, consts.error, consts.error, consts.error, 4, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.error, 5, consts.error, consts.error, consts.error,
    consts.error, consts.error, consts.error, consts.itsMe, consts.start, consts.start, consts.start, consts.start // 20-27
];
var ISO2022KRCharLenTable = [0, 0, 0, 0, 0, 0];
export const HZSMModel = {
    "classTable": HZ_cls,
    "classFactor": 6,
    "stateTable": HZ_st,
    "charLenTable": HZCharLenTable,
    "name": "HZ-GB-2312"
};
export const ISO2022CNSMModel = {
    "classTable": ISO2022CN_cls,
    "classFactor": 9,
    "stateTable": ISO2022CN_st,
    "charLenTable": ISO2022CNCharLenTable,
    "name": "ISO-2022-CN"
};
export const ISO2022JPSMModel = {
    "classTable": ISO2022JP_cls,
    "classFactor": 10,
    "stateTable": ISO2022JP_st,
    "charLenTable": ISO2022JPCharLenTable,
    "name": "ISO-2022-JP"
};
export const ISO2022KRSMModel = {
    "classTable": ISO2022KR_cls,
    "classFactor": 6,
    "stateTable": ISO2022KR_st,
    "charLenTable": ISO2022KRCharLenTable,
    "name": "ISO-2022-KR"
};
