import store from "../store.js";

export default {
    name: "ComponentHeader",
    props: ["buttonlogout", "buttonlogin", "buttonregister", "buttondeleteuser"], // We will pick up the nickname from the index.
    emits: ["updatebuttonlogout", "updateregister", "updatebuttonlogin", "updatebuttondeleteuser"],
    methods: {
        gotoLogin: function() {                         
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", true); 
            this.$emit("updatebuttonlogin", false);       
            this.$emit("updatebuttondeleteuser", false);       
            this.$router.push("/login");
        },
        gotoRegister: function() {            
            this.$emit("updateregister", false); 
            this.$emit("updatebuttonlogin", true);             
            this.$emit("updatebuttonlogout", false);
            this.$emit("updatebuttondeleteuser", false);       
            this.$router.push("/register");                
        },
        doLogout: function() {
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", true); 
            this.$emit("updatebuttonlogin", false); 
            this.$emit("updatebuttondeleteuser", false); 
            console.log("Logged out"); 
            this.$router.push("/login"); 
            this.deleteUserLogged();    
        },  
        deleteUser: function() {
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", false); 
            this.$emit("updatebuttonlogin", true); 
            this.$emit("updatebuttondeleteuser", false); 
            console.log("Deleting user."); 
            this.$router.push("/login"); 
            this.deleteuser();
            this.deleteUserLogged();              
        }   
    },
    computed: {
        ...Pinia.mapState(store, ['user_logged']),
        ...Pinia.mapState(store, ['deleteUserLogged']),
        ...Pinia.mapState(store, ['deleteuser']),
    },
    template: 
    `   <div> 
            <header>
                <h1> Greenlife </h1>
                <h2 v-show="user_logged !== null"> Hello {{ user_logged }} </h2> 
                <button v-show="buttonlogin" @click="gotoLogin()"> Login </button>
                <button v-show="buttonregister" @click="gotoRegister()"> Register </button>                
                <button v-show="buttonlogout" @click="doLogout()"> Logout </button>
                <button v-show="buttondeleteuser" @click="deleteUser()"> Delete account </button>
            </header>
        </div>
    `
}