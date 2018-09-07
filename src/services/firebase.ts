import firebase from 'firebase';
import 'firebase/firestore';
import { FIREBASE } from '../config';

const app = firebase.initializeApp(FIREBASE);

export default app;
