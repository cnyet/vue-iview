module.exports = {
  "extends": "standard",
  "root": true,
  "parser": "babel-eslint",       //将默认的esprima解析脚本变为babel-eslint
  "env": { //支持浏览器，nodejs，es6环境
    "browser": true
  },
  "parserOptions": {
    "sourceType": "module", //设定代码是ECMAScript模块提供
    "ecmaFeatures": {
       "jsx": true
    }
  },
  "rules": {
    "arrow-parens": 0,        //禁用规则要求箭头函数的参数使用圆括号
    "generator-star-spacing": 0,        //禁用规则强制 generator 函数中 * 号周围使用一致的空格
    "quotes": ["error", "double"], //引号用双引号，警告提示
    "camelcase": 1, //属性命名规则可以不使用驼峰命名法
    "semi": 1, //分号结尾，
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，  
    "comma-dangle": 2,
    "curly": 1, //函数或者条件判断时需要统一使用大括号
    "comma-spacing": 1, //不允许在逗号前面出现空格
    "no-const-assign": 1, //禁止修改const声明的变量
    "eol-last": 1, //代码间出现空白行，关闭提示,
    "no-new": 0,
  }
};