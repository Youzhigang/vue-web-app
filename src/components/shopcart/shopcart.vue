<template>
<div>
  <div class="shopcart">
    <div class="content" @click='toggleList()'>
        <!--左侧自适应-->
        <div class="content-left" >
            <div class="icon-wrapper">
                <div class="icon" :class="[totalCount > 0 ? 'highlight' : '']">
                    <i class="icon-shopping_cart" :class="[totalCount > 0 ? 'highlight' : '']"></i>
                </div>
                <div class="badge" v-show="totalCount > 0">{{totalCount}}</div>
            </div>
            <!--价格-->
            <div class="price">
               ￥{{totalPrice}}元
            </div>
            <!--配送价-->
            <div class="desc">另需配送费￥{{deliveryPrice}} 元</div>
        </div> 
        <!--右侧固定宽度-->
        <div class="content-right">
            <div class="pay" :class="[minPrice < totalPrice ? 'enough' : 'not-enough']" @click.stop='pay()'>
            <!--￥{{minPrice}}元起送-->
            {{payDesc}}
            </div>
        </div> 
    </div>
    <!--滚动的小球-->
    <div class="ball-container">
        <div v-for="ball in balls">
        <transition name="drop" @before-leave="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" :key="ball" class="ball">
                <div class="inner inner-hook"></div>
            </div>
        </transition>
        </div>
    </div>
    <!--购物车商品-->
    <transition name='fold'>
        <div class="shopcart-list" v-show="listShow" >
            <div class="list-header">
                <div class="title">购物车</div>
                <span class="empty" @click='empty()'>清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price"><span>￥{{food.price * food.count}}</span></div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food='food'></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
  </div>
  <transition name='fade'>
    <div class="list-mask" v-show="listShow" @click='hideList()'>
    </div>
  </transition>
</div>

</template>


<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BSroll from 'better-scroll'

