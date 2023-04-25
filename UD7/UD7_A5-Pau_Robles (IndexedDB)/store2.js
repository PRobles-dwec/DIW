import store from "./store.js";

var indexedDB = window.indexedDB;
var database = "usersDB";
const DB_STORE_NAME = "users";
const DB_STORE_NAME_2 = "user_logged";
const DB_VERSION = "1";
var db;
var opened = false;

const store2 = Pinia.defineStore('store2', {
  actions: {
    openDB(onDbCompleted) {
      if(opened) {
        db.close();
        opened = false;
      }

      var req = indexedDB.open(database, DB_VERSION);

      req.onsuccess = function(e) {
        db = this.result;
        console.log("Database opened");
        opened = true;  
        
        onDbCompleted(db);
      }

      req.onerror = function(e) {
        console.log("Error loading database." + e.target.errorCode);
      };

      req.onupgradeneeded = function() {
        console.log("openDb.onupgradeneeded");
        db = req.result;
        var store = db.createObjectStore(DB_STORE_NAME, {keyPath: "id", autoIncrement: true});

        store.createIndex("email", "email", {unique: true});
        store.createIndex("nickname", "nickname", {unique: false});
        store.createIndex("password", "password", {unique: false});  
        
        var store = db.createObjectStore(DB_STORE_NAME_2, {keyPath: "nickname", unique: true});

      };
    },

    readUsers(db) {
      console.log("Reading the users");
      var tx = db.transaction(DB_STORE_NAME, "readonly");
      var dbstore = tx.objectStore(DB_STORE_NAME);

      var result = [];
      var req = dbstore.openCursor();

      req.onsuccess = function(e) {
        var cursor = e.target.result;

        if(cursor) {
          result.push(cursor.value);
          console.log(cursor.value);
          cursor.continue();
        } else {
          console.log("No more users.");
          console.log(result);            
        }

        const s = store();
        s.users = result;
      }

      req.onerror = function(e) {
        console.log("Error reading users: ", e.target.errorCode);
      };

      tx.oncomplete = function() {
        console.log("Tx completed");
        db.close();
        opened = false;
      }
    },

    readUserLogged(db) {
      console.log("Reading the user logged");
      var tx = db.transaction(DB_STORE_NAME_2, "readonly");
      var dbstore = tx.objectStore(DB_STORE_NAME_2);

      var result = [];
      var req = dbstore.openCursor();

      req.onsuccess = function(e) {
        var cursor = e.target.result;

        if(cursor) {
          result.push(cursor.value);
          console.log(cursor.value);
          cursor.continue();
        } else {
          console.log("No users logged.");         
        }

        console.log(result); 
        const s = store();
        try {
          s.users = result;
          console.log(s.users);
        } catch (e) {
          console.log("Error.");
          s.users = null;
        }
        
      };

      req.onerror = function(e) {
        console.log("Error reading user logged: ", e.target.errorCode);
      };

      tx.oncomplete = function() {
        console.log("Tx completed");
        db.close();
        opened = false;
      }
    },

    addUserIndexedDb(db, user) { // Method to add an user
      console.log("Adding User");
      //this.users.push(user);
      console.log(user);        

      var tx = db.transaction(DB_STORE_NAME, "readwrite");
      var dbstore = tx.objectStore(DB_STORE_NAME);

      try {
        var req = dbstore.add(user);
      } catch(e) {
        console.log("Catch");
      }

      req.onsuccess = function (e) {
        console.log("User added");

        const s = store();
        s.users.push(user);

      };

      req.onerror = function (e) {
        console.log("Error adding user");
      };              
    },

    deleteUserLoggedIndexedDb(db, userlogged) { // Method to delete the user logged
      console.log(userlogged);

      var tx = db.transaction(DB_STORE_NAME_2, "readwrite");

      var store = tx.objectStore(DB_STORE_NAME_2);

      var request = store.delete(userlogged);

      request.onsuccess = function() {
        console.log("The user that was logged was deleted." + request.result);

        const s = store();
        s.user_logged = null;
      };

      request.onerror = function(e) {
        console.log("There was an error deleting the user logged." + e.target.errorCode);
      };
      
    },

    deleteUser() {
      console.log("Deleting User");
      console.log(this.user_logged);

      let user = this.getUserByNickname(this.user_logged);
      console.log(user[0]);
      let uniqueuserlogged = {...user[0].nickname};

      let tx = db.transaction(DB_STORE_NAME, "readwrite");

      let store = tx.objectStore(DB_STORE_NAME);

      let request = store.delete(uniqueuserlogged);

      request.onsuccess = function() {
        console.log("The user was deleted." + request.result);
      };

      request.onerror = function(e) {
        console.log("There was an error deleting the user. " + e.target.errorCode);
      };
    },

    updateuserlogged(db, nickname) { /* This method is to update the user that is actually logged. It will update the nickname. */
      console.log("Updating the user logged.");
      this.user_logged = nickname;

      var obj = {nickname: nickname};

      var tx = db.transaction(DB_STORE_NAME_2, "readwrite");
      var store = tx.objectStore(DB_STORE_NAME_2);

      try {
        var req = store.add(obj);
      } catch(e) {
        console.log("Catch");
      }

      req.onsuccess = function(e) {
        console.log("The user was updated.");
      };

      req.onerror = function (e) {
        console.log("Error updating the user");
      };   
    },
  }
});

export default store2;