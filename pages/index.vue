<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>トップページです</p>
      <GmapMap
       :center="{lat:10, lng:10}"
       :zoom="7"
       map-type-id="terrain"
       style="width: 500px; height: 300px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'Home',
  data () {
    return {
      // latが緯度、lngが経度
      markers: [{ position: { lat: 10, lng: 10 } }],
    }
  },
}
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
