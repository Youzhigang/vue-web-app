<template>
  <div class="header">
    <div class="background">
      <img :src="seller.avatar" >
    </div>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" >
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <vicon size=12 styl='_1' :index='seller.supports[0].type' >
            </vicon><span class="text">{{seller.supports[0].description}}</span>
        </div>
       
        <div v-if="seller.supports" class="supports-count" >
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @touchstart= 'toggleDetail'>
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>
    <transition name='fade'>
    <div class="detail" v-show="showDetail">
      <div class="detail-content">
        <h1 class="title">{{seller.name}}</h1>
        <!--star-->
        <div class="star-wrapper">
          <star :size=48 :score = 'seller.score'></star>
        </div>

        <!--line-->
        <div class="line-wrapper">
          <vline>优惠信息</vline>
        </div>
        
        <ul class="content">
          <li v-for="item,index in seller.supports" >
            <vicon size=16 styl='_2' :index='item.type'></vicon><span>{{item.description}}</span>
          </li>
          <!--<span class="text"></span>-->
        </ul>
        <!--line-->
       <div class="line-wrapper">
          <vline>商家公告</vline>
        </div>
        
        <div class="bulletin-all">
         <p class="bulletin-text ">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @touchstart='toggleDetail'>
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
import vline from '../line/line'
import vicon from '../discount-icon/icon'
// import '../../common/styles/index.scss'

export default {
  name: 'vheader',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star, vline, vicon
  },
  data () {
    return {
      showDetail: false
    }
  },
  mounted () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    toggleDetail () {
      this.showDetail = !this.showDetail
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
  
  .header{
    width: 100%;
    background: rgba(7, 17, 27, 0.5);
    // height: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
    .background{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      filter: blur(10px);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;
      display: flex;
      .avatar{
        // display: inline-block;
        img{
          border-radius: 2px;
          width: 64px;
          height: 64px;
        }
      }
      .content{
        margin-left: 16px;
        font-size: 15px;
        // display: inline-block
        .title{
          margin: 2px 0 0 0;
          .brand{
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            line-height: 18px;
            background-size:30px 18px;
            @include bg-image('brand');
          }
          .name{
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
            
          }
        }
        .description{
          margin-top:8px;
          font-size: 12px;
        }
        .support{
          margin: 10px 0 0 0;
          .text{
            height: 12px;
            margin-left: 4px;
            line-height: 14px;
            font-size: 10px;
            vertical-align: top;
          }
        }
        .supports-count{
          position: absolute;
          right: 12px;
          bottom: 18px;
          padding: 0 8px;
          height: 24px;
          line-height: 24px;
          border-radius: 14px;
          background-color: rgba(0,0,0,0.2);
          // text-align: center;
          // vertical-align: top;
            .count{
              vertical-align: top;
              font-size: 10px;
            }
            // .icon{
            //   // line-height: 24px;
            //   font-size: 10px;
            //   margin-left: 2px;
            // }
            
        }
      }
    };
    .bulletin-wrapper{
      height: 28px;
      line-height: 28px;
      padding: 1px 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      background: rgba(7,17,27,0.2);
      .bulletin-title{
        display: inline-block;
        width: 22px;
        height: 12px;
            // margin-top: 8px;
        background-size: 22px 12px;
        @include bg-image('bulletin');
      }
      .bulletin-text{
        margin-left: 4px;
        font-size: 10px;
        color: rgb(255,255,255);
        line-height: 28px;
        vertical-align: bottom;
      }
      .icon{
        position: absolute;
        font-size: 10px;
        right:12px;
        top: 10px;
      }
    }
    .detail{
      // pointer-events:auto;
      display: flex;
      flex-flow: column;
      padding: 64px 36px 32px 36px;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.5);
      opacity: 1;
      -webkit-backdrop-filter: blur(10px);
      transition: .5s all linear;
      &.fade-enter-active, &.fade-leave-active{  //状态结束会被移除
      }
      &.fade-enter, &.fade-leave, &.fade-leave-active,&.fade-enter-active {
        opacity: 0;
      }
     
      .detail-content{
        flex: 1;
        .title{
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
          text-align: center;
        }
        .star-wrapper{
          margin:16px 0 28px 0;
          padding: 2px 0;
          text-align: center;
        }
        .line-wrapper{
          margin-bottom: 24px;
        }
        .content{
          // color: 
          margin-bottom: 28px;
          font-size: 12px;
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            // margin-right: 4px;
            // vertical-align: top;
            background-size: 16px;
             
          }
          li{
            margin: 12px;
            span{
              margin-left: 6px;
              line-height: 16px;
              vertical-align: top;
            }
          }
        }
        .bulletin-all{
          padding:0 12px;
          p.bulletin-text{
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
      .detail-close{
        display: flex;
        justify-content: center;
        i{
          font-size: 32px;
          color:rgba(255,255,255,0.5)
        }
      }
    }
  }
</style>
