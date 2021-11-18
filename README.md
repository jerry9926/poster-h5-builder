# poster-h5-builder
Make a poster to a h5.

## Project structure

```
├─ assets     // posters
├─ dist       // destination files
├─ temp       // template files
├─ index.js   // main script
├─ package.json
├─ README.md
```

## How to use

1. Put image file in `./assets`, named format name-title.png|jpg.
2. run `npm run build` or `node ./index.js`.
3. Get html and static file in `./dist`.
4. Deployed to the server and get h5 url!

## More

- Modify `temp/temp.ejs` to change template.
- Modify `DATA` in `index.js` to change variable.


# 海报H5生成器
通过海报生成H5。

## 项目结构

```
├─ assets     // 海报
├─ dist       // 目标文件
├─ temp       // 模板文件
├─ index.js   // 主脚本
├─ package.json
├─ README.md
```

## 如何使用
1. 图片文件放在`./assets`下面，命名格式 name-title.png|jpg。
2. 运行`npm run build` 或者 `node ./index.js`。
3. 在`./dist`得到html文件和静态资源。
4. 部署到服务器就可以获得h5链接！

## 更多

- 修改 `temp/temp.ejs` 改变模板。
- 修改 `index.js` 中 `DATA` 改变变量。
