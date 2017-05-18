<template>
  <div class="showcart">
    <div class="content">
        <!--左侧自适应-->
        <div class="content-left">
            <div class="icon-wrapper">
                <div class="icon">
                    <i class="icon-shopping_cart"></i>
                </div>
                <div class="badge"></div>
            </div>
            <!--价格-->
            <div class="price">
               ￥{{totalPrice}}元
            </div>
            <!--配送价-->
            <div class="desc">另需配送费￥{{deliverPrice}}元</div>
        </div> 
        <!--右侧固定宽度-->
        <div class="content-right">
            <div class="pay">
            ￥{{minPrice}}元起送

            </div>
        </div> 
    </div>
  </div>
</template>

1
<script>
export default {
   name: 'showcart',
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
       deliverPrice: {
           type: Number,
           default: 0
       },
       minPrice: {
           type: Number,
           default: 0
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
        }
    }
}
</script>

<style lang="scss">
.showcart{
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
                    .icon-shopping_cart{
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                    }
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
            }
        }
    }
}
</style>
