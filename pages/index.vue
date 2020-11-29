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
        <GmapInfoWindow 
          :position="infoWindowPos"
          :opened="infoWindowOpen" 
          :options="infoWindowOptions"
          @closeclick="infoWindowOpen === false"
        >hello world!
        </GmapInfoWindow>
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="toggleInfoWindow(m)"
        />
        <GmapMarker
          :key="key"
          v-for="(m, key) in currentPositionMarker"
          :position="m"
          :clickable="true"
          :draggable="true"
          @click="toggleInfoWindow(m)"
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
      markers: [
        { position: { lat: 35.6811884, lng: 139.7671906 } },
        { position: { lat: 35.60145749975808, lng: 139.6359324124926} }
      ],
      currentPositionMarker: [ {lat: 35.58666933666384, lng: 139.60277402309572}],
      center: {lat: 35.6811884, lng: 139.7671906},
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWindowOpen: false
      // clickedLat: , 
      // clickedLng: ,
    };
  },
  mounted() {
    //現在地の取得
    //現在地だけマーカー変えたい
    // if(process.client) {}    
    if (!navigator.geolocation) {
      alert('現在地を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。')
      return
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        let currentLat = pos.coords.latitude
        let currentLng = pos.coords.longitude
        this.center = {lat: currentLat, lng: currentLng}
        this.markers.push({ position: { lat: currentLat, lng: currentLng}})
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
    //クリック地点にカーソル表示
    setMarker(event) {
      let currentLat = event.latLng.lat()
      let currentLng = event.latLng.lng()
      this.currentPositionMarker.push({lat: currentLat, lng: currentLng})
    },
    //マーカークリックでinfoWindow表示
    toggleInfoWindow() {
      this.infoWindowPos = this.markers.position
      this.infoWindowOpen = true
      console.log(this.infoWindowOpen)
      console.log('hoge')
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
