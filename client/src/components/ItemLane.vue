<template>
<div class="row">
    <ItemComponent :item="{img: {src: 'https://wrbbradio.org/wp-content/uploads/2021/05/POR.jpg'}, title: 'nurture', desc: 'Artist: Porter Robinson'}"/>
    <ItemComponent :item="{img: {src: 'https://wrbbradio.org/wp-content/uploads/2021/05/POR.jpg'}, title: 'nurture', desc: 'Artist: Porter Robinson'}"/>
    <ItemComponent :item="{img: {src: 'https://wrbbradio.org/wp-content/uploads/2021/05/POR.jpg'}, title: 'nurture', desc: 'Artist: Porter Robinson'}"/>
    <ItemComponent :item="{img: {src: 'https://wrbbradio.org/wp-content/uploads/2021/05/POR.jpg'}, title: 'nurture', desc: 'Artist: Porter Robinson'}"/>
    <ItemComponent :item="{img: {src: 'https://wrbbradio.org/wp-content/uploads/2021/05/POR.jpg'}, title: 'nurture', desc: 'Artist: Porter Robinson'}"/>
</div>
    
  
</template>

<script>
import ItemComponent from '@/components/ItemComponent.vue';

export default {
  name: 'ItemLane',
//   props: {
//     item: Object,

//   },
  components:{
    ItemComponent
  }
  
}
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
postData("/api/top-artists", {"type": "artists",
"limit": "5", "access_token": localStorage.getItem("access_token")})
.then(response => console.log(response))
// .then(info => {
//     console.log(info);
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
}

</style>
