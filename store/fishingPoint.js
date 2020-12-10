import { db } from '~/plugins/firebase.js'

const fishingPoint = db.collection('fishingPoint')

export const strict = false

export const state = () => ({
    markers: [],
})

export const mutations = {
    setMarkers(state) {
        fishingPoint.get().then( querySnapshot => {
            querySnapshot.forEach(doc => {
                state.markers.push(doc.data())
            })
        })
    },
    setUser(state, payload) {
        state.user = payload
    }
}

export const actions = {
    addNewPoint({ context }, newPointInfo) {
        pointList.set(newPointInfo)
    }
}

export const getters = {
    markers(state) {
        return state.markers
    },
}