// import { faDove } from '@fortawesome/free-solid-svg-icons'
import { db } from '~/plugins/firebase.js'

const fishingPoint = db.collection('fishingPoint')

export const strict = false

export const state = () => ({
  fishingPoints: [],
  currentPos: [],

  infoWindowPos: [],
  infoWindowOpen: false,
  infoContent: '',
})

export const mutations = {
  setFishingPoints(state, data) {
    state.fishingPoints.push(data)
  },
  setCurrentPosMarker(state, {currentLat, currentLng}) {
    //オブジェクトには要素を追加してもリッスンされないのが問題ではないだろうか
    // state.currentPos = Object.assign({}, this.currentPos, {lat: currentLat, lng:currentLng})    
    //２回目以降、アニメーションが反映されない。
    state.currentPos.splice(0, 1, {lat: currentLat, lng: currentLng})
  },
  setInfoWindow(state, marker) {
    state.infoWindowPos.splice(0, 1, { lat: marker.position.latitude, lng: marker.position.longitude })
    //infowindowOpenの真偽値が書き換わりません！gettersが反応しません！
    state.infoWindowOpen = true
  },
  setInfoWindowContent(state, infoContent) {
    state.infoContent = infoContent
  },
  closeInfoWindow({ state }) {
    state.infoWindowOpen = false
  }
}

export const actions = {
  setFishingPoints({ commit }) {
    fishingPoint.get().then( querySnapshot => {
      querySnapshot.forEach(doc => {
        fishingPoint.doc(doc.id).set(
          { data_build_String: doc.data().data_build.toDate().toLocaleString() },
          { merge: true }
        )
        commit('setFishingPoints', doc.data())
      })
    })
  },
  getInfoWindowContent(marker) {
    return (
    `<div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${marker.name}</p>
          </div>
        </div>
        <div class="content">
          ${marker.description}
          <br>
          <time datetime="2020-11-30">登録：${marker.data_build_String}</time>
        </div>
      </div>`
    )
  },
  async setInfoContent({ commit, dispatch }, marker) {
    const infoContent = await dispatch('getInfoWindowContent', marker)
    commit('setInfoWindowContent', infoContent)
  }
  // addNewPoint({ context }, newPointInfo) {
  //     pointList.set(newPointInfo)
  // }
}

export const getters = {
  fishingPoints(state) {
    return state.fishingPoints
  },
  currentPos(state) {
    return state.currentPos
  },
  infoWindowPos(state) {
    return state.infoWindowPos
  },
  infoWindowOpen(state) {
    return state.infoWindowOpen
  },
  infoContent(state) {
    return state.infoContent
  }
}