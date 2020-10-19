<template>
  <div class="home">
    <div class="container">
      <a-button class="setting" type="primary" shape="circle" icon="setting" @click="drawerIsShow = true" />
      <div class="layer-container">
        <layer :drawer="drawerIsShow" @closedDrawer="drawerIsShow=false"></layer>
      </div>
      <div class="player-container">
        <player :source="source"></player>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieItem from '@/components/MovieItem';
import Player from '@/components/Player';
import Layer from '@/components/Layer';
export default {
  name: 'Home',
  components: {
    MovieItem,
    Player,
    Layer
  },
  data() {
    return {
      drawerIsShow: false,
      isMobile: false
    };
  },
  methods: {
    ctrDrawer() {
      this.drawerIsShow = !this.drawerIsShow;
    },
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
  computed: {
    source() {
      return this.$store.getters.getSource;
    }
  },
  mounted () {
    this.isMobile = this._isMobile()
  },
};
</script>
<style lang="less" scoped>
  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    .container{
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    .setting{
      position: absolute;
      left: 0;
      z-index: 2;
    }
    .player-container{
      height: 100%;
    }
  }
</style>
