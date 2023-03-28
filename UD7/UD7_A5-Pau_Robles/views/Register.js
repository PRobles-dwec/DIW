import store from "../store.js";

export default {
    name: "ViewRegister",
    data() {
        return {          
            errorEmail: false,
            errorNotEmail: false,
            errorNickname: false,
            errorPassword: false,
            errorPassword2: false,
            errorRepeatPassword: false,
            userAlreadyRegistered: false, 
            errorNicknameExists: false,
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
            users: [],                 
        }        
    },
    emits: ['updatebuttonlogout', 'updatebuttonlogin', 'updateregister'],  
    computed: {
        ...Pinia.mapState(store, ['user_logged']),
        ...Pinia.mapState(store, ['addUser']),
    },   
    methods: {         
        registerUser: function(){   
            this.errorEmail = false;
            this.errorNickname = false;
            this.errorNotEmail = false;
            this.errorPassword = false;
            this.errorPassword2 = false;
            this.errorRepeatPassword = false;
            this.userAlreadyRegistered = false;
            this.errorNicknameExists = false;
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(this.email === "") {                
                this.errorEmail = true;                            
            } else {  
                if((!this.email.match(regex))) {
                    this.errorNotEmail = true;
                } else {
                    if(this.nickname === ""){                
                        this.errorNickname = true;                
                    } else {
                        if(this.password === ""){
                            this.errorPassword = true;
                        }else{
                            if(this.repeatPassword === "") {
                                this.errorPassword2 = true;
                            } else {
                                if(this.password !== this.repeatPassword) {
                                    this.errorRepeatPassword = true;
                                } else {
                                    if(!this.errorEmail && !this.errorNickname && !this.errorPassword && !this.errorRepeatPassword && !this.errorNotEmail && !this.errorPassword2){                                                        
                                        this.users = JSON.parse(localStorage.getItem("users"));
            
                                        if(this.users !== null) {
                                            if(this.users.find((user) => user.email === this.email)){
                                                this.userAlreadyRegistered = true; //error avisar q usuari ja està registrat                                
                                            }
                                            if(this.users.find((user) => user.nickname === this.nickname)){
                                                this.errorNicknameExists = true; //error avisar q usuari ja està registrat                                
                                            }                                                                                       
                                        } else {
                                            this.users = [];
                                        }if(!this.userAlreadyRegistered){                                                                                                                                   
                                            let user = {
                                                "email": this.email,
                                                "nickname": this.nickname,
                                                "password": this.password,                    
                                            };  
                                            console.log(user);    
                                            console.log(this.users);                                 
            
                                            this.users.push(user);
                
                                            localStorage.setItem("users", JSON.stringify(this.users));
                                            localStorage.setItem("user_logged", user.nickname);   
                                        
                                            //this.user_logged();
                                        
                                            this.email = "";
                                            this.nickname = "";
                                            this.password = "";
                                            this.repeatPassword = "";
                
                                            this.$router.push("/fruits");   
                                            this.$emit("updatebuttonlogout", true);                                                                                  
                                            this.$emit("updateregister", false);  
                                            this.$emit("updatebuttonlogin", false);  

                                            this.addUser();
                                        }
                                    } 
                                }
                            }                       
                        }                                                                                               
                    }                
                }              
            }        
        }
    },
template: 
    `
        <div id="register-Form">            
            <h1> REGISTER </h1> 
            <form>
                <label>Email</label>
                <input type="email" placeholder="Insert email" v-model="email"> 
                
                <p class="error" v-show="errorEmail">The email is empty. Try again.</p>
                <p class="error" v-show="errorNotEmail">This is not an e-mail. Try again.</p>            
                <p class="error" v-show="userAlreadyRegistered">This user is already registered.</p>

                <label>Nickname</label>

                <input type="text" placeholder="Insert nickname" v-model="nickname">
                <p class="error" v-show="errorNickname">The nickname is empty. Try again.</p>
                <p class="error" v-show="errorNicknameExists">This nickname is already registered.</p>

                <label>Password</label>

                <input type="password" placeholder="Insert password" v-model="password" autocomplete>
                <p class="error" v-show="errorPassword">The password is empty. Try again.</p>

                <label>Repeat password</label>

                <input type="password" placeholder="Repeat the password" v-model="repeatPassword" autocomplete>            
                <p class="error" v-show="errorPassword2">The second password is empty. Try again.</p>
                <p class="error" v-show="errorRepeatPassword">The password is different. Try again.</p>
            </form>                            
            <button @click="registerUser"> Register </button>                      
        </div>         
    `
}