<template>
  <div class="goods">
   <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-list">
        <li v-for="(menu,index) in goods" class="menu-item" 
        :class="{'current': currentIndex ===index }"
        @click=selectMenu(index,$event)
        >
         <span class="menu"><vicon v-show="menu.type>0" size=12 :index='menu.type' styl="_3">
           </vicon>
           {{menu.name}}</span>
        </li>
      </ul>
   </div>
   <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="food-list-hook">
          <h1 class="title" v-text="item.name"></h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" >
              </div>
              <div class="content">
                <h2 class="name" v-text="food.name"></h2>
                <div class="desc" v-text="food.description"></div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                 <div class="price">
                   <span class="current-price">￥{{food.price}}元</span>
                   <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}元</span>
                 </div>
                 <div class="cartcontrol-wrapper">
                    <cartcontrol @add='addFood' :food='food'></cartcontrol>
                    <!--cartcontrol emit add > addFood >_drop>drop -->
                 </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
   </div>
   <shopcart ref="shopCart"
      :selectFoods="selectFoods"
      :deliveryPrice="seller.deliveryPrice" 
      :minPrice="seller.minPrice"
    >
   </shopcart>
  </div>
</template>

<script>
import '../../common/styles/index.scss'
import vicon from '../discount-icon/icon'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'

const ERR_OK = 200
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    vicon, shopcart, cartcontrol
  },
  data () {
    return {
      goods: [],
      listHeight: [], // 每个区间的高度
      scrollY: 0
    }
  },
  mounted () {
    this.$http.get('/api/goods').then(
      res => {
        if (res.status === ERR_OK) {
          // console.log(res.data.goods)
          this.goods = res.data.goods
          this.$nextTick(
            () => {
            this._initScroll()
            this._calculateHeight()
            },
          )
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  },
  computed: {
    currentIndex () {
      // Array.prototype
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1] // 最后一个 height2 undefined
        if (height2 === undefined ||
            (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    _initScroll () {
      // console.log(this.$refs)
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3, click: true
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs['food-list-hook']
      let _height = 0
      this.listHeight.push(_height)
      Array.prototype.forEach.call(foodList, (item, index) => {
        _height += item.clientHeight
        this.listHeight.push(_height)
      })
    },
    selectMenu (index, event) {
      if (event._constructed) {
        console.log(index)
        // this.foodScroll.scrollTo(this.listHeight[index], 333)
        let foodList = this.$refs['food-list-hook']
        this.foodScroll.scrollToElement(foodList[index], 300)
      } else {
        return
      }
    },
    addFood (t) {
      this._drop(t)
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';

.goods{
  position: absolute;
  top: 174px;
  bottom: 46px;
  left: 0;
  overflow: hidden;
  display: flex;
  .menu-wrapper{
    flex:0 0 80px; //等分 缩放 占位
    width: 80px;
    background-color: #f3f5f7;
    color: rgb(20, 20, 20);
    .menu-list{
      font-size: 12px;
      .menu-item{
        display: table;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
        &.current{
          
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background-color: #fff;
          font-weight: 700;
          @include border-2px(blue);
          span{
            @include border-none();
          }
        }
        .menu{
          display: table-cell;
          vertical-align: middle;
          // width: 56px;
          width: 80px;
          @include border-1px(rgba(7,17,27,0.1))
        }
      }
    }
  }
  .foods-wrapper{
    flex: 1 ;
    .food-list{
      .title{
        margin: 0px;
        padding-left: 14px;
        height: 26px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 26px;
        // width: 100%;
        background-color: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item{
        display: flex;
        // padding: 18px;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child{
          @include border-none();
          margin-bottom:0;
        }

        .icon{
          flex: 0 0 57px;
          img{
            width: 57px;
          }
        }
        .content{
          flex: 1;
          padding: 2px 0px 0px 10px;
          .name{
            margin: 0 0 8px 0;
            font-size: 14px;
            line-height: 14px;
            color: rgb(7,17,27);
          }
          .desc{
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            margin-bottom: 8px;
          }
          .extra{
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            .count{
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
              &::first-letter{
                font-size: 10px;
                font-weight: normal;
                color: black;
              }
            }
            .old-price{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
