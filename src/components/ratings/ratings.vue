<template>
  <div class="ratings" ref="ratingsDom">
    <div class="ratings-content" >
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <ul class="rating-star">
            <li class="service-score"><span class="text"
              >服务态度</span><span class="star-wrapper"
              ><star :size=36 :score='seller.serviceScore'></star></span>{{seller.serviceScore}}</li>
            <li class="food-score"><span class="text">商家评分</span><span class="star-wrapper"><star :size=36 :score='seller.foodScore'></star></span>{{seller.foodScore}}</li>
            <li class="deliver-time"><span class="text">送达时间</span><span class="star-wrapper">{{seller.deliveryTime}}分钟</span></li>
          </ul>
        </div>
      </div>
      <split></split>
      <ratingselect
        :ratings='ratings' 
        :selectType='selectType' 
        :onlyContent='onlyContent'
        @toggle='toggle'
        @select='selectRating'
      ></ratingselect>
      <div class="rating-wrapper" >
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text )">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28"> 
            </div>
            <div class="content">
              <div class="username" v-text="rating.username"></div>
              <div class="star-wrapper">
                <star :size=24 :score='rating.score'></star>
              </div><span class="time">{{seller.deliveryTime}}分钟送达</span>
              <div class="rating-date">{{rating.rateTime  | formater}}</div>
              <p class="text" v-text="rating.text"></p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="recommend-item">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll';
import split from '../split/split';
import star from '../star/star';
import ratingselect from '../ratingselect/ratingselect';
import BScroll from 'better-scroll';
// BScroll 使用 ,父元素高度 <=子元素高度, 都不设置height就可以
import {formatDate} from '../../common/js/utils.js';

const ERR_OK = 200
const ALL = 2

export default {
  name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
              all: '全部',
              positive: '满意',
              negative: '不满意'
          }
    }
  },
  created () {
    this.$http.get('/api/ratings').then(
      res => {
        console.log(res)
        if (res.status === ERR_OK) {
          // console.log(res.data.goods)
          this.ratings = res.data.ratings
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  },
  filters: {
    formater (v) {
      return formatDate(new Date(v), 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
     _initScroll () {
      this.ratingScroll = new BScroll(this.$refs.ratingsDom, {click: true, bounce: false})
    },
    toggle () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
            this.ratingScroll.refresh()
        })
    },
    selectRating (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.ratingScroll.refresh()
        })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
              return false
          } else if (this.selectType === ALL) {
              return true
          } else {
              return type === this.selectType
          }
    }
  },
  components: {
    split, star, ratingselect
  }
}
</script>

<style lang='scss' scoped>
.ratings-content{
        width: 100%;
        // height: 100%;
      }
.ratings{
    position: absolute;
    top: 176px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  .overview{
    padding:18px 0px;
    display: flex;
    .overview-left{
      flex: 0 0 137px;
      width: 137px; // 为了兼容性
      padding: 6px 0;
      border-right: 1px solid rgba(7, 17, 27,0.1);
      text-align: center;
      .score{
        margin-bottom: 6px;
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }
      .title{
        margin-bottom: 8px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 12px;
      }
      .rank{
        // margin-bottom: 6px;
        font-size: 10px;
        color: rgb(147,159,159);
        line-height: 10px;
      }
    }
    .overview-right{
      flex:1;
      padding-left: 24px;
      width: 100%;
      
      .rating-star{
        // padding-left: 24px;
        font-size: 14px;
        color:rgb(255,153,0);
        line-height: 18px;
        .text{
            font-size: 12px;
            color:rgb(7, 17, 27);
            line-height: 18px;
            vertical-align: top;
        }
        .star-wrapper{
          display: inline-block;
          margin-left: 12px;
          font-size: 12px;
          color:rgb(147,153,159);
          line-height: 18px;
        }
      }
    }
  }
  .rating-wrapper{
    height: 100%;
    overflow: hidden;
    padding: 0 18px;
    .rating-item{
      padding: 18px 0;
      border-bottom: 1px solid rgba(7, 17, 27,0.1);
      display: flex;
      .avatar{
        flex: 0 0 28px;
        width: 28px;
        img{
          border-radius: 50%;
          display: block;
        }
      }
      .content{
        flex:1;
        padding-left: 12px;
        position: relative;
        .username{
          color:rgb(7,17,27);
          line-height: 12px;
          margin-bottom: 4px;
        }
        .star-wrapper{
          //  width: 100%;
           display: inline-block;
           line-height: 12px;
          //  height: 12px;
        }
         .time{
            font-size: 10px;
            font-weight: 200;
            color:rgb(147,153,159);
            line-height: 12px;
            margin-left: 6px;
          }
        .rating-date{
          position: absolute;
          right: 0;
          top:0;
          font-size: 10px;
          font-weight: 200;
          color:rgb(147,153,159);
          line-height: 12px;
        }
        .text{
          font-size: 12px;
          color:#000;
          line-height: 18px;
        }
        .recommend{
          font-size: 0;
          .icon-thumb_up{
            font-size: 9px;
            vertical-align: bottom;
            color:#00a0dc;
            margin-right: 8px;
          }
          .recommend-item{
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 4px;
            padding: 0 6px;
            border:1px solid rgba(7, 17, 27,0.1);
            background-color: #fff;
            border-radius: 2px;
            font-size: 9px;
            color:rgb(147,153,159);
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>
