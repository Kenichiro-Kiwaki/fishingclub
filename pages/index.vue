<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>トップページです</p>
      <GmapMap
        :center="center"
        :zoom="13"
        :options="{
          streetViewControl: false,
        }"
        map-type-id="terrain"
        style="width: 900px; height: 500px"
        @rightclick="place($event)"
        @click="setMarker($event)"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
    </main>
  </div>
</template>

<script>
export default {
  layout: "Home",
  data() {
    return {
      markers: [{ position: { lat: 35.6811884, lng: 139.7671906 } }],
      center: {lat: 35.6811884, lng: 139.7671906},
      // clickedLat: , 
      // clickedLng: ,
    };
  },
  mounted() {
    // if(process.client) {}    
    if (!navigator.geolocation) {
      alert('現在地を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。')
      return
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        let currentLat = pos.coords.latitude
        let currentLng = pos.coords.longitude
        this.center = {lat: currentLat, lng: currentLng}
        this.markers = [{ position: { lat: currentLat, lng: currentLng}}]
      }, (error) =>  {
        switch (error.code) {
          case 1: //PERMISSION_DENIED
            alert('位置情報の利用が許可されていません')
            break
          case 2: //POSITION_UNAVAILABLE
            alert('現在位置が取得できませんでした')
            break
          case 3: //TIMEOUT
            alert('タイムアウトになりました')
            break
          default:
            alert('現在位置が取得できませんでした')
            break
        }
      })  
    }    
  },
  methods: {
    //右クリックで座標取得
    place(event) {
      if (event) {
        let clickedLat = event.latLng.lat()
        let clickedLng = event.latLng.lng()
        console.log(clickedLat + ", " + clickedLng)
      }
    },
    setMarker(event) {
      this.markers = [{position: {lat: event.latLng.lat(), lng: event.latLng.lng()} }]
    }
  }
};
</script>

<style>
/* body {
    margin: 0;
    padding: 0;
  } */
#main {
  box-sizing: border-box;
  margin-left: 220px;
  padding: 80px 40px;
  float: left;
}
</style>
