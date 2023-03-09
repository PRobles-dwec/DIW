export default {
    name: "ViewLogin",
    data() {
        return {
            // HelloUser: false,
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
        <div>
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
        </div>                
    `,
    methods: {
        loginUser: function() { 
          console.log("loginUser");
            this.errorEmail = false; 
            this.errorNotEmail = false;
            this.errorEmailNotExists = false;
            this.errorPassword = false;
            // this.HelloUser = false;

            if(this.email === "" && !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.email))){
              console.log("errorEmail");  
              this.errorNotEmail = true;    
                this.errorEmail = true;            
            }    
            if(this.password == "") {
              console.log("errorPassword buit");
                this.errorPassword = true;
            }        
                
            if(!this.errorEmail && !this.errorNotEmail && !this.errorPassword) {

              //Dins register estàs guardant els usuaris dins una llista que es diu users i aquí intentes accedir a
              // un camp que sigui s'email. Per tant no et funciona el login...
              // A més, cada vegada matzaques tota la llista users, en comptes d'afegir l'element
              console.log(localStorage.getItem("users"));


                let user = JSON.parse(localStorage.getItem(this.email), localStorage.getItem(this.password));
                console.log(user);
                // this.HelloUser = true; 
                
                if(user != null) {
                    this.errorEmailNotExists = true; 
                } else {
                    //comprovar dues passwords iguals

                    if(this.password == localStorage.getItem(this.password)) {
                        localStorage.setItem("user_logged", JSON.stringify(user));  

                        //exemple emit:
                        console.log(user.nickname);
                        this.$emit("updateuserlogged", user.nickname);

                        // this.HelloUser = true; 
                        
                        //Has de crear un emit per actualizar quin és l'usuari que s'acaba de loguejar
                        // i actualitzar la variable user_log de index.html
                        // Les variables this.HelloUser, this.register, this.logout no s'empren 
                        //en aquest component. Si el que vols és que es mostrin o no button al header segons
                        // els valors booleans, hauràs de crear un emit i actualitzar-los a index. També li hauràs
                        // de passar com a props al header, perquè aquest les empri segons convengui.

                        this.register = false; 
                        this.logout = true; 
                        this.email = "";
                        this.password = ""; 
                        
                        this.$router.push("/fruits"); 
                    }
                    
                    
                }                      
            } else {
              console.log("ERROR");
            }           
        } 
    },
}