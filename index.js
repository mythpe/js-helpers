"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortNumberFormatted = exports.GetYear = exports.DownloadFileFromResponse = exports.ParseFormData = exports.IsKsaMobile = exports.ToNumberFormat = exports.FromNumberFormat = exports.ParseArabicNumber = exports.ArabicNumbersMap = exports.createAuthStorage = void 0;
var src_1 = require("./src");
Object.defineProperty(exports, "ArabicNumbersMap", { enumerable: true, get: function () { return src_1.ArabicNumbersMap; } });
Object.defineProperty(exports, "createAuthStorage", { enumerable: true, get: function () { return src_1.createAuthStorage; } });
Object.defineProperty(exports, "DownloadFileFromResponse", { enumerable: true, get: function () { return src_1.DownloadFileFromResponse; } });
Object.defineProperty(exports, "FromNumberFormat", { enumerable: true, get: function () { return src_1.FromNumberFormat; } });
Object.defineProperty(exports, "GetYear", { enumerable: true, get: function () { return src_1.GetYear; } });
Object.defineProperty(exports, "IsKsaMobile", { enumerable: true, get: function () { return src_1.IsKsaMobile; } });
Object.defineProperty(exports, "ParseArabicNumber", { enumerable: true, get: function () { return src_1.ParseArabicNumber; } });
Object.defineProperty(exports, "ParseFormData", { enumerable: true, get: function () { return src_1.ParseFormData; } });
Object.defineProperty(exports, "SortNumberFormatted", { enumerable: true, get: function () { return src_1.SortNumberFormatted; } });
Object.defineProperty(exports, "ToNumberFormat", { enumerable: true, get: function () { return src_1.ToNumberFormat; } });
module.exports = {
    createAuthStorage: src_1.createAuthStorage,
    ArabicNumbersMap: src_1.ArabicNumbersMap,
    ParseArabicNumber: src_1.ParseArabicNumber,
    FromNumberFormat: src_1.FromNumberFormat,
    ToNumberFormat: src_1.ToNumberFormat,
    IsKsaMobile: src_1.IsKsaMobile,
    ParseFormData: src_1.ParseFormData,
    DownloadFileFromResponse: src_1.DownloadFileFromResponse,
    // HijriYear,
    // HijriMonth,
    // HijriDay,
    // TodayDate,
    // TodayTime,
    GetYear: src_1.GetYear,
    SortNumberFormatted: src_1.SortNumberFormatted,
};
