<template>
  <div class="ratings">
    <div class="ratings-content">
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
        :ratings='ratings.ratings' 
        :selectType='selectType' 
        :onlyContent='onlyContent'
      ></ratingselect>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll';
import split from '../split/split';
import star from '../star/star';
import ratingselect from '../ratingselect/ratingselect';

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
              positive: '推荐',
              negative: '吐槽'
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
          // this.$nextTick()
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  },
  components: {
    split, star, ratingselect
  }
}
</script>

<style lang='scss' scoped>
.ratings-content{
        width: 100%;
      }
.ratings{
  position: absolute;
  width: 100%;
  top: 177px;
  bottom: 46px;
  left: 0;
  overflow: hidden;
  display: flex;
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
}
</style>
