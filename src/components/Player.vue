<template>
  <video
    ref="player"
    class="player"
    controls
    controlslist="nodownload"
    @canplay="canplay"
    @ended="ended"
    @pause="pause"
    @play="play"
    :src="source.src"
    :autoplay="autoplay"
  ></video>
</template>

<script>
export default {
  props: {
    source: Object,
  },
  name: 'Player',
  data() {
    return {
      autoplay: true,
      player: null
    }
  },
  mounted () {
    this.player = this.$refs.player;
    console.log(this.player);
  },
  methods: {
    canplay() {
      console.log(this.player);
      console.log(this.player.duration);
    },
    ended() {
      this.$store.commit('setPlayedDate', this.player.currentTime);
    },
    pause() {
      this.$store.commit('setPlayedDate', this.player.currentTime);
      this.player.pause();
    },
    play() {
      this.player.play();
    }
  },
  watch: {
    playRate(newValue, oldValue) {
      this.player.playbackRate = newValue;
    },
    'source.src'(newValue, oldValue){
      this.play();
    }
  },
  computed: {
    playRate() {
      return this.$store.getters.getRate;
    }
  },
}
</script>

<style lang="less" scoped>
  .player{
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
</style>

