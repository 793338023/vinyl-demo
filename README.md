## vinyl

gulp 的底层实现之一，是 gulp 的 src 与 dest 功能，所以在不需要别的功能时可以直接使用这个包现实文件获取与输出。

本例子为 jsx 转变为浏览器识别的 js。

through2 本质上就是对于 node 原生的 transform 流进行的封装

一般 through.obj 被使用的比较多，而且可以直接对文件流进行处理，如文件内容转换，文件名转换等等的处理，非常方便。

src 排除某些文件不被处理使用`!`符号

@babel/core
如果某些代码需要调用 Babel 的 API 进行转码，就要使用@babel/core 模块。

```
var babel=require('@babel/core');// 字符串转码
babel.transform('code();',options);
```

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，所以需要别的转码包进行处理，presets/plugins。

[Vinyl-fs](https://github.com/gulpjs/vinyl-fs)
