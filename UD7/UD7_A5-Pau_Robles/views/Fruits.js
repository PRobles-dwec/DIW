import Fruit from "../components/Fruit.js";
import fruits from "../script.js";

export default {
    data() {
        return {
            fruits: fruits,
        }
    },
    name: "Fruits",
    components: {
        Fruit
    },
    emits: ['user_logged', 'updatebuttonlogout', 'updatebuttonlogin', 'updateregister'],    
    template: `
        <fruit v-for="fruit in fruits" class="article" v-bind:fruit="fruit" v-show="fruit.isActive || fruit.hasStock">
        </fruit>
    `
}