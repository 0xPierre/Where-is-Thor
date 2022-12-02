import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: 'AIzaSyAEzS3uiOUADv rHRQBRimhy1pRdTebX088',
    authDomain: 'nuitdelinfo2022-a9a6b.firebaseapp.com',
    projectId: 'nuitdelinfo2022-a9a6b',
    storageBucket: 'nuitdelinfo2022-a9a6b.appspot.com',
    messagingSenderId: '408641081171',
    appId: '1:408641081171:web:920a9a6bc2d8a7e3701ba6'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { db }
