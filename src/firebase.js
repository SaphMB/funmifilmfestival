import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'funmisfilmfestival.firebaseapp.com',
  databaseURL: 'https://funmisfilmfestival.firebaseio.com',
  projectId: 'funmisfilmfestival',
  storageBucket: 'funmisfilmfestival.appspot.com',
  messagingSenderId: '270131375245',
};

const fire = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default fire;
