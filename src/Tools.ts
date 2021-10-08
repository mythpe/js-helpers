import moment from 'moment-hijri'

//٠١٢٣٤٥٦٧٨٩
export declare type ArabicNumberType = '٠' | '١' | '٢' | '٣' | '٤' | '٥' | '٦' | '٧' | '٨' | '٩'
export declare type StringType = ArabicNumberType | string | Number | null | any
const ArabicNumbersMap = {
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
}
const ParseArabicNumber = (n: StringType): StringType | any => {
  if (!n) return n
  n = n.toString()
  let en, ar
  for (en in ArabicNumbersMap) {
    ar = ArabicNumbersMap[en]
    n = n.replace(new RegExp(ar, 'g'), en)
  }
  return n
}
const FromNumberFormat = (n: StringType): StringType | any => {
  if (!n) return n
  n = ParseArabicNumber(n)
  return n.replace(/,/g, '')
}
const ToNumberFormat = (num: StringType, currency?: string): StringType | any => {
  if (!num) return num

  const splitArray = ParseArabicNumber(num).split('.')
  const rgx = /(\d+)(\d{3})/

  while (rgx.test(splitArray[0])) {
    splitArray[0] = splitArray[0].replace(rgx, '$1' + ',' + '$2')
  }
  let t = splitArray.join('.')
  if (currency) t = `${t} ${currency}`
  return t
}

const IsKsaMobile = (mobile: StringType) => {
  mobile = ParseArabicNumber(mobile) || ''
  if (!mobile) return !1
  mobile = mobile.toString()

  const slug = mobile.toString().substr(0, 2)
  return (mobile.length === 10 && slug === '05') || (mobile.length === 9 || parseInt(slug) === 5)
}
const ParseFormData = (form_data, values, name) => {
  if (values instanceof File) {
    form_data.append(name, values, values.name)
  } else if (typeof values == 'object') {
    for (let key in values) {
      if (typeof values[key] === 'object') {
        let k
        if (name) {
          k = name + '[' + key + ']'
        } else {
          k = key
        }
        ParseFormData(form_data, values[key], k)
      } else {
        if (name) {
          form_data.append(name + '[' + key + ']', values[key])
        } else {
          form_data.append(key, values[key])
        }
      }
    }
  }
  return form_data
}

const DownloadFileFromResponse = (response) => {
  if (!response) return
  try {
    let name = response.headers['content-disposition'] || ''
    name = name.split('filename=').pop().replace(/^"+|"+$/g, '')

    if (!name) {
      console.log('No file Name')
      return
    }

    let file = new Blob([response.data])
    let fileURL = window.URL.createObjectURL(file)
    let fileLink = document.createElement('a')
    if (!fileLink || !fileURL) return

    fileLink.href = fileURL
    fileLink.setAttribute('download', name)
    document.body.appendChild(fileLink)
    fileLink.click()
    setTimeout(() => {
      try {
        document.body.removeChild(fileLink)
        URL.revokeObjectURL(fileURL)
      }
      catch (e) {
        console.log(e)
      }
    }, 3000)
  }
  catch (e) {
    console.log(e)
  }
}

const HijriYear = (locale?: string): string => {
  const l = moment().locale()
  locale = locale || 'en'
  moment.locale(locale)
  const date = moment().format('iYYYY')
  moment.locale(l)
  return date
}

const HijriMonth = (locale?: string): string => {
  const l = moment().locale()
  locale = locale || 'en'
  moment.locale(locale)
  const date = moment().format('iM')
  moment.locale(l)
  return date
}
const HijriDay = (locale?: string): string => {
  const l = moment().locale()
  locale = locale || 'en'
  moment.locale(locale)
  const date = moment().format('iD')
  moment.locale(l)
  return date
}
const TodayDate = (locale?: string): string => {
  const l = moment().locale()
  locale = locale || 'en'
  moment.locale(locale)
  const date = moment().format('YYYY-MM-DD')
  moment.locale(l)
  return date
}
const TodayTime = (locale?: string): string => {
  const l = moment().locale()
  locale = locale || 'en'
  moment.locale(locale)
  const time = moment().format('HH:mm')
  moment.locale(l)
  return time
}
const GetYear = (): number => new Date().getFullYear()

const SortNumberFormatted = (a, b): any => {
  let f = parseFloat(FromNumberFormat(a).replace(/[^\d]/g, '')) || 0
  let s = parseFloat(FromNumberFormat(b).replace(/[^\d]/g, '')) || 0
  return f - s
}

export {
  ArabicNumbersMap,
  ParseArabicNumber,
  FromNumberFormat,
  ToNumberFormat,
  IsKsaMobile,
  ParseFormData,
  DownloadFileFromResponse,
  HijriYear,
  HijriMonth,
  HijriDay,
  TodayDate,
  TodayTime,
  GetYear,
  SortNumberFormatted,
}

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
