<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>トップページです</p>
      <p>currentPos:{{ currentPos }}</p>
      <p>infoWindowOpen:{{ infoWindowOpen }}</p>
      <p>コンテンツ{{ infoContent }}</p>
      <p>infoWindowPos:{{ infoWindowPos }}</p>
      <p>state{{ this.$store.state }}</p>
      <p>地図の中心 {{center}}</p>
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
        <GmapMarker
          :key="index"
          v-for="(m, index) in fishingPoints"
          :position="{lat:m.position.latitude, lng:m.position.longitude}"
          :clickable="true"
          :icon = "markerOptions"
          @click="toggleInfoWindow(m)"
        />
        <GmapMarker
          v-for="m in currentPos"
          :key="m.latitude"
          :animation="2"
          :position="m"
          :clickable="true"
          :draggable="true"
        />
        <GmapInfoWindow 
          v-for="m in infoWindowPos"
          :key="m.latitude"
          :position="m"
          :opened="infoWindowOpen"
          :options="infoWindowOptions"
          @closeclick="closeInfoWindow"
        ><div v-html="infoContent"></div>
        </GmapInfoWindow>
      </GmapMap>
    </main>
  </div>
</template>

<script>
// import { gmapApi } from 'vue2-google-maps'
import { mapGetters } from 'vuex'
export default {
  layout: "Home",
  // computed: {
  //   google: gmapApi
  // },
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
    this.$store.dispatch('fishingPoint/setFishingPoints')
  },
  computed: {
    },
  data() {
    return {
      // ...mapGetters('fishingPoint',{
      //   fishingPoints:'fishingPoints', currentPos:'currentPos', infoWindowPos:'infoWindowPos', infoWindowOpen:'infoWindowOpen', infoContent:'infoContent'
      // }),
      fishingPoints: this.$store.getters['fishingPoint/fishingPoints'],
      currentPos: this.$store.getters['fishingPoint/currentPos'],
      infoWindowPos: this.$store.getters['fishingPoint/infoWindowPos'],
      infoWindowOpen: this.$store.getters['fishingPoint/infoWindowOpen'],
      infoContent: this.$store.getters['fishingPoint/infoContent'],
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
    };
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
      // this.currentPosition = {}
      // this.currentPosition = {lat: currentLat, lng: currentLng}
      this.$store.commit('fishingPoint/setCurrentPosMarker', {currentLat, currentLng})
    },
    //マーカークリックでinfoWindow表示
    toggleInfoWindow(marker) {
      this.$store.commit('fishingPoint/setInfoWindow', marker)
      this.$store.dispatch('fishingPoint/setInfoContent', marker)
      // this.infoWindowPos = { lat:marker.position.latitude, lng:marker.position.longitude }
      // this.infoContent = this.getInfoWindowContent(marker)
      // this.infoWindowOpen = true
    },
    closeInfoWindow() {
      // this.infoWindowOpen = false
      this.$store.commit('fishingPoint/closeInfoWindow')
    },
    //infoWindowのコンテンツ取得
    // getInfoWindowContent(marker) {
    //   return (
    //     `<div class="card">
    //     <div class="card-image">
    //       <figure class="image is-4by3">
    //         <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
    //       </figure>
    //     </div>
    //     <div class="card-content">
    //       <div class="media">
    //         <div class="media-content">
    //           <p class="title is-4">${marker.name}</p>
    //         </div>
    //       </div>
    //       <div class="content">
    //         ${marker.description}
    //         <br>
    //         <time datetime="2020-11-30">登録：${marker.data_build_String}</time>
    //       </div>
    //     </div>`
    //   )
    // },
    //マーカーサイズを動的に変更
    changeMarkerSize() {
      // console.log('change!')
      // console.log(this.google)
      // console.log(this.google.maps)
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