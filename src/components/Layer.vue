<template>
  <a-drawer
    placement="right"
    width="75%"
    wrapClassName="layer-drawer"
    :closable="false"
    :visible="drawerIsShow"
    :get-container="false"
    :wrap-style="{ position: 'absolute' }"
    @close="closedDrawer"
  >
    <div class="function">
      <div class="rate-select">
        <span>选择倍速:</span>&nbsp;
        <a-select :value="rate + '×'" style="width: 80px" size="small" @change="changeRate">
          <a-select-option value="1">1×</a-select-option>
          <a-select-option value="1.25">1.25×</a-select-option>
          <a-select-option value="1.5">1.5×</a-select-option>
          <a-select-option value="1.75">1.75×</a-select-option>
          <a-select-option value="2">2×</a-select-option>
        </a-select>
      </div>
      <div class="loop-switch">
        <span>自动播放下个视频：</span>
        <a-switch size="small" default-checked @change="onChangeLoop" />
      </div>
    </div>
    <video-list></video-list>
  </a-drawer>
</template>

<script>
import VideoList from './VideoList';
export default {
  name: 'Layer',
  components: {VideoList},
  props: {
    drawer: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      drawerIsShow: false
    }
  },
  watch: {
    drawer(newValue, oldValue) {
      this.drawerIsShow = newValue;
    }
  },
  methods: {
    closedDrawer() {
      this.$emit('closedDrawer', false);
    },
    changeRate(value) {
      this.$store.commit('changePlayRate', Number(value));
    },
    onChangeLoop(checked) {
      this.$store.commit('switchLoop', checked);
    },
  },
  computed: {
    rate() {
      return this.$store.getters.getRate; 
    }
  },
}
</script>

<style lang="less" scoped>
  .layer{
    position: relative;
  }
  .rate-select{
    text-align: left;
    margin-bottom: 10px;
  }
  /deep/.ant-drawer-content{
    overflow: hidden;
  }
  .function{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    .loop-switch{
      margin-bottom: 10px;
      margin-left: 20px;
    }
  }
</style>

