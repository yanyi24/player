<template>
  <div class="movie-item" @click="changeSource">
    <div class="cover">
      <img :src="item.poster" alt="cover" />
      <div class="duration">{{item.duration | formateTime}}</div>
    </div>
    <div class="detail">
      <div class="title" :class="{'active': currentIndex === index}">{{item.name}}</div>
      <div v-if="item.date" class="date" :class="{'hot': item.date === item.duration}">
        <span v-if="item.date === item.duration">已播完</span>
        <span v-else>上次播放到：{{item.date | formateTime}}</span>
      </div>
    </div>
    <div class="delete" @click.stop="deleteOne"><a-icon type="close" /></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    item: Object,
    index: Number
  },
  name: 'MovieItem',
  computed: {
    ...mapGetters([
      'currentSource',
      'currentIndex'
    ])
  },
  
  methods: {
    changeSource(source) {
      this.$store.commit('changeSource', this.item);
      this.$store.commit('changePlayRate', 1);
      this.$store.commit('changeSourceIndex', this.index);
    },
    deleteOne() {
      this.$emit('deleteOne', this.item);
    }
  },
}
</script>

<style lang="less" scoped>
  .movie-item {
    cursor: pointer;
    display: flex;
    margin-bottom: 20px;
    position: relative;
    &:hover{
        .cover img {
        opacity: .7;
        transform: scale(1.25, 1.25);
      }
    }
    .cover {
      position: relative;
      width: 140px;
      overflow: hidden;
      background: #000;
      flex: 0 0 140px;
      img {
        display: inline-block;
        width: 100%;
        transition: transform ease .25s;
      }
      .duration {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 3px 6px;
        line-height: 1.2em;
        background-color: rgba(0,0,0, .65);
        color: #fff;
        font-size: 12px;
        border-radius: 2px;
      }
    }
    .detail {
      padding-left: 10px;
      font-size: 14px;
      color: rgba(0,0,0, .45);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .title {
        color: rgba(0, 0, 0, 0.65);
        font-size: 16px;
        &.active{
          color: #31C2F2;
        }
      }
      .author{
        font-size: 13px;
        line-height: 1em;
      }
      .date {
        display: inline-block;
        width: auto;
        padding: 3px;
        line-height: 1;
        color: #999;
        font-size: 12px;
        border-radius: 2px;
        &.hot {
          background-color: #ff6060;
          color: #fff;
        }
      }
    }
    .delete{
      position: absolute;
      top: 10px;
      right: 0;
      z-index: 2;
      &:hover{
        color: #31C2F2;
      }
    }
  }

</style>

