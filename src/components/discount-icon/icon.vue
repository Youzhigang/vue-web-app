<template>
  
      <i 
      class="icon" :class="test[index]" 
      :style="{width:size+'px', height:size+'px', backgroundSize:size+'px'}">
      </i>
      
</template>


<script>
export default {
  name: 'vicon',
  props: {
    index: {
      type: Number
    },
    size: {
      type: String  // 白底 _1:24@2x 36@3x  // _2: 32@2x 48@3x
                    // 反色 _3:24@2x 36@3x   _4: 32@2x 48@3x
    },
    styl: {
        type: String // _1  _2 _3 _4
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {
    test () {
        return this.classMap.map(
            (item, index) => {
                return item + this.styl
            }
        )
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../common/styles/mixin.scss';

.icon{
    display: inline-block;
    vertical-align: bottom;
    &.decrease_4{
        @include bg-image('decrease_4');
    }
     &.discount_4{
        @include bg-image('discount_4');
    }
    &.guarantee_4{
        @include bg-image('guarantee_4');
    }
    &.special_4{
        @include bg-image('special_4');
    }
     &.invoice_4{
        @include bg-image('invoice_4');
    }
    &.decrease_3{
        @include bg-image('decrease_3');
    }
    &.discount_3{
        @include bg-image('discount_3');
    }
    &.guarantee_3{
        @include bg-image('guarantee_3');
    }
    &.invoice_3{
        @include bg-image('invoice_3');
    }
    &.special_3{
        @include bg-image('special_3');
    }
    &.decrease_2{
        @include bg-image('decrease_2');
    }
    &.discount_2{
        @include bg-image('discount_2');
    }
    &.guarantee_2{
        @include bg-image('guarantee_2');
    }
    &.invoice_2{
        @include bg-image('invoice_2');
    }
    &.special_2{
        @include bg-image('special_2');
    }
    &.decrease_1{
        @include bg-image('decrease_1');
    }
    &.discount_1{
        @include bg-image('discount_1');
    }
    &.guarantee_1{
        @include bg-image('guarantee_1');
    }
    &.invoice_1{
        @include bg-image('invoice_1');
    }
    &.special_1{
        @include bg-image('special_1');
    }
}
</style>
