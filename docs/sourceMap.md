# Source Map

部署 JavaScript 脚本之前，开发者通常会使用 UglifyJS2 等工具对代码压缩变换。

#### 为什么需要转换代码？

-   压缩，减小体积。比如 jQuery 1.9 的源码，压缩前是 252KB，压缩后是 32KB。
-   多个文件合并，减少 HTTP 请求数。
-   其他语言编译成 JavaScript。最常见的例子就是 CoffeeScript。

#### 什么是 Source Map?

Source Map 是一个 JSON 文件，其中包含了代码转换前后的位置信息。给定一个转换之后的压缩代码的位置，就可以通过 Source Map 获取转换之前的代码位置，反过来也一样。

#### Source Map 有哪些属性？

-   version：Source Map 的版本号。
-   file：转换后的文件名。(可选)
-   sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。(可选)
-   sources：转换前的文件列表。
-   sourcesContent: 转换前的文件内容列表，与 sources 列表依次对应。(可选)
-   names：转换前的所有变量名和属性名。
-   mappings：记录位置信息的字符串，经过编码。

## 生成 Source Map

各种主流前端任务管理工具，打包工具都支持生成 Source Map。

### UglifyJS2

UglifyJS2 是命令行工具，用于压缩 JavaScript 代码。

```
npm install uglify-js -g
```

压缩代码的同时生成 Source Map：

```
uglifyjs app.js -o app.min.js --source-map app.min.js.map
```

Source Map 相关选项：

```
--source-map                  Source Map的文件的路径和名称
--source-map-root             源文件的路径
--source-map-url              //#sourceMappingURL的路径。 默认为--source-map指定的值。
--source-map-include-sources  是否将源代码的内容添加到sourcesContent数组
--source-map-inline           是否将Source Map写到压缩代码的最后一行
--in-source-map               输入Source Map，当源文件已经经过变换时使用
```

### Grunt

Grunt 是 JavaScript 项目构建工具。

1. 使用 grunt-contrib-uglify 压缩 JavaScript 代码时
   配置 grunt-contrib-uglify 插件以生成 Source Map

```
grunt.initConfig(
{
    uglify:
    {
        options:
        {
            sourceMap: true
        }
    }
});
```

2. 使用 grunt-usemin 打包源码时
   grunt-usemin 会依次调用 grunt-contrib-concat 与 grunt-contrib-uglify 对源码进行打包和压缩。因此都需要进行配置:

```
grunt.initConfig(
{
    concat:
    {
        options:
        {
            sourceMap: true
        }
    },
    uglify:
    {
        options:
        {
            sourceMap: true,
            sourceMapIn: function(uglifySource)
            {
                return uglifySource + '.map';
            },
        }
    }
});
```

### Gulp

Gulp 是 JavaScript 项目构建工具。
使用 gulp-sourcemaps 生成 Source Map:

```
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'));
});
```

### Webpack

Webpack 是前端打包工具。在其配置文件 webpack.config.js 中设置 devtool 即可生成 Source Map 文件：

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map"
};
```

### SystemJS

SystemJS 是模块加载器。

使用 SystemJS Build Tool 生成 Source Map:

```
builder.bundle('myModule.js', 'outfile.js',
{
minify: true,
sourceMaps: true
});
```

sourceMapContents 选项可以指定是否将源码写入 Source Map 文件
