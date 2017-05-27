<template>
<div class="wrapper">
  <div class="seller">
    <div class="seller-header">
      <div class="name"></div>
      <div class="star-wrapper">
        <star></star>
        <div class="sell-count"></div>
      </div>
      <div class="is-store"></div>
    </div>
    <div class="seller-content">
      <span>起送价</span>
      <span>商家配送</span>
      <span>平均配送时间</span>
    </div>
  </div>
  <split></split>
  <div class="support">
    <div class="title">公共与活动</div>
    <p class="text">

    </p>
    <ul>
      <!--icon-->
      <li></li>  
    </ul>
    <split></split>
    <div class="seller-scene">
      <ul>
        <!--img-->
        <li></li>
      </ul>
    </div>
    <split></split>
    <div class="seller-info">
      <div class="title"></div>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import split from '../split/split';
import star from '../star/star';

export default {
  name: 'seller',
  components: {
    split, star
  }
}
</script>

<style lang='scss' scoped>

</style>
