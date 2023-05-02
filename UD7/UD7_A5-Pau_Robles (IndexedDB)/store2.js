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

    readUsers(db, afterInit) {
      console.log("Reading the users");
      var tx = db.transaction(DB_STORE_NAME, "readonly");
      var dbstore = tx.objectStore(DB_STORE_NAME);

      var result = [];
      var req = dbstore.openCursor();

      req.onsuccess = function(e) {
        var cursor = e.target.result;

        if(cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          console.log("Users:");
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
        afterInit();
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
          cursor.continue();
        } else {
          console.log("UserLogged:");  
          console.log(result[0].nickname);
        }

        const s = store();
        
        s.user_logged = result[0].nickname;

        if (result[0].nickname !== null){
          s.user_logged = result[0].nickname;
        } else {
          s.user_logged = null;
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
      
      tx.oncomplete = function() {
        console.log("Tx completed");
        db.close();
        opened = false;
      }
    },

    deleteUserLoggedIndexedDb(db, userlogged) { // Method to delete the user logged
      console.log(userlogged);

      var tx = db.transaction(DB_STORE_NAME_2, "readwrite");

      var dbstore = tx.objectStore(DB_STORE_NAME_2);

      try {
        var request = dbstore.delete(userlogged);
      } catch(e) {
        console.log("Catch");
      }
      
      request.onsuccess = function() {
        console.log("The user that was logged was deleted");

        const s = store();
        s.user_logged = userlogged;
        s.user_logged = null;
      };

      request.onerror = function(e) {
        console.log("There was an error deleting the user logged." + e.target.errorCode);
      };
      
      tx.oncomplete = function() {
        console.log("Tx completed");
        db.close();
        opened = false;
      }
    },

    deleteUser(db, userlogged) {
      console.log("Deleting User");
      console.log(userlogged);

      let tx = db.transaction(DB_STORE_NAME, "readwrite");

      let store = tx.objectStore(DB_STORE_NAME);

      let request = store.delete(userlogged);

      request.onsuccess = function() {
        console.log("The user was deleted." + request.result);
      };

      request.onerror = function(e) {
        console.log("There was an error deleting the user. " + e.target.errorCode);
      };

      tx.oncomplete = function() {
        console.log("Tx completed");
        db.close();
        opened = false;
      }
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
      
      tx.oncomplete = function() {
        console.log("Tx completed");
        db.close();
        opened = false;
      }
    },
  }
});

export default store2;