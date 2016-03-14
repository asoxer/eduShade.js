/**
 图片默认居中 left相对中轴位置  按钮相对于图片左上角位置
    $.educate({
      list:[
        {
          highLightEl:{
            elm:$('[data-name="job"]'),
            padding:'5 5 5 5'
          },
          diyEl:{ //有高亮区域 相对高亮区域左上角  无高亮区域 自定义区域居中
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
 */
(function ($, window, undefined) {
  $['educate'] = function (options) {
    var _options = options || {
      list: []
    };
    var _height = 0;
    var _width = 0;

    /*教学层控制*/
    var _config = { //分页操作参数
      listIdx: 0,
      listLength: _options.list.length
    }

    function _idxCrtl(index) { //页数控制
      if (index == undefined) {
        _config.listIdx = (_config.listIdx + 1) == _config.listLength ? 0 : ++_config.listIdx;
      } else if (typeof index == 'number') {
        _config.listIdx = index;
      }
      return _config.listIdx;
    }

    function _clearEducate() { //清除教学弹层
      $('.educate-shade-b').remove();
      $('.educate-shade-btn' + _config.listIdx).fadeOut('300', function () {
        $(this).remove();
      });
      $('.educate-shade-img' + _config.listIdx).fadeOut('300', function () {
        $(this).remove();
      });
      $('.educate-shade-diy' + _config.listIdx).fadeOut('300', function () {
        $(this).remove();
      });
      $(window).off('resize');
    }

    /*加载教学层*/
    function _loadContent(ifResize) {
      if (ifResize) {
        $('.educate-shade-content').remove();
      }

      $('<div class="educate-shade-content"></div>').css({ //弹层容器
        zIndex: 997,
        position: 'absolute',
        top: 0,
        left: 0,
        height: _height,
        width: _width,
        minWidth: 1100
      }).appendTo('body');
    }

    function _loadEducate() { //加载
      _height = $('body').height() > $(window).height() ? $('body').height() : $(window).height();
      _width = $('body').width() > $(window).width() ? $('body').width() : $(window).width();
      _width = _width <= 1100 ? 1100 : _width;
      $(window).off('resize').on('resize', function () {
        _loadContent(true);
        _loadEducate();
      });
      _loadShade(); //加载蒙层
      _loadImg(); //加载图片
    }

    function _loadShade() { //加载黑遮罩&高亮区域
      var option = _options.list[_config.listIdx];
      var cssDefault = {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.6,
        left: 0,
        top: 0
      };
      //构建高亮区域
      if (Object.keys(option).indexOf('highLightEl') > -1) {
        var $highLightEl = option.highLightEl.elm;
        //蒙层
        var positionData = {
          bodyHeight: _height,
          bodyWidth: _width,
          highLightTop: $highLightEl.offset().top,
          highLightLeft: $highLightEl.offset().left,
          highLightHeight: $highLightEl.outerHeight(true),
          highLightWidth: $highLightEl.outerWidth(true)
        }
        var paddingOption = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
        if (Object.keys(option.highLightEl).indexOf('padding') > -1) {
          var padding = option.highLightEl.padding;
          padding = padding.split(' ');
          switch (padding.length) {
            case 1:
              paddingOption.top = paddingOption.right = paddingOption.bottom = paddingOption.left = padding[0] >> 0;
              break;
            case 2:
              paddingOption.top = paddingOption.bottom = padding[0] >> 0;
              paddingOption.right = paddingOption.left = padding[1] >> 0;
              break;
            case 3:
              paddingOption.top = padding[0] >> 0;
              paddingOption.right = paddingOption.left = padding[1] >> 0;
              paddingOption.bottom = padding[2] >> 0;
              break;
            case 4:
              paddingOption.top = padding[0] >> 0;
              paddingOption.right = padding[1] >> 0;
              paddingOption.bottom = padding[2] >> 0;
              paddingOption.left = padding[3] >> 0;
              break;
          }
        }

        var cssOption = [{
          width: positionData.bodyWidth,
          height: positionData.highLightTop - paddingOption.top,
          top: 0,
          left: 0
        }, {
          width: positionData.highLightLeft - paddingOption.left,
          height: positionData.highLightHeight + paddingOption.top + paddingOption.bottom,
          top: positionData.highLightTop - paddingOption.top,
          left: 0
        }, {
          width: positionData.highLightWidth + paddingOption.left + paddingOption.right,
          height: positionData.highLightHeight + paddingOption.top + paddingOption.bottom,
          top: positionData.highLightTop - paddingOption.top,
          left: positionData.highLightLeft - paddingOption.left,
          backgroundColor: '#000',
          opacity: 0
        }, {
          width: positionData.bodyWidth - positionData.highLightLeft - positionData.highLightWidth - paddingOption.right,
          height: positionData.highLightHeight + paddingOption.top + paddingOption.bottom,
          top: positionData.highLightTop - paddingOption.top,
          left: positionData.highLightLeft + positionData.highLightWidth + paddingOption.right
        }, {
          width: positionData.bodyWidth,
          height: positionData.bodyHeight - positionData.highLightHeight - positionData.highLightTop - paddingOption.top - paddingOption.bottom,
          top: positionData.highLightTop + positionData.highLightHeight + paddingOption.bottom,
          left: 0
        }];
        cssOption.forEach(function (cssOption, idx) {
          var cssOpt = $.extend(false, cssDefault, cssOption);
          $('<div class="educate-shade-b"></div>').css(cssOpt).appendTo('.educate-shade-content');
        });
      } else {
        var cssOpt = $.extend(false, {
          height: _height,
          width: _width,
          minWidth: 1100
        }, cssDefault);
        $('<div class="educate-shade-b"></div>').css(cssOpt).appendTo('.educate-shade-content');
      }
    }

    function _loadBtn(imgCss) { //加载按钮
      var option = _options.list[_config.listIdx];
      option.cssOption = {
        zIndex: 998,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: '#fff',
        opacity: 0
      }
      if (Object.keys(option).indexOf('btnNext') > -1) {
        _createBtn(option, 'btnNext');
      }
      if (Object.keys(option).indexOf('btnClose') > -1) {
        _createBtn(option, 'btnClose');
      }
      if (Object.keys(option).indexOf('btnBack') > -1) {
        _createBtn(option, 'btnBack');
      }
    }

    function _createBtn(option, type) { //创建按钮
      var cssOption = $.extend(false, option.cssOption, option[type].css);
      cssOption.left = option.cssOption.left + option[type].css.left;
      cssOption.top = option.cssOption.top + option[type].css.top;
      $('<a href="javascript:;" data-selector="' + type + '" class="educate-shade-btn"' + _config.listIdx + '></a>').css(cssOption).appendTo('.educate-shade-img' + _config.listIdx);
      switch (type) {
        case 'btnNext':
          $('[data-selector="btnNext"]').on('click', function () {
            _clearEducate();
            if (_idxCrtl() != 0) {
              _loadEducate();
            } else {
              $('.educate-shade-content').remove();
            }
            option[type].callback && option[type].callback(); //执行回调
          });
          break;
        case 'btnClose':
          $('[data-selector="btnClose"]').on('click', function () {
            _clearEducate();
            $('.educate-shade-content').remove();
            option[type].callback && option[type].callback(); //执行回调
          });
          break;
        case 'btnBack':
          $('[data-selector="btnBack"]').on('click', function () {
            _clearEducate();
            if (_config.listIdx >= 1) {
              _config.listIdx--;
              _loadEducate();
            } else {
              $('.educate-shade-content').remove();
            }
            option[type].callback && option[type].callback(); //执行回调
          });
          break;
      }
    }

    function _loadImg() { //加载图片
      var option = _options.list[_config.listIdx];
      if (Object.keys(option).indexOf('img') > -1) {
        var img = new Image();
        img.onload = function () {
          var positionData = {
            bodyHeight: _height,
            bodyWidth: _width,
            imgWidth: img.width,
            imgHeight: img.height
          };
          var cssOption = {
            zIndex: 998,
            position: 'absolute',
            left: Math.round(positionData.bodyWidth / 2) - Math.round(positionData.imgWidth / 2),
            top: 0
          };
          if (Object.keys(option).indexOf('highLightEl') > -1) {
            var $highLightEl = option.highLightEl.elm;
            cssOption.left = $highLightEl.offset().left + option.img.left;
            cssOption.top = $highLightEl.offset().top + option.img.top;
          } else {
            cssOption.left = Object.keys(option.img).indexOf('left') > -1 ? cssOption.left + option.img.left >> 0 : cssOption.left;
            cssOption.top = Object.keys(option.img).indexOf('top') > -1 ? option.img.top >> 0 : 0;
          }
          $('<div class="educate-shade-img' + _config.listIdx + '"></div>').html($(img)).css(cssOption)
            .appendTo('.educate-shade-content').fadeIn(300);
          _loadBtn(cssOption); //图片加载完后 加载按钮
          _loadDiy(); //加载自定义标签
        }
        img.src = option.img.imgSrc;
      }
    }

    function _loadDiy() { //加载自定义区域
      var option = _options.list[_config.listIdx];
      if (Object.keys(option).indexOf('diyEl') > -1) {
        var cssDefault = {
          zIndex: 999,
          position: 'absolute',
          left: 0,
          top: 0,
          width: 0
        }
        var cssOption = $.extend(false, cssDefault, option.diyEl.css);
        if (Object.keys(option).indexOf('highLightEl') > -1) {
          var $highLightEl = option.highLightEl.elm;
          cssOption.left = $highLightEl.offset().left + cssOption.left;
          cssOption.top = $highLightEl.offset().top + cssOption.top;
        } else {
          cssOption.left = Math.round(_width / 2) - Math.round(cssOption.width / 2) + cssOption.left;
        }
        $diyEl = option.diyEl.html;
        $diyEl.addClass('educate-shade-diy' + _config.listIdx).css(cssOption).appendTo('.educate-shade-content');
      }
    }

    /*启动插件*/
    _loadContent();
    _loadEducate();

  }
}(jQuery, window));
