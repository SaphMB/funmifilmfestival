import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBLX8USqwOXbvTtgxa5oEA1EAVWtZsv2Tk",
  authDomain: "funmisfilmfestival.firebaseapp.com",
  databaseURL: "https://funmisfilmfestival.firebaseio.com",
  projectId: "funmisfilmfestival",
  storageBucket: "funmisfilmfestival.appspot.com",
  messagingSenderId: "270131375245"
};
var fire = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;
