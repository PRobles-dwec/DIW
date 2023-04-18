const store = Pinia.defineStore('counter', {
    state: () => ({ 
      users: [], // Array with the users.
      user_logged: null,  // The user logged by default will be null.      
    }),    
    getters: {
        getUserByEmail: function (state) { // // Method to get an specific user.
            return function(email) {
                return state.users.filter(u => u.email === email );
            }            
        },

        getUsers: function (state) { // Method to get all the users.
            return state.users;
        },  
    },
    actions: {
      init() { // Method to innitiate the Pinia DB.
        console.log("Starting Pinia DB.");
  
        try {
            this.users = JSON.parse(localStorage.getItem("users"));
        } catch (e) {
            this.users = [];
        }
        
        if(this.users === null) {
            this.users = [];
        }

        try {
            this.user_logged = localStorage.getItem("user_logged");
        } catch (ex) {
            this.user_logged = null;
        }  
      },

      deleteUserLogged() { // Method to delete the user logged
        console.log("The user that was logged was deleted.");
        localStorage.removeItem("user_logged");
        this.user_logged = null;
      },

      addUser(user) { // Method to add an user
        console.log("Adding User");
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));               
      },

      updateuserlogged(nickname) { /* This method is to update the user that is actually logged. It will update the nickname. */
        console.log("Updating the user logged.");
        this.user_logged = nickname;
        localStorage.setItem("user_logged", nickname);      
      },
    },
  });
  
  export default store