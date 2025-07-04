<template>
  <Header></Header>
  <RouterView></RouterView>
  <p>{{ sentence }}</p>
  <button @click="getSentece">点我</button>
</template>
<script lang="js" setup>
import Header from '@/components/Header.vue'
import {ref} from 'vue';
import {RouterView,useRouter} from 'vue-router'
import {useUserStore} from '@/store/user.js';
import {storeToRefs} from 'pinia'
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
</script>
<style scoped></style>
