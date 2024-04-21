import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDQOI0p20fvbgzVwUteKlDS_IypY-wcX_s",
    authDomain: "smartscan-41152.firebaseapp.com",
    projectId: "smartscan-41152",
    storageBucket: "smartscan-41152.appspot.com",
    messagingSenderId: "758100559474",
    appId: "1:758100559474:web:b953fe9f1e49fbd4cde4eb"
};

const app = initializeApp(firebaseConfig);
export const fileDatabase = getStorage(app)