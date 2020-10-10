<template>
  <div class="video-list">
    <a-list item-layout="horizontal" size="small" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta>
          <a slot="title" @click="changeSource(item)">{{ item.name }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <p class="chose_file">
      <a-button type="primary"><label for="file">视频选择</label></a-button>
      <input type="file" id="file" accept="video/*" multiple @change="getvl" />
      <span v-if="list.length">&nbsp;&nbsp;<a-button type="danger" @click="clearLocal">清除全部</a-button></span>
    </p>
  </div>
</template>

<script>
function getFileSource(file) {
  let src = null;
  const { name, size, type } = file;
  if (window.createObjcectURL != undefined) {
    src = window.createOjcectURL(file);
  } else if (window.URL != undefined) {
    src = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    src = window.webkitURL.createObjectURL(file);
  }
  return { src, type, name, size };
}
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
      list: []
    }
  },
  watch: {
  },
  created() {
    const localSourceList = localStorage.getItem('sourceList');
    if (localSourceList) {
      this.list  = JSON.parse(localSourceList);
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
        this.list.unshift(source);
      }
    },
    getvl(e) {
      const filesObj = e.target.files;
      for (const key in filesObj) {
        if (filesObj.hasOwnProperty(key)) {
          const file = filesObj[key];
          let source = getFileSource(file);
          this.addVideo(source);
        }
      }
      localStorage.setItem('sourceList', JSON.stringify(this.list));
    },
    changeSource(source) {
      this.$store.commit('changeSource', source);
      this.$store.commit('changePlayRate', 1);
    },
    clearLocal() {
      localStorage.removeItem('sourceList');
      this.list = [];
    }
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
</style>

