/*
生产环境配置文件
 */
require('./check-versions')()

process.env.NODE_ENV = 'production'
/*
git地址：https://github.com/sindresorhus/orahttps://github.com/sindresorhus/ora
功能描述：编译过程中对过程进度的提示
 */
var ora = require('ora')
/*
git地址:https://github.com/isaacs/rimraf
功能不太明确，用于删除文件
 */
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()
//删除已经存在的dist目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
