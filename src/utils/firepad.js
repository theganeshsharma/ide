import firebase from 'firebase'
import store from '../store/index'

const config = {
  apiKey: 'AIzaSyD1bGr7kMHEWxK0X-oIKWfsZ29QNhjJA5U',
  databaseURL: "https://cb-ide.firebaseio.com/",
  projectId: "cb-ide",
}

firebase.initializeApp(config);

export const getRef = function () {
  let ref = firebase.database().ref();
  let key = store.state.firebase.ref

  if (key) 
    ref = ref.child(key)
  else {
    ref = ref.push()
    console.log("here", ref.key)
    store.commit('firebase/setFirebaseRef', ref.key)
  }

  return ref
}