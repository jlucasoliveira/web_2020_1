import FirebaseConfig from '../firebase.config.js';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export default Firebase.initializeApp(FirebaseConfig);
