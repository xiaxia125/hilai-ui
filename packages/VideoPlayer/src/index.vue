<template>
    <div
        :id="id"
        class="video-player-h5"
        style="width: 100%; height: 100%"
    >
    </div>
  </template>

  <script setup>
  import '../assets/js/h5player.min.js'
  import {ref, onMounted,onUnmounted} from 'vue'

  const props = defineProps({
    url: {
      type: String,
      default: ''
    } , //视频url
    mode: {
      type: Number,
      default: 0
    }  //0:普通模式  1：高级模式
  })
  /**
   * H5视频播放插件
   */
  const player = ref('') //播放器实例

  const id = ref(crypto.randomUUID())
  onMounted(() => {
    initPlayer();
  });

  onUnmounted(() => {
    closeVideo();
  });

  function closeVideo() {
    player.value && player.value.JS_StopRealPlayAll().then(
        () => {
          console.info('JS_StopRealPlayAll success');
        },
        (err) => {
          console.info('JS_StopRealPlayAll failed');
        }
    );
  }
  /**
   * 播放视频
   */
  function initPlayer() {
    player.value = new window.JSPlugin({
      // 需要英文字母开头 必填
      szId: id.value,
      oStyle: {
        border: "transparent",
        borderSelect: "transparent",
      },
    });
    player.value.JS_SetWindowControlCallback({
      windowEventSelect: function (index) {
        //插件选中窗口回调
        // console.log("windowSelect callback: ", index);
      },

      pluginErrorHandler: function (index, iErrorCode, oError) {
        // 插件错误回调
        // console.log("插件错误回调: ", index, iErrorCode, oError);
      },

      firstFrameDisplay: function (index, iWidth, iHeight) {
        //首帧显示回调
        // console.log(
        //   `窗口${index}加载成功，分辨率为${iWidth}*${iHeight}`
        // );
      },
      performanceLack: function () {
        //性能不够回调
      },
    });

    play(0);

  }

  /**
   * 播放视频
   * @param windowIndex
   */

  function play(windowIndex) {
    if (props.url === ''){
      ElMessage.error('未传递视频url!')
      return
    }
    let mode = props.mode;
    let index = windowIndex
    let playURL = props.url;
    player.value.JS_Play(playURL, {playURL, mode}, index).then(
        () => {
          // 播放成功回调
          // console.log("播放成功");
        },
        (err) => {
          // console.log("播放失败", err);
        }
    );
  }

  </script>

  <style scoped>

  </style>

