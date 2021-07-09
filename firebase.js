// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { fbConfig } from "./env";

var firebaseConfig = {
   apiKey: fbConfig.apiKey,
   authDomain: fbConfig.authDomain,
   projectId: fbConfig.projectId,
   storageBucket: fbConfig.storageBucket,
   messagingSenderId: fbConfig.messagingSenderId,
   appId: fbConfig.appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fbAuth = firebase.auth();
