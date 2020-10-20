<template>
  <div class="video-list">
    <movie-item v-for="(item, i) in list" :key="item.name" :index="i" :item="item" @deleteOne="deleteOne"></movie-item>
    <p class="chose_file">
      <a-button type="primary"><label for="file">视频选择</label></a-button>
      <input type="file" id="file" accept="video/*" multiple @change="getVideo" />
      <span v-if="list.length">&nbsp;&nbsp;<a-button type="danger" @click="clearLocalAll">清除全部</a-button></span>
    </p>
  </div>
</template>

<script>
function getVideoBase64(url) {
  return new Promise(function (resolve, reject) {
    let dataURL = '';
    let duration = 0;
    let video = document.createElement("video");
    video.setAttribute('crossOrigin', 'anonymous');//处理跨域
    video.setAttribute('src', url);
    video.setAttribute('width', 400);
    video.setAttribute('height', 240);
    video.currentTime = 7;
    video.addEventListener('loadeddata', function () {
      let canvas = document.createElement("canvas"),
          width = video.width, //canvas的尺寸和图片一样
          height = video.height;
      canvas.width = width;
      canvas.height = height;
      duration = video.duration;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
      dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
      resolve({dataURL, duration});
    });
  })
}
import MovieItem from './MovieItem';
import { mapGetters } from 'vuex'
export default {
  name: 'VideoList',
  components: {MovieItem},
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawerIsShow: false,
    }
  },
  watch: {
  },
  
  created() {
    const localSourceList = JSON.parse(localStorage.getItem('sourceList'));
    if (localSourceList && localSourceList.length) {
      this.$store.commit('setSourceList', localSourceList);
    }
  },
  computed: {
    ...mapGetters([
      'currentSource',
      'list',
    ])
  },
  methods: {
    addVideo(source) {
      let flag = true;
      this.list.map(item => {
        if (item.size === source.size && item.type === source.type && item.name === source.name) {
          flag = false;
        }
      });
      if (flag) {
        this.$store.commit('addSource', source);
      }
    },
    getVideo(e) {
      const filesObj = e.target.files;
      this.formatVideo(filesObj);
    },
    formatVideo(filesObj){
      for (const key in filesObj) {
        if (filesObj.hasOwnProperty(key)) {
          const file = filesObj[key];
          this.getFileSource(file).then(res => {
            this.addVideo(res);
          });
        }
      }
    },
    clearLocalAll() {
      this.$store.commit('clearListAll');
    },
    deleteOne(item){
      this.list = this.list.filter(v => v.name !== item.name);
    },
    getFileSource(file) {
      let src = null;
      let poster = '';
      let duration = 0;
      const { name, size, type } = file;
      if (!type.includes('video')) {
        return;
      }
      if (window.createObjcectURL != undefined) {
        src = window.createOjcectURL(file);
      } else if (window.URL != undefined) {
        src = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        src = window.webkitURL.createObjectURL(file);
      }
      return new Promise((resolve, reject) => {
        getVideoBase64(src).then(res => {
          poster = res.dataURL;
          duration = res.duration;
          resolve({ src, poster, duration, type, name, size, file });
        });
      });
    },
  },
}
</script>
<style lang="less" scoped>
  .chose_file input{
    display: block;
    position: absolute;
    z-index: -100;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  /deep/.ant-list-item-meta-title{
    text-align: left;
  }
  .video-title{
    &.active{
      color: #1890ff;
    }
  }
</style>

