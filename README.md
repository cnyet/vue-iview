## 基于vue+iview的PC端demo
> 一个PC端的包含前台界面和后台管理的demo。

### 前端技术架构：
 - js框架：Vue-2.5.2
 - 前端路由：vue-router-3.0.1
 - UI组件：iview-2.7.3
 - 构建工具：Webpack-3.6.0
 - 状态管理模式：Vuex-3.0.1
 - promise 的 HTTP 库：axios-0.17.1

### 目录结构
```
.
├──── build                             //构建项目配置文件目录
├──── config                            //配置文件目录
├──── src                               //源文件目录
│     ├──── assets                      //静态资源文件目录
│     ├──── components                  //自定义组件文件目录
│     ├──── router                      //路由配置文件目录
│     ├──── store                       //vuex状态管理仓库文件目录
│     ├──── util                        //自定义的工具类库文件目录
│     ├──── App.vue                     //首页组件文件
│     └──── main.js                     //入口文件
├──── .babelrc                          //babel配置文件
├──── .editorconfig                     //统一不同编辑器的代码风格的配置文件
├──── README.md                         //说明文件
├──── .gitignore                        //git提交忽略文件集合
├──── .eslintrc.js                      //eslint审查js配置文件
├──── .eslintignore                     //eslint忽略的js配置文件
├──── index.html                        //html页面模板
├──── LICENSE                           //LICENSE
├──── postcss.config.js                 //css后处理器配置文件
├──── tasklist.todo                     //任务列表
└──── package.json                      //项目依赖关系说明

```


