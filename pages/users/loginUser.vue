<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>ユーザーページです</p>
      <p>ようこそ{{ user.displayName }}さん</p>
      <img :src= "userPhoto" width="60px" height="60px">
      <p><nuxt-link to="/">Homeへ</nuxt-link></p>
      <button class="button is-light" @click="signOut">ログアウト</button>
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
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :icon = "markerOptions"
          @click="toggleInfoWindow(m)"
        />
        <GmapMarker
          :key="m.lat"
          v-for="m in currentPositionMarker"
          :animation="2"
          :position="m"
          :clickable="true"
          :draggable="true"
        />
        <GmapInfoWindow 
          :position="infoWindowPos"
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
export default {
  layout: "Users",
  data() {
    return {
      user: this.$store.getters.user,
      userPhoto: this.$store.getters.user.photoURL
    }
  },
  mounted() {
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
};
</script>

<style>
/* #main {
  box-sizing: border-box;
  margin-left: 220px;
  padding: 80px 40px;
  float: left;
} */
</style>
