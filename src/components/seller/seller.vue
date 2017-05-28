<template>
<div class="wrapper" ref="sellerDom">
  <div class="wrapper-content">
  <div class="seller">
    <div class="seller-header">
      <div class="name" v-text="seller.name"></div>
      <span class="star-wrapper">
        <star :size=36 :score='seller.score'></star><span class="rating-count" v-text="'('+ seller.ratingCount + ')'"></span><span class="sell-count" >月售{{seller.sellCount}}单</span>
      </span>
      <div class="favor-wrapper" @click='toggleFavor($event)'>
        <span class="icon-favorite" :class='{favor:favor}'></span>
        <div class="text" v-text="isFavor"></div>
      </div>
    </div>
    <div class="seller-content">
      <div class="content-wrapper">
        <div class="title">起送价</div><div class="text">{{seller.minPrice}}</div>元
      </div>
      <div class="content-wrapper">
        <div class="title">商家配送</div><div class="text">{{seller.deliveryPrice}}</div>元
      </div>
      <div class="content-wrapper">
        <div class="title">平均配送时间</div><div class="text">{{seller.deliveryTime}}</div>分钟
      </div>
    </div>
  </div>
  <split></split>
  <div class="support">
    <div class="title">公共与活动</div>
    <div class="text">
      {{seller.bulletin}}
    </div>
    <ul class="support-content">
      <!--icon-->
      <li v-for="support in seller.supports" class="support-item">
        <vicon size='16' :index='support.type' styl='_3'></vicon><span class="support-item-text">{{support.description}}</span>
      </li>  
    </ul>
    </div>
    <split></split>
    <div class="seller-scene">
      <div class="title">商家实景</div>
      <div class="pic-wrapper" ref="picDom">
        <ul class="pic-list" ref="picList">
          <!--img-->
          <li v-for="pic in seller.pics" class="pic-item">
            <img :src="pic" alt="">
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="seller-info">
      <div class="title">商家信息</div>
      <ul >
        <li v-for="info in seller.infos" class="info-item">
          {{info}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import split from '../split/split';
import star from '../star/star';
import vicon from '../discount-icon/icon'
import BScroll from 'better-scroll';
import { saveLocalItem, getLocalItem } from '../../common/js/utils.js'

const _KEY = 'favor'

export default {
  name: 'seller',
  components: {
    split, star, vicon
  },
  props: {
    seller: {
      type: Object
    },
    seller_id: {
      type: String
    }
  },
  data () {
    return {
      favor: false
    }
  },
  mounted () {
    // console.log(this.favor)
    this.favor = getLocalItem(this.seller_id, _KEY) || false
    this.$nextTick(() => {
      this._initScroll()
      this._initPicScroll()
    })
  },
  watch: {
     favor: function (v) {
      saveLocalItem(this.seller_id, _KEY, v)
     },
     seller: function () {
       this.$nextTick(() => {
         this._initPicScroll()
         this._initPicScroll()
       })
     }
  },
  computed: {
    isFavor () {
      return this.favor ? '已收藏' : '收藏'
    }
  },
  methods: {
    _initScroll () {
      if (!this.sellerScroll) {
        this.sellerScroll = new BScroll(this.$refs.sellerDom, {click: true})
      } else {
        this.sellerScroll.refresh()
      }
    },
    _initPicScroll () {
      if (!this.picScroll) {
        if (this.seller.pics) {
          console.log(123)
          let picWidth = 120
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.picScroll = new BScroll(this.$refs.picDom, {
            click: true,
            scrollX: true,
            eventPassthrough: 'vertical' //
          })
         }
      } else {
        this.picScroll.refresh()
      }
      console.log(this.$refs.picDom, 4444444444444444)
      // this.picScroll = new BScroll(this.$refs.picDom)
    },
    toggleFavor (e) {
      if (!e._constructed) {
        return
      }
      // alert(this.favor)
      this.favor = !this.favor
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';

.wrapper{
  position: absolute;
  top: 176px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .wrapper-content{
  .title{
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: 600;
    }
  .seller{
    padding:18px;
    &-header{
      position: relative;
      padding-bottom: 18px;
      @include border-1px(rgba(7,17,27,0.1));
      .name{
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .star-wrapper{
        .rating-count,.sell-count{
          display: inline-block;
          font-size: 10px;
          color:rgb(77,86,93);
          line-height: 18px;
          vertical-align: top;
        }
        .rating-count{
          margin-left: 8px;
        }
        .sell-count{
          margin-left: 12px;
        }
      }
      .favor-wrapper{
        position: absolute;
        right: 0;
        top:0;
        width: 40px;
        .icon-favorite{
          padding: 0 6px;
          font-size: 24px;
          line-height: 24px;
          color:rgba(7,17,27,0.2);
        }
        .favor{
          color:rgb(240,20,20);
        }
        .text{
          width: 40px;
          margin-top: 4px;
          font-size: 10px;
          color: rgb(77,86,93);
          line-height: 10px;
          text-align: center;
        }
      }
    }
    &-content{
      display: flex;
      padding-top: 18px;
      font-size: 10px;
     
      .content-wrapper{
        flex: 1;
        text-align: center;
        border-right:1px solid rgba(7,17,27,0.1);
        &:last-child{
          border:none;
        }
        .title{
          font-size: 10px;
          color:rgb(147,153,159);
          line-height: 10px;
          margin-bottom: 4px;
        }
        .text{
          display: inline;
          font-size: 24px;
          font-weight: 200;
          color: rgb(7,17,27);
          line-height: 24px;
        }
      }
    }
  }
  .support{
    padding: 18px 18px 0 18px;
    .text{
      padding: 8px 12px 16px 12px;
      color: rgb(240,20,20);
      font-size: 12px;
      line-height: 24px;
      font-weight: 200;
      @include border-1px(rgba(7,17,27,0.1))
    }
    &-content{
      .support-item{
        padding: 16px 12px;
        @include border-1px(rgba(7,17,27,0.1));
        &-text{
          font-size: 12px;
          font-weight: 200;
          color: rgb(7,17,27);
          line-height: 16px;
          margin-left: 6px;
          // vertical-align: middle;
          vertical-align: top;
          display: inline;
          
        }
        &:last-child{
          @include border-none();
        }
      }
    }
  }
  .seller-scene{
    padding:18px;
    .pic-wrapper{
      padding-top: 4px;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    .pic-list{
     
      .pic-item{
        // float: left;
        display: inline;
        margin-right: 6px;
        img{
          width: 120px;
          height: 90px;
        }
        &:last-child{
          margin-right: 0px;
        }
      }
    }
    }
  }
  .seller-info{
     padding:18px 18px 0 18px;
     .title{
       padding-bottom: 12px;
       @include border-1px(rgba(7,17,27,0.1));
      // border-bottom: 1px solid black;
     }
     .info-item{
      padding: 16px 12px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(7,17,27);
      line-height: 16px;
      @include border-1px(rgba(7,17,27,0.1));
      &:last-child{
       @include border-none();
      }
     }
   }
  }
}
</style>
