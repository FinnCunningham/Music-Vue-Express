import { createApp } from 'vue'
import App from './App.vue'

// const app = createApp({});
createApp(App).mount('#app')
// console.log("HIT")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.get("code")){
    let code = urlParams.get("code");
    let url = "/api/spotify-auth?code=" + code;
    fetch(url)
    .then(response => response.json())
    .then(info => {
        // Expiry = 3600
        window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
        localStorage.setItem("access_token", info["access_token"]);
        localStorage.setItem("refresh_token", + info["refresh_token"]);
        localStorage.setItem("expiry", info["timestamp"] + 3600);
        console.log(info)
    }); 
          
    
}

// if(localStorage.getItem("access_token") && localStorage.getItem("expiry") < new Date()){
//     console.log("NOT Expired");
// }else{
//     console.log("expired");
// }
