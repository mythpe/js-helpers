const Tools = require('../src/Tools')
// console.log(ArabicNumbersMap[0])

// console.log('Parse Arabic Number: ',ParseArabicNumber('test٩ and test'))
// console.log('From Number Format: ',FromNumberFormat('٠٠1٠١٢٣٤٥٦٧٨٩2٠١٢٣٤٥٦٧٨٩3٠٠٠٠٠٠'))
// console.log('To Number Format: ',ToNumberFormat('٠٠1٠١٢٣٤٥٦٧٨٩2٠١٢٣٤٥٦٧٨٩3٠٠٠٠٠٠'))

const mobiles = [
  '0587412253',
  '05١١١١١١',
  587412253,
  '587412253',
  587412253,
  123456,
]
let i, v
for (i in mobiles) {
  v = mobiles[i]
  console.log(`${v}: `, Tools.IsKsaMobile(mobiles[i]))
}
console.log("--------------")
for (i in Tools.ArabicNumbersMap) {
  v = Tools.ArabicNumbersMap[i]
  console.log(`Parse Arabic Number: ${i} => ${v}.`, Tools.ParseArabicNumber(`test ${v}`))
}
console.log("--------------")
v = '٠١٢٣,٤٥٦٧,٨٩'
console.log(`From Number Format: ${v} =>`,Tools.FromNumberFormat(v))
v = '123,054,325.22'
console.log(`From Number Format: ${v} =>`,Tools.FromNumberFormat(v))
console.log("--------------")
v = '٢٥٠٠'
console.log('To Number Format: ',Tools.ToNumberFormat(v,'SAR'))
console.log("--------------")
console.log('HijriYear: ',Tools.HijriYear())
