<template>
  <div v-if="!tokenValid">
    <a href="/api/login">Login</a>
  </div>
</template>

<script>
export default {
  name: 'SpotifyAuth',
  props: {
    msg: String,
  },
  computed:{
    tokenValid(){
        if(localStorage.getItem("access_token") && localStorage.getItem("expiry") > Math.floor(Date.now() / 1000)){
          return true;
        }else{
          return false;
        }
      }
  },
  data(){
    return{
      expiry: localStorage.getItem("expiry")

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
