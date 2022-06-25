<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    >

    <div style="position: relative">
        <SpotifyAuth/>
        <div v-if="route.name == 'Home'"> 
          <ItemLane type="artists" @changeRoute="(id) => {route = {name: 'TopItems', data: id}}"/>
          <ItemLane type="tracks" @changeRoute="(id) => route = {name: 'TopItems', data: id}"/>
        </div>
        <div v-else-if="route.name == 'TopItems'">
          <TopItems :id="route.data"/>
        </div>
      <div />
    </div>
  </div>
</template>

<script>
import SpotifyAuth from '@/components/SpotifyAuth.vue';
import ItemLane from '@/components/ItemLane.vue';
import TopItems from '@/components/TopItems.vue';

export default {
  
  name: 'Home-Page',
  components: {
    SpotifyAuth,
    ItemLane,
    TopItems
  },
  data() {
    return {
      //...
      route: {name: "Home", data: ""}
    };
  },
  

}

</script>

<style lang="scss">
body{
  background-color: #2c3e50;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  color: #fff;
}
.short-it {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
  + div {
    position: absolute;
    bottom: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 40px;
    background-image: linear-gradient(to bottom, transparent, #fff)
  }
}
nav ul {
  margin-top: 30px
}
</style>