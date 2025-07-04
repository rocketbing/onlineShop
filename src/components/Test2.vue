<template>
    <div class="container">
        <h2>玩具{{ toy}}</h2>
        <h2>书籍: {{ book }}本</h2>
        <button @click="updateToy">改玩具</button>
    </div>
</template>
<script setup lang="js">
import { ref,onMounted } from 'vue';
let toy = ref('乐高')
let book = ref(100)
defineExpose({toy,book})
function updateToy(){
    toy.value = '乐高'
}

</script>
<style scoped>
.container {
    background-color: aqua;
}
</style>