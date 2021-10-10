"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortNumberFormatted = exports.GetYear = exports.DownloadFileFromResponse = exports.ParseFormData = exports.IsKsaMobile = exports.ToNumberFormat = exports.FromNumberFormat = exports.ParseArabicNumber = exports.ArabicNumbersMap = exports.createAuthStorage = void 0;

var AuthLocalStorage_1 = require("./AuthLocalStorage");

Object.defineProperty(exports, "createAuthStorage", {
  enumerable: true,
  get: function get() {
    return AuthLocalStorage_1.createAuthStorage;
  }
});

var Tools_1 = require("./Tools");

Object.defineProperty(exports, "ArabicNumbersMap", {
  enumerable: true,
  get: function get() {
    return Tools_1.ArabicNumbersMap;
  }
});
Object.defineProperty(exports, "ParseArabicNumber", {
  enumerable: true,
  get: function get() {
    return Tools_1.ParseArabicNumber;
  }
});
Object.defineProperty(exports, "FromNumberFormat", {
  enumerable: true,
  get: function get() {
    return Tools_1.FromNumberFormat;
  }
});
Object.defineProperty(exports, "ToNumberFormat", {
  enumerable: true,
  get: function get() {
    return Tools_1.ToNumberFormat;
  }
});
Object.defineProperty(exports, "IsKsaMobile", {
  enumerable: true,
  get: function get() {
    return Tools_1.IsKsaMobile;
  }
});
Object.defineProperty(exports, "ParseFormData", {
  enumerable: true,
  get: function get() {
    return Tools_1.ParseFormData;
  }
});
Object.defineProperty(exports, "DownloadFileFromResponse", {
  enumerable: true,
  get: function get() {
    return Tools_1.DownloadFileFromResponse;
  }
});
Object.defineProperty(exports, "GetYear", {
  enumerable: true,
  get: function get() {
    return; // HijriYear,
    // HijriMonth,
    // HijriDay,
    // TodayDate,
    // TodayTime,

    Tools_1.GetYear;
  }
});
Object.defineProperty(exports, "SortNumberFormatted", {
  enumerable: true,
  get: function get() {
    return Tools_1.SortNumberFormatted;
  }
});