export default {
    name: 'shopcart',
    components: {
      cartcontrol
    },
    props: {
       selectFoods: {
            type: Array,
            default () {
                return [
                    {
                        price: 10,
                        count: 1
                    }
                ]
            }
       },
       deliveryPrice: {
           type: Number,
           default: 0
       },
       minPrice: {
           type: Number,
           default: 0
       }
    },
    data () {
        return {
            balls: [
                {show: false},
                {show: false},
                {show: false},
                {show: false},
                {show: false}
            ],
            dropBalls: [],
            fold: true
        }
    },
    computed: {
        totalPrice () {
            let total = 0
            Array.prototype.forEach.call(this.selectFoods, (item) => {
               total += item.price * item.count
            })
            return total
        },
        totalCount () {
            let count = 0
            Array.prototype.forEach.call(this.selectFoods, (item) => {
               count += item.count
            })
            return count
        },
        payDesc () {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`
            } else if (this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice - this.totalPrice}起送`
            } else {
                return '去结算'
            }
        },
        listShow () {
            if (!this.totalCount) {
                this.fold = true // 收起
                return false
            }
            let show = !this.fold
            if (show) {
                if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BSroll(this.$refs.listContent, {
                            click: true
                        })
                    })
                } else {
                    this.scroll.refresh()
                }
            }
            return show
        }
    },
    methods: {
        drop (el) {
            this.balls.every(i => {
                if (!i.show) {
                    i.show = true
                    i.el = el
                    this.dropBalls.push(i)
                    return
                }
            })
        },
        beforeDrop (el) {
            let count = this.balls.length
            while (count) {
                count -= 1
                let ball = this.balls[count]
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect()
                    let x = rect.left - 32
                    let y = -(window.innerHeight - rect.top - 22)
                    el.style.display = 'block'
                    el.style.transform = `translate3d(0, ${y}px,0)`
                    // console.log(el)
                    let inner = el.querySelector('.inner-hook')
                    inner.style.transform = `translate3d(${x}px, 0,0)`
                }
            }
        },
        dropping (el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight
            this.$nextTick(
                () => {
                    el.style.transform = 'translate3d(0,0,0)'
                    let inner = el.querySelector('.inner-hook')
                    inner.style.transform = 'translate3d(0,0,0)'
                    el.addEventListener('transitionend', done)
                })
        },
        afterDrop (el) {
            let ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
                el.style.diplay = 'none'
            }
        },
        toggleList () {
            console.log(123)
            if (!this.totalCount) {
                return
            }
            this.fold = !this.fold
        },
        empty () {
            this.selectFoods.forEach(
                (i) => {
                    i.count = 0
                }
            )
        },
        hideList () {
            this.fold = true
        },
        pay () {
            if (this.totalPrice < this.minPrice) {
                return
            } else {
                alert(this.totalPrice + this.deliveryPrice)
            }
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../common/styles/mixin.scss';

.shopcart{
    position: fixed;
    height: 48px;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    
    .content{
        height: 100%;
        display: flex;
        background-color: #141d27;
        .content-left{
            flex:1;
            font-size: 0;
            .icon-wrapper{
                display: inline-block;
                position: relative;
                top: -10px; // 58-48
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                vertical-align: top;
                border-radius: 50%;
                background-color: #141d27; //2b43c
                .icon{
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    background-color: #2b343c;
                    text-align: center;
                     &.highlight{
                        background: rgb(0, 160, 220);
                     }
                    .icon-shopping_cart{
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                        &.highlight{
                            background: rgb(0, 160, 220);
                            color: #fff;
                        }
                    }
                }
                .badge{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background-color: rgb(240,20,20);
                    box-shadow: 0 4px 8px 0px rgba(0,0,0,0.4);
                }
            }
            .price{
                display: inline-block;
                line-height: 24px;
                margin-top: 12px;
                padding-right: 12px;
                border-right: 1px solid rgba(255, 255, 255,0.1);
                font-size: 12px;
                font-weight: 700;
                color:#2b343c;
            }
            .desc{
                display: inline-block;
                font-size: 14px;
                color: rgba(255,255, 255, 0.4);
                line-height: 24px;
                padding-left: 20px;
            }
        }
        .content-right{
            flex: 0 0 105px;
            width: 105px;
            .pay{
                background-color: rgba(255,255, 255, 0.4);
                font-size: 14px;
                font-weight: 700;
                line-height: 48px;
                color:#2b343c;
                text-align: center;
                &.not-enough{
                    background-color: rgba(255,255, 255, 0.4);
                }
                &.enough{
                    background-color: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .ball-container{
        .ball{
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: -200;
            transition:.5s  all cubic-bezier(.34,-0.4,.94,1.06);
            .inner{
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition:.4s all linear;
            }
        }
    }
    .shopcart-list{
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transition: .5s all linear;
        transform: translate3d(0, -100%, 0); // 最终状态
        &.fold-enter{
            transform: translate3d(0, 0, 0);
            // color: green
        }
        &.fold-enter-active{
        //    color: red
        }
        &.fold-leave{
            transform: translate3d(0, -100%, 0);
        }
        &.fold-leave-active{
            transform: translate3d(0, 0, 0);
        }
        .list-header{
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background-color: #f3f5f7;
            // border-bottom: 1px solid rgba(7,17,27,0.1)
            @include border-1px (rgba(7,17,27,0.1));
            .title{
                float: left;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            .empty{
                float: right;
                font-size: 12px;
                color:rgb(0,160,220);
            }
        }
        .list-content{
            padding: 0 16px;
            max-height: 217px;
            overflow: hidden;
            background-color: #fff;
            .food{
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                @include border-1px (rgba(7,17,27,0.1));
                .name{
                    line-height: 24px;
                    font-size: 14px;
                    color:rgb(7,17,27);

                }
                .price{
                    position: absolute;
                    color:rgb(240,20,20);
                    right:100px;
                    bottom: 12px;
                    font-size: 14px;
                    line-height: 24px;
                    font-weight: 700;
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    bottom: 10px;
                    right: 0;
                }
            }
        }
    }
}
.list-mask{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    transition: .5s all linear;
    background-color: rgba(7,17,27,0.6);
    -webkit-backdrop-filter: blur(10px);
    
    &.fade-enter{
        opacity: 0;
        background-color: rgba(7,17,27,0.6);
    }
    &.fade-enter-active{

    }
    &.fade-leave{
        // opacity: 0;
        background-color: rgba(7,17,27,0.6);
    }
    &.fade-leave-active{
        opacity: 0;
        background-color: rgba(7,17,27,0.6);
    }
}
</style>
