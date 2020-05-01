const { join, extname, relative } = require("path");
const chalk = require("chalk");
const slash = require("slash2");
const vfs = require("vinyl-fs");
const rimraf = require("rimraf");
const through = require("through2");
const babel = require("@babel/core");
const getBabelConfig = require("./getBabelConfig");

const cwd = process.cwd();
const targetDir = "lib";
const srcPath = join(cwd, "src");
const targetPath = join(cwd, targetDir);

const patterns = [
  join(srcPath, "**/*"),
  `!${join(srcPath, "**/fixtures{,/**}")}`,
  `!${join(srcPath, "**/demos{,/**}")}`,
  `!${join(srcPath, "**/__test__{,/**}")}`,
  `!${join(srcPath, "**/*.mdx")}`,
  `!${join(srcPath, "**/*.md")}`,
  `!${join(srcPath, "**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)")}`,
];

function log(msg) {
  console.log(`${msg}`);
}

function transform(opts) {
  const { file } = opts;
  const babelOpts = getBabelConfig();
  const relFile = slash(file.path).replace(`${cwd}/`, "");
  log(`Transform to cjs for ${chalk["yellow"](relFile)}`);
  return babel.transform(file.contents, {
    ...babelOpts,
    filename: file.path,
  }).code;
}

function transBabel(src) {
  return vfs
    .src(src, { allowEmpty: true, base: srcPath })
    .pipe(
      // 围绕Node.js stream.Transform（Streams2 / 3）的封装，而一般都使用through.obj
      // 单个chunk 使用cb的第二个参数，多个时使用this.push(chunk)
      // file为chunk
      through.obj((file, env, cb) => {
        try {
          file.contents = Buffer.from(
            transform({
              file,
            })
          );
          // .jsx -> .js
          file.path = file.path.replace(extname(file.path), ".js");
          cb(null, file);
        } catch (e) {
          console.log(e);
          cb(null);
        }
      })
    )
    .pipe(vfs.dest(targetPath));
}

log(chalk.gray(`Clean ${targetDir} directory`));
rimraf.sync(targetPath);

transBabel(patterns).on("end", () => {
  log(chalk.green(`end`));
});
