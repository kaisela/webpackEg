/*
 git地址：https://github.com/chalk/chalk，
 功能描述：对输出信息高亮显示
 */
var chalk = require('chalk')
/*
  npm说明地址：https://docs.npmjs.com/misc/semver
  功能描述：检测版本号是否正确或者合理等
 */
var semver = require('semver')
var packageConfig = require('../package.json')
/*
npm地址：https://www.npmjs.com/package/shelljs
本项目用来判断当前命令是否是npm
 */
var shell = require('shelljs')
function exec (cmd) {//主要用于获取当前npm的版本号
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {//检测npm和node的版本号是否正确
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
