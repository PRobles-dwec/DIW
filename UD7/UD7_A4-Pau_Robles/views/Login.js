export default {
    name: "ViewLogin",
    data() {
        return {            
            errorEmail: false,
            errorNotEmail: false,
            errorPassword: false,
            errorEmailNotExists: false,
            email: "",
            password: "",  
            register: false,
            logout: false,
            nickname: "",
        }
    },
    template: `        
        <form >
            <h1> LOGIN </h1>        
            <div> 
                <input type="email" placeholder="Email" v-model="email"> 
                <p class="error" v-show="errorEmail"> This email is empty </p>
                <p class="error" v-show="errorNotEmail"> This is not an e-mail </p>
                <p class="error" v-show="errorEmailNotExists"> This email does not exist </p>
            </div> 
                <input type="password" placeholder="Password" v-model="password" autocomplete>                                  
                <p class="error" v-show="errorPassword"> This password is empty </p>
            <div> 
                <button @click="loginUser"> Login </button>
            </div> 
        </form>                
    `,
    methods: {
        loginUser: function() { 
            this.errorEmail = false; 
            this.errorNotEmail = false;
            this.errorEmailNotExists = false;
            this.errorPassword = false;
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(this.email === "" || !(this.email.match(regex))){
                this.errorNotEmail = true;    
                this.errorEmail = true;            
            }    
            if(this.password === "") {
                this.errorPassword = true;
            }        
                
            if(!this.errorEmail && !this.errorNotEmail && !this.errorPassword) {
                let user = JSON.parse(localStorage.getItem(this.email), localStorage.getItem(this.password));
                console.log(user);                
                
                if(user != null) {
                    this.errorEmailNotExists = true; 
                } else {
                    //comprovar dues passwords iguals

                    if(this.password == localStorage.getItem(this.password)) {
                        localStorage.setItem("user_logged", JSON.stringify(user));  

                        this.$emit("updateuserlogged", user.nickname); // We will call the method that we created in the index to update the user that is logged. 
                        /* And we will call the nickname that is saved in the LocalStorage */
                           
                        this.email = "";
                        this.password = ""; 
                        
                        this.$router.push("/fruits"); 
                    }                                        
                }                      
            } else {
                console.log("Something went wrong. Please, try again.");
            }        
        } 
    },
}