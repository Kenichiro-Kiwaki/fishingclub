<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>トップページです</p>
      <GmapMap
        :center="center"
        :zoom="13"
        @zoom_changed="changeMarkerSize"
        @rightclick="place($event)"
        @click="setMarker($event)"
        map-type-id="terrain"
        style="width: 900px; height: 500px"
        :options="{
          streetViewControl: false,
          styles: [
            {
              featureType: 'administrative.land_parcel',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'administrative.neighborhood',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            }
          ]
        }"
      >
        <GmapInfoWindow 
          :key="m.position.lat"
          v-for="m in markers" 
          :position="m.position"
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
          :icon = "markerOptions"
          @click="toggleInfoWindow(m)"
        />
        <GmapMarker
          :key="m.lat"
          v-for="m in currentPositionMarker"
          animation: google.maps.Animation.DROP
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
import {gmapApi} from 'vue2-google-maps'
export default {
  layout: "Home",
  computed: {
    google: gmapApi
  },
  data() {
    return {
      markers: [
        { position: { lat: 35.6811884, lng: 139.7671906 } },
        { position: { lat: 35.60145749975808, lng: 139.6359324124926} }
      ],
      currentPositionMarker: [],
      center: {lat: 35.6811884, lng: 139.7671906},
      markerOptions: {
        url: require('@/assets/icon/fish_man.png'),
        size: {width: 60, height: 60, f: 'px', b: 'px'},
        scaledSize: {width: 40, height: 50, f: 'px', b: 'px'}
      },
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowOpen: false
    };
  },
  mounted() {
    //現在地の取得
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
      this.currentPositionMarker = []
      this.currentPositionMarker.push({lat: currentLat, lng: currentLng})
    },
    //マーカークリックでinfoWindow表示
    toggleInfoWindow() {
      console.log(this.infoWindowOpen)
      this.infoWindowPos = this.markers.position
      this.infoWindowOpen = true
      console.log(this.infoWindowOpen)
    },
    //マーカーサイズを動的に変更
    changeMarkerSize() {
      console.log('change!')
      console.log(this.google)
      console.log(this.google.maps)
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
