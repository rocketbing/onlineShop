<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>
<script lang="js" setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import {ref,onBeforeMount,reactive,onMounted} from 'vue';
import {RouterView,useRouter} from 'vue-router'
import {useUserStore} from '@/store/user.js';
import {storeToRefs} from 'pinia';
const userStore = useUserStore();
const {name,result} = storeToRefs(userStore)
let router = useRouter();
let sentence = ref('')
function changeName() {
    userStore.updateName('康乃馨')
}
function getSentece() {
   userStore.reqUserInfo()
}
onMounted(async () => {
  try {
    if(userStore.token && userStore.id) {
      await userStore.reqUserInfo();
    } else {
      router.push('/login')
    }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
});
</script>
<style scoped></style>
