<template>
    <div class="cartcontrol">
        <transition name='move'>
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click='reduceCart($event)'></div>
        </transition>
        <transition name='show-count'>
            <div class="cart-count" v-show='food.count > 0'> {{food.count}}</div>
        </transition>
        <div class="cart-increase icon-add_circle" @click='addCart($event)'></div>
    </div>  
</template>

<script>
// import Vue from 'vue'

export default {
  name: 'cartcontrol',
  props: {
      food: {
          type: Object // 没有count属性, so $set
      }
  },
  mounted () {
    //  console.log(this.food)
  },
  methods: {
    addCart (e) {
        if (!e._constructed) { // prevent default event
            return
        }
        this.food.count ? this.$set(this.food, 'count', this.food.count += 1)
        : this.$set(this.food, 'count', 1)
       /*
        if (this.food.count) {
            this.$set(this.food, 'count', this.food.count += 1)
        } else {
            this.$set(this.food, 'count', 1)
        }
        */
       },
    reduceCart (e) {
        if (!e._constructed) { // prevent default event
            return
        }
        this.food.count ? this.food.count -= 1 : ''
    }
  }
}
</script>

<style lang="scss">
    .cartcontrol{
        .cart-decrease,.cart-increase{
            display: inline-block;
            padding:0 6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
        }
        .cart-decrease{
            transition: .5s all linear;
            // &.move-enter-active, &.move-leave-active{  //状态结束会被移除
            // }
            &.move-enter{
                opacity: 0;
                transform: translateX(24px) rotateZ(180deg);
            }
            &.move-enter-active{
                opacity: 1;
            }
            &.move-leave{
                opacity: 1;
            }
            &.move-leave-active{
                transform: translateX(24px) rotateZ(180deg);
                opacity: 0;
            }
        }
        .cart-count{
            display: inline-block;
            width: 12px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 24px;
            vertical-align: top;
            transition: .5s all;
            &.show-count-enter-active, &.show-count-leave-active{  //状态结束会被移除
            }
            &.show-count-enter, &.show-count-leave, &.show-count-leave-active{
                opacity: 0;
            }
        }
    }
</style>
