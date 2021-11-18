/**
 * 图片文件放在./assets下面，命名格式 name-title.png|jpg
 * put image file in ./assets, named format name-title.png|jpg
 * name=英文名
 * title=中文名
 */

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const cpy = require('cpy')

// 模板路径
const TEMP_PATH = path.join(__dirname, './temp/temp.ejs')
// 目标路径
const DIST_PATH = './dist/'
// 素材路径
const ASSETS_PATH = path.join(__dirname, './assets/')
// 数据
const DATA = {
  name: '', // 英文名
  title: '', // 中文名
  filename: '', // 图片文件名
  backUrl: 'https://www.taobao.com/' // 
}

fs.readdir(ASSETS_PATH, function (err, files) {
  if (err) {
    console.log('fs readdir fail', err)
    return
  }
  files.forEach(file => {
    if (file) {
      const imgFile = file
      const fullname = imgFile.match(/[^.]+/)[0]
      const name = fullname.split('-')[0]  // 英文名
      const title = fullname.split('-')[1] // 中文名
      const filename = imgFile.replace(/(-[^.]+)/, '') // 文件名(把中文去掉) remove title

      DATA.filename = filename
      DATA.name = name
      DATA.title = title

      console.log('name=', name)
      console.log('imgFile=', imgFile)
      console.log('filename=', filename)

      copyAssets(imgFile, name, filename).then(() => {
        writeHtml(DATA, TEMP_PATH, path.join(__dirname, `${DIST_PATH}/${name}.html`))
      })
    }
  })
})

/**
 * 复制资源 copy a
 * @param {*} imgFile 源图片文件名
 * @param {*} name 英文名
 * @param {*} filename 新文件名
 * @returns Promise
 */
async function copyAssets(imgFile, name, filename) {
  try {
    await cpy(['temp/temp/css/**'], `dist/${name}/css`)
    await cpy(['temp/temp/images/**'], `dist/${name}/images`)
    await cpy([`assets/${imgFile}`], `dist/${name}/images`, {
      // 重命名
      rename: filename
    })
    console.log('copyAssets success.')
    return Promise.resolve()
  } catch (err) {
    console.log('copyAssets err=', err)
    return Promise.reject()
  }
}

/**
 * 写入模板html
 * @param {*} data 模板数据
 * @param {*} tempFile 模板路径
 * @param {*} filePath 目标文件路径
 */
function writeHtml(data, tempFile, filePath) {
  const fileName = filePath
  ejs.renderFile(tempFile, data, {}, function(err, str) {
    if (err) {
      console.log('ejs renderFile fail', err)
      return
    }
    fs.writeFile(fileName, str, async function (err) {
      if (err) throw err
      console.log('writeHtml success.')
    })
  })
}