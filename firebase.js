import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyA5F7PeBwC6zSPoPVNRVMMEpW32R15B2-g",
  authDomain: "amazn-yt-clone.firebaseapp.com",
  projectId: "amazn-yt-clone",
  storageBucket: "amazn-yt-clone.appspot.com",
  messagingSenderId: "23163998127",
  appId: "1:23163998127:web:3021ed89787224392ba95a"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
