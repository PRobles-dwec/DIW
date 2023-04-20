var indexedDB = window.indexedDB;
var database = "usersDB";
const DB_STORE_NAME = "users";
const DB_STORE_NAME_2 = "user_logged";
const DB_VERSION = "1";
var db;
var opened = false;

const store = Pinia.defineStore('counter', {
    state: () => ({ 
      users: [], // Array with the users.
      user_logged: null,  // The user logged by default will be null.      
    }),    
    getters: {
        getUserByEmail: function (state) { // Method to get an specific user.
            return function(email) {
                return state.users.filter(u => u.email === email );
            }            
        },
        getUserByNickname: function (state) { // Method to get an specific user.
          return function(nickname) {
              return state.users.filter(u => u.nickname === nickname );
          }            
        },

        getUsers: function (state) { // Method to get all the users.
            return state.users;
        },  
    },
    actions: {
      init() { // Method to innitiate the Pinia DB.
        
        if(opened) {
          db.close();
          opened = false;
        }

        var req = indexedDB.open(database, DB_VERSION);

        req.onsuccess = function(e) {
          db = this.result;
          console.log("Database opened");
          opened = true;       
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
        
        /* try {
            this.users = JSON.parse(localStorage.getItem("users"));
        } catch (e) {
            this.users = [];
        }
        
        if(this.users === null) {
            this.users = [];
        }

        try {
            this.user_logged = localStorage.getItem("user_logged");
        } catch (e) {
            this.user_logged = null;
        }   */
      },

      readUsers(db) {
        console.log("Reading the users");
        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);

        var result = [];
        var req = store.openCursor();

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
        var store = tx.objectStore(DB_STORE_NAME_2);

        var result = [];
        var req = store.openCursor();

        req.onsuccess = function(e) {
          var cursor = e.target.result;

          if(cursor) {
            result.push(cursor.value);
            console.log(cursor.value);
            cursor.continue();
          } else {
            console.log("No users logged.");
            console.log(result);            
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

      deleteUserLogged() { // Method to delete the user logged
        console.log(this.user_logged);

        var tx = db.transaction(DB_STORE_NAME_2, "readwrite");

        var store = tx.objectStore(DB_STORE_NAME_2);

        var request = store.delete(this.user_logged);

        request.onsuccess = function() {
          console.log("The user that was logged was deleted." + request.result);
        };

        request.onerror = function(e) {
          console.log("There was an error deleting the user logged." + e.target.errorCode);
        };

        // localStorage.removeItem("user_logged");
        this.user_logged = null;
      },

      deleteUser() {
        console.log("Deleting User");
        console.log(this.user_logged);

        let user = this.getUserByNickname(this.user_logged);
        console.log(user[0]);
        console.log({...user[0].nickname});


        let tx = db.transaction(DB_STORE_NAME, "readwrite");

        let store = tx.objectStore(DB_STORE_NAME);

        let request = store.delete();

        request.onsuccess = function() {
          console.log("The user was deleted." + request.result);
        };

        request.onerror = function(e) {
          console.log("There was an error deleting the user. " + e.target.errorCode);
        };
      },

      addUser(user) { // Method to add an user
        console.log("Adding User");
        this.users.push(user);
        console.log(user);        

        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);

        try {
          var req = store.add(user);
        } catch(e) {
          console.log("Catch");
        }

        req.onsuccess = function (e) {
          console.log("User added");
        };

        req.onerror = function (e) {
          console.log("Error adding user");
        };

        //localStorage.setItem("users", JSON.stringify(this.users));              
      },

      updateuserlogged(nickname) { /* This method is to update the user that is actually logged. It will update the nickname. */
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
          console.log("Error updating the user" + e.target.errorCode);
        };
        
        //localStorage.setItem("user_logged", nickname);      
      },
    },
  });
  
  export default store