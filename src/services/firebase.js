import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export default function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyB1M0tWASQP1HGEKXt9JwHSjw7TiDLW_qk",
        authDomain: "d178c26912257.firebaseapp.com",
        databaseURL: "https://d178c26912257-default-rtdb.firebaseio.com",
        projectId: "d178c26912257",
        storageBucket: "d178c26912257.appspot.com",
        messagingSenderId: "571570452018",
        appId: "1:571570452018:web:7e79045a19e8f9d40fee2b",
        measurementId: "G-RRF1RZWJFH"
    };
    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
}

