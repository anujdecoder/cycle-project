import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAqw6hyyEtFNQc_fo66DffWQHTDDXK6b_I',
  authDomain: 'cycle-project-8e606.firebaseapp.com',
  projectId: 'cycle-project-8e606',
  storageBucket: 'cycle-project-8e606.appspot.com',
  messagingSenderId: '223601535964',
  appId: '1:223601535964:web:abcb6b6962767febf1fd19',
  databaseURL: 'https://cycle-project-8e606.firebaseio.com'
}

const app = initializeApp(config)
const auth = getAuth(app)
const firestore = getFirestore(app)

const firebaseConfig = {
  auth,
  firestore
}

export default firebaseConfig
