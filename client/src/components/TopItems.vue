<template>
<div>
  <div v-for="item in items" :key="item.id" class="item">
    <img :src="item.album.images[2].url" :width="item.album.images[2].width" :height="item.album.images[2].height">
    <h1>{{item.name}}</h1>

  </div>
</div>
</template>

<script>

export default {
  name: 'TopItems',
  props: {
    id: String
  },
  data() {
    return {
      //...
      items: []
    };
  },
  created(){
    postData("/api/artist-top", {"id": this.id, "access_token": localStorage.getItem("access_token")})
    .then(response => {
      console.log(response)
      this.items = response.tracks;
    });
    
  },
  components:{
  }
  
}


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$item-width: 200px;
h1{
    margin: 0px;
}
p{
    margin: 0px;
}
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
.row{
  display: flex;
  justify-content: center;
}

.item{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

</style>
