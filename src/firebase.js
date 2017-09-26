import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyAC6bKVQ_TIPeen831ndhrcc9IkFhxUvXk",
  authDomain: "funmi-s-film-festival.firebaseapp.com",
  databaseURL: "https://funmi-s-film-festival.firebaseio.com",
  projectId: "funmi-s-film-festival",
  storageBucket: "funmi-s-film-festival.appspot.com",
  messagingSenderId: "243897790581"
};
var fire = firebase.initializeApp(config);
export default fire;
