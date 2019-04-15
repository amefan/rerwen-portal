<template>
    <div>
        <h3>{{pojo.name}}</h3>
        <hr>
        <div>{{pojo.detail}}</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    asyncData ({ params }) {
    return axios.get(`http://localhost:9003/gathering/${params.id}`)
    .then((res) => {
      return { pojo: res.data.data}
    })
  }
}
</script>
