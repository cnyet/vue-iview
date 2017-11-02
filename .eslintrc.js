// https://eslint.org/docs/user-guide/configuring
//eslint配置文件
module.exports = {
  root: true,               //当前为根目录，不会向父级目录查找.eslintrc.js
  parser: 'babel-eslint',   //将默认的esprima解析脚本变为babel-eslint
  parserOptions: {          //解析选项
    sourceType: 'module'    //设定代码是ECMAScript模块提供
  },
  env: {                    //支持的环境
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  //继承standard规则
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    //禁用规则要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // allow async-await
    //禁用规则强制 generator 函数中
    'generator-star-spacing': 0,
    "semi": 1,                //分号结尾，
    "quotes": 0,              //禁用必须是单引号
    "comma-dangle": 0,        //禁用数组和对象键值对最后一个逗号
    "no-new": 0,              //禁止在使用new构造一个实例后不赋值
    "no-new-wrappers": 0,     //禁止使用new创建包装实例
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
