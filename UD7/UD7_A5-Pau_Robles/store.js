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

      addUser() { // Method to add an user
        console.log("Hello User");
      },

      updateuserlogged() { /* This method is to update the user that is actually logged. It will update the nickname. */
        console.log("Updating the user logged.");
        this.user_logged = localStorage.getItem("user_logged");       
      },

      // registerUser() { // Method to register an user to the Pinia DB.
      //   console.log("Registering an user.");
        
      //   if(this.users == null) {
      //     this.users = [];
      //   } else {
      //     try {
      //       this.users = JSON.parse(localStorage.getItem("users"));
      //       if(this.users.find((user) => user.email === this.email)){
      //         console.log("The email exists. Try again");
      //       }
      //       if(this.users.find((user) => user.nickname === this.nickname)){ 
      //         console.log("The nickname exists. Try again.");
      //       }
      //       let user = {
      //         "email": this.email,
      //         "nickname": this.nickname,
      //         "password": this.password,                    
      //       };  
      //       console.log(user);    
      //       console.log(this.users); 
      //       this.users.push(user);
  
      //       this.users(localStorage.setItem("users", JSON.stringify(this.users)));
      //       this.user_logged(localStorage.setItem("user_logged", user.nickname));   
  
      //     }catch (e) {
      //       this.users = [];
      //     }
      //   }     
      // },
      // loginUser() { // Method to login to the Pinia DB.
  
      //  if(this.users == null) {
      //     this.users = [];
      //   } else {
      //     this.users = JSON.parse(localStorage.getItem("users"));
      //     var user = this.users.find((user) => user.email === this.email); 
          
      //     if(this.password === user.password) {
      //       this.user_logged(localStorage.setItem("user_logged", user.nickname)); 
      //     }
      //   }
      // }
    },
  });
  
  export default store