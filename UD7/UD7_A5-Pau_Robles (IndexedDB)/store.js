import store2 from "./store2.js";

const store = Pinia.defineStore('users', {
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
      init(afterInit) { // Method to innitiate the Pinia DB.
        
        const s = store2();
        s.openDB(function(db) {
          s.readUserLogged(db);  
          s.readUsers(db, afterInit);
                       
        });     
      },   
      
      addUser(user) { // Method to add an user
        console.log("Adding User");             

        const s = store2();
        s.openDB(function(db) {
          s.addUserIndexedDb(db, user);          
        });
      },

      deleteUserLogged() { // Method to delete the user logged
        console.log(this.user_logged);

        let userlogged = this.user_logged;

        const s = store2();
        s.openDB(function(db) {
          s.deleteUserLoggedIndexedDb(db, userlogged);          
        });

      },

      deleteuser() {
        console.log("Deleting User");
        console.log(this.user_logged);

        let userlogged = this.user_logged;
        const s = store2();
        s.openDB(function(db) {
          s.deleteUser(db, userlogged);
        });

        /* 
          var user = this.getUserByNickname(this.user_logged);
          console.log(user[0]);
          var uniqueuserlogged = {...user[0].nickname};

          let tx = db.transaction(DB_STORE_NAME, "readwrite");

          let store = tx.objectStore(DB_STORE_NAME);

          let request = store.delete(uniqueuserlogged);

          request.onsuccess = function() {
            console.log("The user was deleted." + request.result);
          };

          request.onerror = function(e) {
            console.log("There was an error deleting the user. " + e.target.errorCode);
          }; 
        */
      },

      updateuserlogged(nickname) { /* This method is to update the user that is actually logged. It will update the nickname. */
        console.log("Updating the user logged.");
        this.user_logged = nickname;

        const s = store2();
        s.openDB(function(db){
          s.updateuserlogged(db, nickname);
        });
      },
    },
  });
  
  export default store