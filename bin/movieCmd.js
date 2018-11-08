// my-module.js
const Dou = require('../index')
const qrcode = require('qrcode-terminal');
const movie = new Dou.Movie()

exports.command = 'mov'
exports.describe = 'get movie information'
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

const printInfo = movie => {
  console.log('\n\n')
  console.log(alignCenter(`····· ${movie.title} ·····`).bold.green)
  console.log()

  console.log(`▶ 评分：`.bold.blue +
    `${getRate(movie.rating.average)}` +
    ` ${movie.rating.average}`.yellow +
    `（${movie.ratings_count}人评价）`.grey)
  console.log(`▶ 导演：`.bold.blue +
    `${movie.directors.map(el => el.name).join('/')}`.cyan.italic)

  console.log(`▶ 主演：`.bold.blue +
    `${movie.casts.map(el => el.name).join('/')}`.cyan.italic)

  console.log(`▶ 制片国家/地区：`.bold.blue +
    `${movie.countries.join('/')}`.grey)

  console.log(`▶ 上映时间：`.bold.blue +
    `${movie.year}年`.grey)


  console.log('\n')

  console.log(`▶ 简介：`.bold.blue +
    `${movie.summary}`.grey)

  console.log('\n')

  console.log(`▶ 标签：`.bold.blue +
    `${movie.genres.join(' ')}`.cyan)

  console.log('\n')

  qrcode.generate(`https://movie.douban.com/subject/${movie.id}`, {
    small: true
  });
  console.log(`↑↑↑ 手机扫描二维码查看详情 ↑↑↑`.grey)
}

exports.handler = function(argv) {
  movie
    .searchFisrt(argv.n)
    .then(res => {
      // console.log(res)
      printInfo(res)
    })
    .catch(err => console.error(err))
}