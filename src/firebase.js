import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCm20kAiFgH2nNHDQ0DI3w-7NiHMD4aqwA",
    authDomain: "wedding-d84ba.firebaseapp.com",
    databaseURL: "https://wedding-d84ba-default-rtdb.firebaseio.com",
    projectId: "wedding-d84ba",
    storageBucket: "wedding-d84ba.firebasestorage.app",
    messagingSenderId: "853134578003",
    appId: "1:853134578003:web:9dbe99384f43dd53ebd1a6",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);
