<template>
  <div class="video-list">
    <!-- <a-button type="primary" @click="update">刷新</a-button> -->
    <a-list item-layout="horizontal" size="small" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <div slot="actions" @click="deleteOne(item)"><a-icon type="close" /></div>
        <a-list-item-meta>
          <a class="video-title" :class="{'active': source.name === item.name}" slot="title" @click="changeSource(item)">{{ item.name }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <p class="chose_file">
      <a-button type="primary"><label for="file">视频选择</label></a-button>
      <input type="file" id="file" accept="video/*" multiple @change="getvl" />
      <span v-if="list.length">&nbsp;&nbsp;<a-button type="danger" @click="clearLocalAll">清除全部</a-button></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawerIsShow: false,
      list: [],
      files: []
    }
  },
  watch: {
  },
  
  created() {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    const localSourceList = localStorage.getItem('sourceList');
    if (localSourceList) {
      this.list  = JSON.parse(localSourceList);
    }
  },
  computed: {
    source() {
      return this.$store.getters.getSource;
    }
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
        this.list.push(source);
      }
    },
    getvl(e) {
      const filesObj = e.target.files;
      this.formatVideo(filesObj);
    },
    formatVideo(filesObj){
      for (const key in filesObj) {
        if (filesObj.hasOwnProperty(key)) {
          const file = filesObj[key];
          this.addVideo(this.getFileSource(file));
        }
      }
    },
    changeSource(source) {
      this.$store.commit('changeSource', source);
      this.$store.commit('changePlayRate', 1);
    },
    clearLocalAll() {
      this.list = [];
      localStorage.clear('sourceList');
    },
    deleteOne(item){
      this.list = this.list.filter(v => v.name !== item.name);
    },
    update() {
      this.list.map(item => {
        const {src} = this.getFileSource(item.file);
        item.src = src;
      });
    },
    getFileSource(file) {
      let src = null;
      const { name, size, type } = file;
      if (window.createObjcectURL != undefined) {
        src = window.createOjcectURL(file);
      } else if (window.URL != undefined) {
        src = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        src = window.webkitURL.createObjectURL(file);
      }
      return { src, type, name, size, file };
    },
    beforeunloadFn(e) {
      localStorage.setItem('sourceList', JSON.stringify(this.list));
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  }
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

