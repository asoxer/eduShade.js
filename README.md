# eduShade.js
简单易用的教学蒙层插件

## 简介

1. 本插件依赖于jquery。
2. 通过简单的调用就可以实现网站上的引导蒙层。
3. 支持有高亮区域与无高亮区域的引导蒙层。
4. 支持自定义“下一步”、“上一步”、“关闭”按钮的大小、位置和回调。
5. 支持自定义DOM，方便添加动态数据。

## 使用
### 引用
```html
<!-- 插件引用 -->
<script src="jquery.js"></script>
<script src="eduShade.js"></script>
<!-- 页面级引用放在插件引用下面 -->
<script src="app.js"></script>
```

### 使用
```js
$.educate({
      list:[
        {
          highLightEl:{   //高亮区域
            elm:$('[data-name="job"]'), //高亮显示的元素
            padding:'5 5 5 5' //扩大高亮区域
          },
          diyEl:{ //自定义元素 有高亮区域 相对高亮区域左上角  无高亮区域 自定义区域居中
            html:$('<div>23</div>'),
            css:{
              height:100,
              width:100,
              backgroundColor : '#f90',
              top:100,
              fontSize : 30
            }
          },
          img:{ //有高亮区域 相对高亮区域左上角  无高亮区域 图片居中
            imgSrc:'//concat.lietou-static.com/dev/lpt/pc/v1/images/pages/index/quickInterview.png',
            top : 50,
            left : -100
          },
          btnNext:{
            css:{
              height:100,
              width:100,
              top:30,
              left:120,
              backgroundColor:'blue', //方便找位置
              opacity: 1
            },
            callback:function(){
              console.log('next1');
            }
          },
          btnClose:{
            css:{
              height:50,
              width:100,
              top:100,
              left:-100,
              backgroundColor:'blue',
              opacity: 1
            },
            callback:function(){
              console.log('close1');
            }
          },
          btnBack:{
            css:{
              height:50,
              width:100,
              top:100,
              left:150,
              backgroundColor:'blue',
              opacity: 1
            },
            callback:function(){
              console.log('back1');
            }
          }
        },
 //     {//下一页数据
 //     }
      ]
    });
```
* 有不需要的功能，只需删除对应的字段即可。
