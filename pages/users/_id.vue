<template>
    <div>
        <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
        @rightclick="place($event)"
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

    </div>
</template>

<script>
export default {
    methods:{
        place(event){
            if(event) {
                let lat = event.latLng.lat()
                let lng = event.latLng.lng()
                console.log(lat + ", " + lng)
            }
        },
    },
}
</script>
<style scoped>

</style>