import FirebaseConfig from '../firebase.config.js';
import Firebase from 'firebase/app';
import 'firebase/firestore';

export default Firebase.initializeApp(FirebaseConfig).firestore();