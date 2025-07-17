<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 item d-flex justify-content-between">
        <div v-for="(section, i) in listOfFooterItem" :key="i">
          <h3>{{ section.title }}</h3>
          <ul>
            <li
              v-for="([key, value], idx) in Object.entries(section).filter(
                ([k]) => k !== 'title'
              )"
              :key="idx"
            >
              <a href="#">{{ value }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 item">222</div>
    </div>
  </div>
</template>
<script setup lang="js">
import {reactive} from 'vue'
let props = defineProps(['listOfFooterItem'])
const listOfFooterItem = reactive([
{
    title: 'SUPPORT',
    faq: 'FAQ & Support',
    orderStatus: 'Order Status',
    startReturn: 'Start a Return',
    shippingPolicy: 'Shipping Policy'
},
{
    title: 'INFO',
    aboutUs: 'About US',
    privacyPolicy: 'Pricate Policy',
    terms: 'Terms & Conditions'
},
{
    title: 'SHOP',
    artificialFlowers: 'Artificial Flowers',
    artificialPlants: 'Artificial Plants',
    bestSellers: 'Best Sellers',
    giftCard: 'Gift Card'
}])
</script>
<style scoped lang="scss">
.container-fluid {
  margin-top: 80px;
  .item {
    border: 1px solid black;
    padding: 60px 66px;
    h3 {
      font: 20px "Neue Plak", sans-serif;
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style-type: none;
        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
}
</style>
