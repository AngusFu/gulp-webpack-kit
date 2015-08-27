

var config = {
    // 项目名称 暂时没什么用处
      "project" : "gulpTemplate"

    /**
     * 指定哪个html文件是项目首页
     */
    , "homepage" : "page_1.html"


    /**
     * 各不同页面的脚本入口文件
     * 建议放在js文件夹下
     * 而他们的依赖则放在js文件夹下的子目录中
     */
    , "scriptEntries" : {
          page_1: './src/js/page_1.js'
        , page_2: './src/js/page_2.js'
    }

    /**
     * 各不同页面的 css 主文件入口模块
     * 建议放在css文件夹下
     * 而他们的依赖则放在css文件夹下的子目录中
     */
    , "scssEntries" : [
          './src/css/index.scss'
        // , './src/css/test.js'
      ]


    /**
     * 项目发布时会自动替换 html/js/css 文件中
     * 引用的相对路径的脚本、样式、图片文件
     * 不支持深层嵌套
     */    
     , CDNPath : {
          "img_dir" : "http://img1.40017.cn/cn/s/touch/2015/newyry/"
        , "css_dir" : "http://css.40017.cn/cn/min/??/cn/s/touch/2015/yry/"
        , "js_dir"  : "http://js.40017.cn/cn/min/??/cn/s/touch/2015/yry/"
     }
};

module.exports = config;