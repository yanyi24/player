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
    @abort="abort"
    @playing="playing"
    @timeupdate="timeupdate"
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
  },
  methods: {
    canplay() {
      // console.log(this.player);
      // console.log(this.player.duration);
    },
    ended() {
      this.$store.commit('setPlayedDate', this.player.currentTime);
    },
    pause() {
      this.player.pause();
    },
    play() {
      this.player.play();
    },
    abort() {
      this.player.currentTime = this.source.date || 0;
      console.log(this.source);
    },
    playing() {
    },
    timeupdate() {
      this.$store.commit('setPlayedDate', this.player.currentTime);
    }
  },
  watch: {
    playRate(newValue, oldValue) {
      this.player.playbackRate = newValue;
    },
    source(newValue, oldValue){
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

