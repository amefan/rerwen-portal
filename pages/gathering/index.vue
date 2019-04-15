<template>
<div>
    <div>活动列表</div>
    <div v-for="(item,index) in list" :key="index">
       <nuxt-link :to="'/gathering/item/'+item.id"> {{item.name}}</nuxt-link>
        </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    asyncData () {
    return axios.get(`http://localhost:9003/gathering`)
    .then((res) => {
      return { list: res.data.data }
    })
  }
}
</script>
