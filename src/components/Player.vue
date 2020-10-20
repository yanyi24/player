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
    :src="currentSource.src"
    :autoplay="autoplay"
  ></video>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
    },
    ended() {
      this.$store.commit('setPlayedDate', this.player.currentTime);
      if (this.loop) {
        this.$store.commit('switchNextSource');
      }
    },
    pause() {
      this.player.pause();
    },
    play() {
      this.player.play();
    },
    abort() {
      this.player.currentTime = this.currentSource.date || 0;
    },
    playing() {
    },
    timeupdate() {
      this.$store.commit('setPlayedDate', this.player.currentTime);
    }
  },
  watch: {
    getRate(newValue, oldValue) {
      this.player.playbackRate = newValue;
    },
  },
  computed: {
    ...mapGetters([
      'currentSource',
      'getRate',
      'loop'
    ])
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

