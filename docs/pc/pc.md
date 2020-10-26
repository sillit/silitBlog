# pc 端小技巧

_overflow：hidden_ 突破

- 1、为啥需要突破他而不是把 _overflow：hidden_ 注释掉呢，主要是因为很多时候新加需求都是在历史遗留页面里完成，这些页面各种组件嵌套。。。我感动不？我不感动
  有大佬说："直接把组件写在最外层不就好了？"的确，有想过这张方式，但这种方式又需要各种组件通信，还涉及到状态问题，各种都让我觉得麻烦且毫无动力去写。。。
  那么问题就来了，怎么在一堆 _overflow：hidden_ 里面将我需要的弹窗显示出边界外呢？网上各路大神都表示绝无可能，正当我找不到头绪要跟产品"say no"的时候，我聪哥拉住了我，跟我说，要不你用 _position:fixed_ 我思考了一下， _position:fixed_ 是可以突破，但又有一个问题，如果我这个页面会滚动呢，我需要这个小弹窗时刻跟着我的按钮，就会很尴尬，他只能在那里一动不动，顺着这个思路，我突发奇想，那我是不是可以时刻监测我的这个按钮位置，然后用 _js_ 设定弹框的位置。
  说干就干：代码敬上(项目用的 vue，就直接贴上啦~顺便带上复制功能)

  ```js
  <div class="shareBox">
    <a
      href="javascript:void(0)"
      class="clickToSharebox"
      id="clickToShare"
      @mouseover="mouseoverActions"
      @mouseout="btnMouseOut"
      @mousedown="showQrCode=!showQrCode"
    >分享至</a>
    <div
      class="share"
      v-show="showQrCode"
      id="share"
      @mouseover="boxMouseover"
      @mouseout="btnMouseOut"
    >
      <div class="bdsharebuttonbox">
        ...
      </div>
      <div class="urlBox">
        <div class="url_tips">将视频地址粘贴给你的好友吧</div>
        <div class="url_copy">
          <span>视频地址</span>
          <input v-model="localtionUrl" id="copyInput" :onchange='inputchange' readonly="readonly"/>
          <button @click.stop="copyurl">复制</button>
        </div>
      </div>
    </div>
  </div>
  ```

  ```js
  data() {
      return {
          showQrCode: false,
          localtionUrl: location.href,
      };
  },
  methods: {
      // 新百度分享窗口，样式随“分享至”定位
      mouseoverActions() {
          this.boxMouseover();
          var oDiv = document.getElementById("clickToShare");
          let y = oDiv.getBoundingClientRect().y;
          let x = oDiv.getBoundingClientRect().x;
          console.log(oDiv.getBoundingClientRect().x, document.body.clientWidth);
          document.getElementById("share").style.right =
              document.body.clientWidth - x - 385 + "px";
          if (y < 162) {
              document.getElementById("share").style.top = "1px";
          } else {
              document.getElementById("share").style.top =
              oDiv.getBoundingClientRect().y - 161 + "px";
          }
      },
      // 当“分享至”按钮失焦
      btnMouseOut() {
          this.timeScroll = setTimeout(this.setTimerSubmit, 500);
      },
      // 百度分享框隐藏函数
      setTimerSubmit() {
          this.showQrCode = false;
      }
      // 百度分享框被mouseover时，清除注册函数，使分享框显示
      boxMouseover() {
          clearTimeout(this.timeScroll);
          this.showQrCode = true;
      },
      //点击复制url
      copyurl(){
          var input = document.getElementById('copyInput');
          input.select();
          document.execCommand("Copy");
          // 这行代码用来隐藏复制之后百度分享那个小弹窗
          //document.getElementsByClassName('bdselect_share_box')[0].style.opacity = '0';
          // input.blur();
      },
  }
  ```

  ```js
  //css
  .shareBox {
  // position: relative;
  float: right;
  .share {
    z-index: 9999;
    position: fixed;
    // top: 198px;
    // right: 40px;
    width: 320px;
    height: 180px;
    background: rgb(255, 255, 255);
    border-radius: 4px;
    .bdsharebuttonbox {

    }
    .urlBox {
      float: left;
      margin-left: 16px;
      margin-top: 29px;
      .url_tips {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .url_copy {
        margin-top: 21px;
        span {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(64, 69, 73, 1);
        }
        input {
          width: 168px;
          height: 28px;
          background: rgba(221, 221, 221, 1);
          border: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-indent: 6px;
        }
        button {
          width: 60px;
          height: 28px;
          background: rgba(36, 150, 247, 1);
          border: none;
          border-radius: 2px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  }
  ```
