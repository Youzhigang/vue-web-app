<template>
  <div class="star" :class="starType">
    <span v-for='item in itemClasses' :class="item" class="star-item" key="item">

    </span>
  </div>
</template>


<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'star',
  props: {
      size: { // 48,36,24
        type: Number
      },
      score: {
        type: Number
      }
  },
  computed: {
    starType () {
      return 'star-' + this.size  // star-36
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2  // 4.4 =>4 4.6 =>4.5
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }

      while (result.length < LENGTH) {
          result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>


<style lang="scss">
@import '../../common/styles/mixin.scss';
  .star{
    font-size: 0;
    display: inline-block;
    .star-item{
       display: inline-block;
       background-repeat: no-repeat;
      
    }
    &.star-48{
     .star-item{
        width: 20px;
        height: 20px;
        margin-right: 23px;
        background-size: 20px 20px;
        
        &.on{
          @include bg-image('star48_on');
        }
        &.half{
          @include bg-image('star48_half');
        }
        &.off{
          @include bg-image('star48_off');
        }
     }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 10px;
        background-size: 15px 15px;
        &.on{
          @include bg-image('star36_on');
        }
        &.half{
          @include bg-image('star36_half');
        }
        &.off{
          @include bg-image('star36_off');
        }
     }
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &.on{
          @include bg-image('star24_on');
        }
        &.half{
          @include bg-image('star24_half');
        }
        &.off{
          @include bg-image('star24_off');
        }
     }
    }
    
  }
</style>
