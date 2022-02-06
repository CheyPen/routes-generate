// 安装以下的包
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 解析node_modules中的模块
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from "@rollup/plugin-commonjs" // cjs -> esm
import alias from "@rollup/plugin-alias" // alias 和 resolve 功能
import replace from "@rollup/plugin-replace"
import eslint from "@rollup/plugin-eslint"
import json from '@rollup/plugin-json';
import clear from "rollup-plugin-clear"
import { name, version, author } from "../package.json"

const pkgName = 'routes-generator';
const banner =
'/*!\n' +
` * ${name} v${version}\n` +
` * (c) 2014-${new Date().getFullYear()} ${author}\n` +
' * Release under the MIT License.\n' +
' */';

export default {
  input: 'src/index.js',
  // 同时打包多种规范的产物
  output: [
    {
      file: `dist/${pkgName}.umd.js`,
      format: 'umd',
      name: pkgName,
      banner,
    },
    {
      file: `dist/${pkgName}.umd.min.js`,
      format: 'umd',
      name: pkgName,
      plugins: [terser()],
    },
    {
      file: `dist/${pkgName}.cjs.js`,
      format: 'cjs',
      name: pkgName,
      banner,
    },
    {
      file: `dist/${pkgName}.esm.js`,
      format: 'esm',
      name: pkgName,
      banner,
    },
  ],
  // 注意plugin的打包顺序
  plugins: [
    json(),
    clear({
      targets: ['dist'],
    }),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({ babelHelpers: 'bundled' })
  ],
};




