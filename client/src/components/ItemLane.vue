<template>
<h2>Top {{ type }}</h2>
<div class="row">
  <div v-for="item in items" :key="item.id">
      <ItemComponent v-if="items.length > 0" :item="{img: {src: item.img}, title: item.title, desc: item.desc, id: item.id}" @click="$emit('changeRoute', item.id)"/>
  </div>
</div>
    
</template>

<script>
import ItemComponent from '@/components/ItemComponent.vue';

export default {
  name: 'ItemLane',
  props: {
    type: String
  },
  data() {
    return {
      //...
      items: []
    };
  },
  created(){
    postData("/api/top-artists", {"type": this.type,
    "limit": "5", "access_token": localStorage.getItem("access_token")})
    .then(response => {
      if(this.type == "artists"){
        let newArray = [];
        response.items.forEach(item => {
          let img = item.images[0].url;
          let title = item.name;
          let desc = "Artist";
          let id = item.id;
          newArray.push({img: img, title: title, desc: desc, id: id})
        });
        this.items = newArray;
      }else{
        let newArray = [];
        response.items.forEach(item => {
          let img = item.album.images[0].url;
          let title = item.name;
          let desc = item.artists[0].name;
          newArray.push({img: img, title: title, desc: desc})
        });
        this.items = newArray;
      }
      
    })
    
  },
  components:{
    ItemComponent
  },

  
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
// postData("/api/top-artists", {"type": "artists",
// "limit": "5", "access_token": localStorage.getItem("access_token")})
// .then(response => {
//   console.log(response.items)
  
// })
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

</style>
