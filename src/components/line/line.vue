<template>
  <div class="line-wrapper">
    <div class="line"></div>
    <div class="center" ><slot></slot></div>
    <div class="line"></div>
  </div>
</template>


<script>
import '../../common/styles/index.scss'

export default {
  name: 'vline'
}
</script>


<style lang="scss" scoped>
@import '../../common/styles/mixin.scss';

.line-wrapper{
    display: flex;
    // margin-bottom: 24px;
    width: 100%;
    .line{
    // width: 112px;
        flex: 1;
        position: relative;
        top: 6px;
        height: 0;
        @include border-1px(rgba(255,255,255,0.2))
    }
    .center{
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 0 12px;
    }
}
</style>

