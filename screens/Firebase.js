import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDhPkHYe62XDScfsbTp3ifP910YK32rGhA",
    authDomain: "digitize-hackathon.firebaseapp.com",
    databaseURL: "https://digitize-hackathon.firebaseio.com",
    projectId: "digitize-hackathon",
    storageBucket: "digitize-hackathon.appspot.com",
    messagingSenderId: "328433288607"
};

export default class FirebaseManager {

    static myInstance = null;

    _db = "";
    _needsUpdate = true;

    constructor() {
        var app = firebase.initializeApp(firebaseConfig)
        var db = app.firestore()

        db.settings({ timestampsInSnapshots: true }) // fix deprecation error

        this._db = db
    }


    /**
     * @returns {FirebaseManager}
     */
    static getInstance() {
        if (FirebaseManager.myInstance == null) {
            FirebaseManager.myInstance = new FirebaseManager();
        }

        return this.myInstance;
    }

    getDB() {
        return this._db;
    }

    getNeedsUpdate() {
        return this._needsUpdate;
    }

    setNeedsUpdate(val) {
        this._needsUpdate = val;
    }
}