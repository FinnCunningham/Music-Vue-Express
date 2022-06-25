<template>
<div class="item">
    <div class="item-background">
       <div>
            <img class="item-img" :src="item.img.src">
        </div> 
        <div class="item-info">
            <h1>{{item.title}}</h1>
            <p>{{item.desc}}</p>
        </div> 
    </div>
    
    
</div>
    
  
</template>

<script>
export default {
  name: 'ItemComponent',
  props: {
    item: Object,

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$item-width: 200px;
h1{
    margin: 0px;
    font-size: 1.5em;
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
.item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}
.item-background{
    background-color: #374c61;
    padding: 10px;
    border-radius: 10px;
}
.item-img{
    width: $item-width;
    height: $item-width;
    border-radius: 10px;
    object-fit: cover;
}

.item-info{
    display: flex;
    width: $item-width;
    flex-direction: column;
    align-items: flex-start;
}
</style>
