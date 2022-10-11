"use strict";(self["webpackChunkdemo_vue2_0"]=self["webpackChunkdemo_vue2_0"]||[]).push([[702],{3174:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/FirstPage"}}},[e._v("首页")]),a("el-breadcrumb-item",{staticClass:"list"},[e._v("商品列表")]),a("el-breadcrumb-item",[e._v("商品分类")]),a("el-breadcrumb-item",[e._v("分类参数")])],1),a("el-card",[a("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":"",closable:!1}}),a("el-steps",{attrs:{space:200,active:e.activeIndex-0,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"100px","label-position":"top"}},[a("el-tabs",{attrs:{"tab-position":"left","before-leave":e.beforeTableLeave},on:{"tab-click":e.tabClicked},model:{value:e.activeIndex,callback:function(t){e.activeIndex=t},expression:"activeIndex"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[a("el-input",{model:{value:e.addForm.goods_name,callback:function(t){e.$set(e.addForm,"goods_name",t)},expression:"addForm.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_price,callback:function(t){e.$set(e.addForm,"goods_price",t)},expression:"addForm.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_weight,callback:function(t){e.$set(e.addForm,"goods_weight",t)},expression:"addForm.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_number,callback:function(t){e.$set(e.addForm,"goods_number",t)},expression:"addForm.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{options:e.cateList,props:e.cateProps,"expand-trigger":"hover"},on:{change:e.handleChange},model:{value:e.addForm.goods_cat,callback:function(t){e.$set(e.addForm,"goods_cat",t)},expression:"addForm.goods_cat"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},e._l(e.manyTableData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-checkbox-group",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}},e._l(t.attr_vals,(function(e,t){return a("el-checkbox",{key:t,attrs:{label:e,border:""}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},e._l(e.onlyTableData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-input",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{action:e.uploadURL,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"list-type":"picture",headers:e.headersObj,"on-success":e.handleSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{model:{value:e.addForm.goods_introduce,callback:function(t){e.$set(e.addForm,"goods_introduce",t)},expression:"addForm.goods_introduce"}}),a("el-button",{staticClass:"addShop",attrs:{type:"primary"},on:{click:e.add}},[e._v("添加商品")])],1)],1)],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:e.previewVisible,width:"50%"},on:{"update:visible":function(t){e.previewVisible=t}}},[a("img",{attrs:{src:e.previewPath,alt:"",width:"100%"}})])],1)},r=[],o=a(2611),i=a.n(o),n={data(){return{activeIndex:"0",addForm:{goods_name:"",goods_price:0,goods_weight:0,goods_number:0,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},addFormRules:{goods_name:[{required:!0,message:"请输入商品名称！",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格！",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量！",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量！",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"blur"}]},cateList:[],cateProps:{label:"cat_name",value:"cat_id",children:"children"},manyTableData:[],onlyTableData:[],uploadURL:"http://127.0.0.1:8888/api/private/v1/upload",headersObj:{Authorization:window.sessionStorage.getItem("token")},previewPath:"",previewVisible:!1}},created(){this.getCateList()},methods:{async getCateList(){const{data:e}=await this.$http.get("categories");if(200!==e.meta.status)return this.$message.error({message:"获取商品分类列表失败！",center:!0});this.$message.success({message:"获取商品分类列表成功！",center:!0}),this.cateList=e.data},handleChange(){if(3!==this.addForm.goods_cat.length)return this.addForm.goods_cat=[]},beforeTableLeave(e,t){return""===this.addForm.goods_name||""===this.addForm.goods_price||""===this.addForm.goods_weight||""===this.addForm.goods_number?(this.$message.error({message:"请填写完整的基本信息！",center:!0}),!1):"0"===t&&3!==this.addForm.goods_cat.length?(this.$message.error({message:"请选择商品分类！",center:!0}),!1):void 0},async tabClicked(){if("1"===this.activeIndex){const{data:e}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"many"}});if(200!==e.meta.status)return this.$message.error({message:"获取动态参数列表失败！",center:!0});this.$message.success({message:"获取动态参数列表成功！",center:!0}),e.data.forEach((e=>{e.attr_vals=0===e.attr_vals.length?[]:e.attr_vals.split(" ")})),this.manyTableData=e.data}else if("2"===this.activeIndex){const{data:e}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"only"}});if(200!==e.meta.status)return this.$message.error({message:"获取动态参数列表失败！",center:!0});this.$message.success({message:"获取动态参数列表成功！",center:!0}),this.onlyTableData=e.data}},handlePreview(e){this.previewPath=e.response.data.url,this.previewVisible=!0},handleRemove(e){const t=e.response.data.tem_path,a=this.addForm.pics.findIndex((e=>e.pic===t));this.addForm.pics.splice(a,1),this.$message.success({message:"删除图片成功！",center:!0})},handleSuccess(e){const t={pic:e.data.tem_path};this.addForm.pics.push(t),this.$message.success({message:e.meta.msg,center:!0})},add(){this.$refs.addFormRef.validate((async e=>{if(!e)return this.$message.error({message:"请填写必要的表单项！",center:!0});const t=i().cloneDeep(this.addForm);t.goods_cat=t.goods_cat.join(","),this.manyTableData.forEach((e=>{const t={attr_id:e.attr_id,attr_value:e.attr_vals.join(" ")};this.addForm.attrs.push(t)})),this.onlyTableData.forEach((e=>{const t={attr_id:e.attr_id,attr_value:e.attr_vals};this.addForm.attrs.push(t)})),t.attrs=this.addForm.attrs;const{data:a}=await this.$http.post("goods",t);if(201!==a.meta.status)return this.$message.error({message:"添加商品失败！",center:!0});this.$message.success({message:"添加商品成功！",center:!0}),this.$router.push("/goods")}))}},computed:{cateId(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},l=n,d=a(1001),c=(0,d.Z)(l,s,r,!1,null,"8cd88310",null),u=c.exports},8360:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/FirstPage"}}},[e._v("首页")]),a("el-breadcrumb-item",{staticClass:"list"},[e._v("商品列表")]),a("el-breadcrumb-item",[e._v("商品分类")]),a("el-breadcrumb-item",[e._v("分类参数")])],1),a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getGoodsList},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getGoodsList.apply(null,arguments)}},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search",width:"60px"},on:{click:e.getGoodsList},slot:"append"})],1)],1),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:e.goAddpage}},[e._v("添加商品")])],1)],1),a("el-table",{attrs:{data:e.goodsList,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",label:"#"}}),a("el-table-column",{attrs:{label:"商品名称",prop:"goods_name"}}),a("el-table-column",{attrs:{label:"商品价格(元)",prop:"goods_price",width:"75px"}}),a("el-table-column",{attrs:{label:"商品重量",prop:"goods_weight",width:"80px"}}),a("el-table-column",{attrs:{label:"创建时间",prop:"add_time",width:"140px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dataFormat")(t.row.add_time))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",width:"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"}},[e._v("修改")]),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(a){return e.removeById(t.row.goods_id)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":e.queryInfo.pagenum,"page-sizes":[10,20,30,40],"page-size":e.queryInfo.pagesize,layout:"sizes, prev, pager, next",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){return e.$set(e.queryInfo,"pagenum",t)},"update:current-page":function(t){return e.$set(e.queryInfo,"pagenum",t)}}})],1)],1)},r=[],o={data(){return{queryInfo:{query:"",pagenum:1,pagesize:10},goodsList:[],total:0}},created(){this.getGoodsList()},methods:{async getGoodsList(){const{data:e}=await this.$http.get("goods",{params:this.queryInfo});if(200!==e.meta.status)return this.$message.error({message:"获取商品列表失败！",center:!0});this.$message.success({message:"获取商品列表成功！",center:!0}),this.goodsList=e.data.goods,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getGoodsList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getGoodsList()},async removeById(e){const t=await this.$confirm("此操作将永久删除该商品，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("confirm"!==t)return this.$message.info({message:"已经取消删除！",center:!0});const{data:a}=await this.$http.delete(`goods/${e}`);if(200!==a.meta.status)return this.$message.error({message:"删除失败！",center:!0});this.$message.success({message:"删除成功！",center:!0}),this.getGoodsList()},goAddpage(){this.$router.push("/goods/add")}}},i=o,n=a(1001),l=(0,n.Z)(i,s,r,!1,null,"71f5b33a",null),d=l.exports}}]);
//# sourceMappingURL=Goods_list_add.e81638e2.js.map