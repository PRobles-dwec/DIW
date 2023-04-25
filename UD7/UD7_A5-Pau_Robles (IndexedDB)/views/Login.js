import store from "../store.js";
export default {
    name: "ViewLogin",
    data() {
        return {            
            errorEmail: false,
            errorNotEmail: false,
            errorPassword: false,
            errorDifferentPassword: false,
            errorEmailNotExists: false,
            email: "",
            password: "",  
            nickname: "",
        }
    },    
    emits: ['updatebuttonlogout', 'updatebuttonlogin', 'updateregister', 'updatebuttondeleteuser'],   
    computed: {        
        ...Pinia.mapState(store, ['users'])        
    },        
    methods: {
        ...Pinia.mapActions(store, ['updateuserlogged']),
        ...Pinia.mapActions(store, ['readUsers']),
        ...Pinia.mapActions(store, ['readUserLogged']),
        loginUser: function() { 
            this.errorEmail = false; 
            this.errorNotEmail = false;
            this.errorEmailNotExists = false;
            this.errorPassword = false;
            this.errorDifferentPassword = false;
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(this.password === "") {
                this.errorPassword = true;
            }

            if(this.email === ""){
                this.errorEmail = true;                 
            } else {
                if(!(this.email.match(regex))){                  
                    this.errorNotEmail = true;         
                } else {                               
                    if (this.users !== null){
                        var user = this.users.find((user) => user.email === this.email);                       
                        
                        if (user === undefined){
                            this.errorEmailNotExists = true;
                        }
                    }     
                    if(!this.errorEmail && !this.errorNotEmail && !this.errorPassword && !this.errorEmailNotExists) {
                   
                        // Comprovar dues passwords iguals.
    
                        if(this.password === user.password) {
                            this.updateuserlogged(user.nickname);                                
                            this.email = "";
                            this.password = "";
                                                        
                            this.$emit("updatebuttonlogout", true);
                            this.$emit("updatebuttonlogin", false);
                            this.$emit("updateregister", false);
                            this.$emit("updatebuttondeleteuser", true);

                            this.$router.push("/fruits");                                                                                    
                        }                        
                        else {                            
                            this.errorDifferentPassword = true;
                            console.log("Different password");
                        }                                                                               
                    }  
                }  
            }                                         
        } 
    },
    template: `
    <div id="login-Form">        
        <h1> LOGIN </h1>  
        <form>
            <div> 
                <label> Email </label>
                <input type="email" placeholder="Insert email" v-model="email"> 
                <p class="error" v-show="errorEmail"> This email is empty </p>
                <p class="error" v-show="errorNotEmail"> This is not an e-mail </p>
                <p class="error" v-show="errorEmailNotExists"> This email does not exists </p>
            </div> 
            <label> Password </label>
            <input type="password" placeholder= "Insert password" v-model="password" autocomplete>                                  
            <p class="error" v-show="errorPassword"> This password is empty </p>
            <p class="error" v-show="errorDifferentPassword"> This password is incorrect. Try again. </p>
        </form>              
        <div> 
            <button @click="loginUser"> Login </button>
        </div>        
    </div>                             
    `,
}