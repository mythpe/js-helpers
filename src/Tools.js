"use strict";
// import moment from 'moment-hijri'
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortNumberFormatted = exports.GetYear = exports.DownloadFileFromResponse = exports.ParseFormData = exports.IsKsaMobile = exports.ToNumberFormat = exports.FromNumberFormat = exports.ParseArabicNumber = exports.ArabicNumbersMap = void 0;
var ArabicNumbersMap = {
    0: '٠',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
};
exports.ArabicNumbersMap = ArabicNumbersMap;
var ParseArabicNumber = function (n) {
    if (!n)
        return n;
    n = n.toString();
    var en, ar;
    for (en in ArabicNumbersMap) {
        ar = ArabicNumbersMap[en];
        n = n.replace(new RegExp(ar, 'g'), en);
    }
    return n;
};
exports.ParseArabicNumber = ParseArabicNumber;
var FromNumberFormat = function (n) {
    if (!n)
        return n;
    n = ParseArabicNumber(n);
    return n.replace(/,/g, '');
};
exports.FromNumberFormat = FromNumberFormat;
var ToNumberFormat = function (num, currency) {
    if (!num)
        return num;
    var splitArray = ParseArabicNumber(num).split('.');
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(splitArray[0])) {
        splitArray[0] = splitArray[0].replace(rgx, '$1' + ',' + '$2');
    }
    var t = splitArray.join('.');
    if (currency)
        t = t + " " + currency;
    return t;
};
exports.ToNumberFormat = ToNumberFormat;
var IsKsaMobile = function (mobile) {
    mobile = ParseArabicNumber(mobile) || '';
    if (!mobile)
        return !1;
    mobile = mobile.toString();
    var slug = mobile.toString().substr(0, 2);
    return (mobile.length === 10 && slug === '05') || (mobile.length === 9 || parseInt(slug) === 5);
};
exports.IsKsaMobile = IsKsaMobile;
var ParseFormData = function (form_data, values, name) {
    if (values instanceof File) {
        form_data.append(name, values, values.name);
    }
    else if (typeof values == 'object') {
        for (var key in values) {
            if (typeof values[key] === 'object') {
                var k = void 0;
                if (name) {
                    k = name + '[' + key + ']';
                }
                else {
                    k = key;
                }
                ParseFormData(form_data, values[key], k);
            }
            else {
                if (name) {
                    form_data.append(name + '[' + key + ']', values[key]);
                }
                else {
                    form_data.append(key, values[key]);
                }
            }
        }
    }
    return form_data;
};
exports.ParseFormData = ParseFormData;
var DownloadFileFromResponse = function (response) {
    if (!response)
        return;
    try {
        var name_1 = response.headers['content-disposition'] || '';
        name_1 = name_1.split('filename=').pop().replace(/^"+|"+$/g, '');
        if (!name_1) {
            console.log('No file Name');
            return;
        }
        var file = new Blob([response.data]);
        var fileURL_1 = window.URL.createObjectURL(file);
        var fileLink_1 = document.createElement('a');
        if (!fileLink_1 || !fileURL_1)
            return;
        fileLink_1.href = fileURL_1;
        fileLink_1.setAttribute('download', name_1);
        document.body.appendChild(fileLink_1);
        fileLink_1.click();
        setTimeout(function () {
            try {
                document.body.removeChild(fileLink_1);
                URL.revokeObjectURL(fileURL_1);
            }
            catch (e) {
                console.log(e);
            }
        }, 3000);
    }
    catch (e) {
        console.log(e);
    }
};
exports.DownloadFileFromResponse = DownloadFileFromResponse;
// const HijriYear = (locale?: string): string => {
//   const l = moment().locale()
//   locale = locale || 'en'
//   moment.locale(locale)
//   const date = moment().format('iYYYY')
//   moment.locale(l)
//   return date
// }
// const HijriMonth = (locale?: string): string => {
//   const l = moment().locale()
//   locale = locale || 'en'
//   moment.locale(locale)
//   const date = moment().format('iM')
//   moment.locale(l)
//   return date
// }
// const HijriDay = (locale?: string): string => {
//   const l = moment().locale()
//   locale = locale || 'en'
//   moment.locale(locale)
//   const date = moment().format('iD')
//   moment.locale(l)
//   return date
// }
// const TodayDate = (locale?: string): string => {
//   const l = moment().locale()
//   locale = locale || 'en'
//   moment.locale(locale)
//   const date = moment().format('YYYY-MM-DD')
//   moment.locale(l)
//   return date
// }
// const TodayTime = (locale?: string): string => {
//   const l = moment().locale()
//   locale = locale || 'en'
//   moment.locale(locale)
//   const time = moment().format('HH:mm')
//   moment.locale(l)
//   return time
// }
var GetYear = function () { return new Date().getFullYear(); };
exports.GetYear = GetYear;
var SortNumberFormatted = function (a, b) {
    var f = parseFloat(FromNumberFormat(a).replace(/[^\d]/g, '')) || 0;
    var s = parseFloat(FromNumberFormat(b).replace(/[^\d]/g, '')) || 0;
    return f - s;
};
exports.SortNumberFormatted = SortNumberFormatted;
// import _ from 'lodash'
// import moment from 'moment-hijri'
// import qs from 'qs'
// export const Tools = {
//   findBy(search, value, column = 'id') {
//     return _.find(search, e => this.isArray(e) ? e[column] === value : e === value)
//   },
//   queryStringify: v => new URLSearchParams(qs.stringify(v, {
//     arrayFormat: 'indices',
//     // encodeValuesOnly: true,
//     // encode: false,
//   })),
//   flipChoice(data) {
//     const f = {}
//     for (let a in data) {
//       let c
//       c = data[a].split('|')
//       c = [c[1], c[0]].join('|')
//       f[a] = c
//
//     }
//     return f
//   },
// }
