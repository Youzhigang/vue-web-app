<template>
<transition name='move'>
  <div v-show="showFlag" class="food-detail" ref="foodDetail">
    <div class="food-content">
        <div class="image-header"> <!---->
            <img :src="food.image" alt="">
            <i class="icon-arrow_lift"  @click.stop.prevent="show()"></i>
        </div>
        <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span><span class='rating'>好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="current-price">￥{{food.price}}元</span>
                <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}元</span>
            </div>
            <div class="cartcontrol-wrapper">
                <cartcontrol v-show="food.count>0" :food='food'  @add='emitAddFood'></cartcontrol> 
            </div>
            <transition name="fade">
                <div class="add-tocart" v-show="!food.count || food.count === 0"
                @click.stop.prevent='addFirst($event)'>
                    加入购物车
                </div>
            </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
            <div class="title">商品信息</div>
            <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.rating"></split>
    <div class="rating">
        <div class="title">商品评价</div>
        <!--select pannel-->
        <ratingselect 
        @select='selectRating'
        @toggle='toggle'
        :ratings='food.ratings' 
        :selectType='selectType' 
        :onlyContent='onlyContent'
        :desc='desc'></ratingselect>
        <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
                <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text )">
                    <div class="user">
                        <div class="name">{{rating.username}}</div>
                        <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                    </div>
                    <div class="time">{{rating.rateTime | time2Date}}</div>
                    <p class="text">
                        <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType ===1}"></span> {{rating.text}}
                    </p>
                </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
    </div>
    </div>
  </div>
</transition>
</template>

<script>
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import {formatDate} from '../../common/js/utils.js'

console.log(formatDate)
const All = 2
// const POSITIVE = 0
// const NEGATIVE = 1

export default {
  name: 'foodDetail',
  props: {
      food: {
          type: Object
      }
  },
  components: {
    cartcontrol, split, ratingselect
  },
  data () {
      return {
          showFlag: false,
          selectType: 0,
          onlyContent: true,
          desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }
      }
  },
  created () {},
  filters: {
      time2Date (timestamp) {
         // return new Date(timestamp).toLocaleString()
        return formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm')
      }
  },
  methods: {
      show () {
          this.showFlag = !this.showFlag
          this.$nextTick(() => {
              if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.foodDetail, {click: true})
              }
          })
      },
      addFirst (e) {
        if (!e._constructed) { //  组织默认的click事件, 使用bs派发的事件
            return
        }
        this.$set(this.food, 'count', 1)
        this.$emit('add', e.target)
      },
      emitAddFood (target) {
        this.$emit('add', target);
      },
      needShow (type, text) {
          if (this.onlyContent && !text) {
              return false
          } else if (this.selectType === All) {
              return true
          } else {
              return type === this.selectType
          }
      },
      selectRating (type) {
        console.log(type)
        this.selectType = type
        this.$nextTick(() => {
            this.scroll.refresh()
            })
      },
      toggle () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
            this.scroll.refresh()
        })
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/mixin.scss';

.food-detail{
    background-color: #fff;
    position: fixed;
    // height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 3;
    
    transform: translate3d(0,0,0);  //结束状态
    &.move-enter{
        transform: translate3d(100%, 0, 0)  // 开始 下一帧被移除
    }
    &.move-enter-active{
        transition: .3s all linear;    // 移除上一帧后 加上
    }
    &.move-leave{    
        // transition: 2s all linear;
        transform: translate3d(0,0,0);
    }
    &.move-leave-active{   // 结束状态
        transform: translate3d(100%,0,0);
        transition: .3s all linear;
    }
    .image-header{
        position: relative;
        width: 100%;
        // 撑开问题
        height: 0;
        padding-top: 100%; //会根据width 计算
        img{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
        }
        i{
            position: absolute;
            top:10px;
            left:0px;
            color: #fff;
            display: block;
            padding: 10px; // 点击区域变大
        }
    }
    .content{
        padding: 18px;
        position: relative;
        .title{
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 700;
            color:rgb(7, 17, 27);
            line-height: 14px;
        }
        .detail{
            margin-bottom: 18px;
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 10px;
            .sell-count{
                margin-right: 12px;
            }
        }
        .price{
             font-weight: 700;
             line-height: 24px;
            .current-price{
              font-size: 14px;
              color: red;
              margin-right: 8px;
             
            }
             .old-price{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
        }
        .add-tocart{
            position: absolute;
            // width: 74px;
            height: 24px;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            font-size: 10px;
            background-color: rgb(0, 160, 220);
            color:#fff;
            border-radius: 12px;
            opacity: 1; // 最终态

            &.fade-enter-active, &.fade-leave-active{
                transition: all 0.2s;
            }
            &.fade-enter, &.fade-leave-active{
                opacity: 0;
                z-index: -1;
            }
        }
        .cartcontrol-wrapper{
            position: absolute;
            right: 12px;
            bottom: 12px;
        }
    }
    .info{
        padding: 18px;
        .title{
            font-size: 14px;
            margin-bottom: 6px;
            line-height: 14px;
            color: rgb(7,17 , 27);
            // color:#000;
            font-weight: 600;
        }
        .text{
            color:rgb(77,85,93);
            line-height: 24px;
            padding:0 8px;
            font-size: 12px;
        }
    }
    .rating{
        padding: 18px;
        .title{
            font-size: 14px;
            font-weight: 600;
            color: rgb(7,12,27);
            line-height: 14px;
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                position: relative;
                padding: 16px 0 4px 0;
                right: 0;
                @include border-1px(rgba(7,17,27,0.1))
            }
            .user{
                position: absolute;
                right: 0;
                top:16px;
                // font-size: 0;
                line-height: 12px;
                .name{
                    margin-right: 6px;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 10px;
                    color:rgb(147,153,159);
                }
                .avatar{
                    border-radius: 50%;
                }
            }
            .time{
                margin-bottom: 6px;
                font-size: 10px;
                height: 12px;
                color:rgb(147, 153, 159)
            }
            .text{
                line-height: 16px;
                font-size: 12px;
                color:rgb(7,12,27);
                .icon-thumb_up, .icon-thumb_down{
                    margin-right: 4px;
                    line-height: 16px;
                    font-size: 12px;
                }
                .icon-thumb_up{
                    color:rgb(0,160,220)
                }
                .icon-thumb_down{
                    color:rgb(147, 153, 159)
                }
            }
            .no-rating{
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159)
            }
        }
    }
    
}
</style>
