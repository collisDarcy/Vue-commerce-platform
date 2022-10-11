// 在项目发布阶段使用babel插件
const prodPlugins=[]
if(process.env.NODE_ENV==='production'){
  prodPlugins.push('transform-remove-console')
}


module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins:[...prodPlugins,
  // 发布产品的时候插件数组
  '@babel/plugin-syntax-dynamic-import'
  ]
};
