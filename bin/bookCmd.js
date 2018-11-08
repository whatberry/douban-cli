// my-module.js
const Dou = require('../index')
const book = new Dou.Book()
const qrcode = require('qrcode-terminal');

exports.command = 'book'
exports.describe = 'get book information'
exports.builder = {
  banana: {
    default: 'cool'
  }
}

const alignCenter = (text) => {
  let offsetLength = Math.round((process.stdout.columns - text.length) / 2)
  if (offsetLength > 0) {
    return (new Array(offsetLength + 1).join(' ')) + text
  } else {
    return text
  }
}

const getRate = number => {
  let _num = Math.round(number)
  return (new Array(_num + 1).join('★')).yellow + new Array(10 - _num + 1).join('☆').gray
}

const printInfo = book => {
  console.log('\n\n')
  console.log(alignCenter(`······ ${book.title} ······`).rainbow)
  console.log(alignCenter(`作者：` + `${book.author.join('，')}`).cyan)
  console.log(`▶ 评分：`.bold.blue + `${getRate(book.rating.average)}` + ` ${book.rating.average}`.yellow + `（${book.rating.numRaters}人评价）`.grey)
  console.log(`▶ 出版时间：`.bold.blue + `${book.pubdate}`.cyan)

  console.log('\n')
  console.log(`▶ 简介：`.bold.blue + `${book.summary}`.grey)
  console.log('\n')
  console.log(`▶ 标签：`.bold.blue + `${book.tags.map(el => el.title).join(' ')}`.cyan)
  console.log('\n')


  qrcode.generate(`https://book.douban.com/subject/${book.id}`, {
    small: true
  });
  console.log(`↑↑↑ 手机扫描二维码查看详情 ↑↑↑`.grey)
}

// █▉▊▋▌▍▎▏★☆▶▷▨○

exports.handler = function(argv) {
  book
    .searchFisrt(argv.n)
    .then(res => {
      // console.log(res)
      printInfo(res)
    })
    .catch(err => console.error(err))
}