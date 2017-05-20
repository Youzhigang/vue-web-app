<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click='reduceCart($event)'></div>
        <div class="cart-count" v-show="food.count>0"> {{food.count}}</div>
        <div class="cart-increase icon-add_circle" @click='addCart($event)'></div>
    </div>  
</template>

<script>
// import Vue from 'vue'

export default {
  name: 'cartcontrol',
  props: {
      food: {
          type: Object
      }
  },
  mounted () {
     // console.log(this.food)
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
        .cart-count{
            display: inline-block;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 24px;
            vertical-align: top;
        }
      
    }
</style>
