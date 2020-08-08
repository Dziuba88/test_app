import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAR2uZxG1ftyO0xktiOWn5WJLBkwAopFQE",
  authDomain: "learn-react-b7a96.firebaseapp.com",
  databaseURL: "https://learn-react-b7a96.firebaseio.com",
  projectId: "learn-react-b7a96",
  storageBucket: "learn-react-b7a96.appspot.com",
  messagingSenderId: "39316749702",
  appId: "1:39316749702:web:b41cc33ed52967449f8007"
}

firebase.initializeApp(firebaseConfig);

export default firebase;

