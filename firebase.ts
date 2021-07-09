import Constants from "expo-constants";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: Constants.manifest.extra.FIREBASE_API,
  authDomain: Constants.manifest.extra.FIREBASE_URL,
  databaseURL: Constants.manifest.extra.FIREBASE_DB,
  projectId: "anthropology-app",
});
