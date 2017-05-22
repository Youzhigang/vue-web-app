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
        :ratings='food.ratings' 
        :selectType='selectType' 
        :onlyContent='onlyContent'
        :desc='desc'></ratingselect>
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

const All = 2

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
          selectType: All,
          onlyContent: true,
          desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }
      }
  },
  created () {},
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
      }
  }
}
</script>

<style lang="scss">
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
        transition: .5s all linear;    // 移除上一帧后 加上
    }
    &.move-leave{    
        // transition: 2s all linear;
        transform: translate3d(0,0,0);
    }
    &.move-leave-active{   // 结束状态
        transform: translate3d(100%,0,0);
        transition: .5s all linear;
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
}
</style>
