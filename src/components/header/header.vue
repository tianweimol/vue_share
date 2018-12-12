<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-content" @click="showDetail(true)">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail(true)">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <v-star :size="48" :score="seller.score"></v-star>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail(false)">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@components/star/star.vue';
const ERR_OK = 0;
export default {
  name: 'header',
  data () {
    return {
      detailShow: false,
      seller: {}
    };
  },
  methods: {
    showDetail: function (flag) {
      this.detailShow = flag;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    this.$http.get('/api/seller').then(res => {
      let response = res.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  },
  components: {
    'v-star': star
  }
  // props: {
  //   seller: {
  //     trype: Object
  //   }
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/styles/mixin.styl';

.header
  color:#fff
  position: relative
  background-color: rgba(7,17,27,0.2)
  overflow :hidden
  .content-wrapper
    position: relative
    text-align :left
    font-size:0
    padding:24px 12px 18px 24px
    .avatar
      display :inline-block
      vertical-align :top
      img
        -webkit-border-radius: 2px
        -moz-border-radius: 2px
        border-radius: 2px
    .content
      display: inline-block
      text-align: left
      margin-left:16px
      font-size:14px
      .title
        margin:2px 0 8px 0
        .brand
          width:30px
          height:18px
          display: inline-block
          bg-image('brand')
          -webkit-background-size: 30px 18px
          background-size: 30px 18px
          vertical-align :top
        .name
          margin-left:6px
          font-size:16px
          line-height:18px
          font-weight:bold
      .description
        margin-bottom :10px
        line-height :12px
        font-size:12px
      .supports
        .icon
          display: inline-block
          vertical-align :top
          width:12px
          height:12px
          margin-right:4px
          -webkit-background-size: 12px 12px
          background-size: 12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          line-height :12px
          font-size:10px

    .support-content
      position: absolute
      right:12px
      bottom:18px
      padding:0 8px
      height:24px
      line-height :24px
      border-radius :14px
      background-color: rgba(0,0,0,0.2)
      text-align: center
      .count
        font-size:10px
      .icon-keyboard_arrow_right
        height :24px
        line-height :24px
        margin-left: 2px
        font-size:10px
  .bulletin-wrapper
    position: relative;
    height:28px
    line-height :28px
    padding:0 22px 0 12px
    white-space :nowrap
    overflow :hidden
    -ms-text-overflow: ellipsis
    text-overflow: ellipsis
    background-color: rgba(7,17,27,0.2)
    .bulletin-title
      display: inline-block
      vertical-align :top
      width:22px
      height:12px
      bg-image('bulletin')
      background-size :22px 12px
      background-repeat :no-repeat
      margin-top:8px
    .bulletin-text
      margin:0 4px
      font-size:10px
    .icon-keyboard_arrow_right
      position: absolute;
      font-size:10px
      right:12px
      top:8px
  .background
    position: absolute
    top:0
    left:0
    width:100%
    height:100%
    z-index: -1
    filter:blur(10px)
    &>img
      width:100%
      height:100%
  .detail
    position: fixed
    z-index:100
    top:0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background-color: rgba(7,17,27,0.8)
    .detail-wrapper
      width:100%
      min-height :100%
      .detail-main
        margin-top:64px
        padding-bottom:64px
        .name
          line-height:16px
          text-align:center
          font-size:16px
          font-weight:700
        .star-wrapper
          margin-top:18px
          padding: 2px 0
          text-align: center
    .detail-close
      position :relative
      width:32px
      height:32px
      margin:-64px auto 0 auto
      clear: both
      font-size:32px
</style>
