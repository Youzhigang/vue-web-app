<template>
  <div id="app">
    <vheader :seller='seller'></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--<div class="content">
      content
    </div>-->
    <keep-alive>
    <router-view :seller='seller' :seller_id='seller_id'></router-view>
    </keep-alive>
  </div> 
</template>

<script>
import vheader from './components/header/header'
import { getUrlParam } from './common/js/utils.js'

const ERR_OK = 200
export default {
  name: 'app',
  data () {
    return {
      seller: {},
      seller_id: getUrlParam('id') || 'test'
    }
  },
  mounted () {
    this.$http.get('/api/seller?id='+this.seller_id).then(
      res => {
        if (res.status === ERR_OK) {
          console.log(res.data.seller)
          this.seller = res.data.seller
          // this.$set(this.seller, 'id', this.seller_id)
          // this.seller = Object.assign({}, {'id': this.seller_id}, res.data.seller);
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  },
  components:{ 
    vheader
  }
}
</script>

<style lang="scss" scoped>

@import './common/styles/mixin.scss'; 

#app{
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    
    // border-bottom: 1px solid rgba(7,17,27,0.1);
    @include border-1px(rgba(7,17,27,0.1));
      &-item{
        flex:1;
        text-align: center;
        font-size: 14px;
       
        a{
          display: inline-block;
          width: 100%;
          color: rgb(77, 85, 93);
          text-decoration: none;
        }
        .router-link-active{
          color:rgb(240, 20, 20);
        }
      }
  }
  
}


</style>



