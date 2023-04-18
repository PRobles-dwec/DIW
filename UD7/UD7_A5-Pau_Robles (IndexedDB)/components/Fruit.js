export default {
    name: "Fruit",
    props: ["fruit"],
    template: `
        <div id="fruit.index" class="products">
            <h1> {{ fruit.name }} </h1>
            <img v-bind:src="fruit.picture"/>
            <h2> {{ fruit.price }}€ </h2>
            <h2> Fruits in Stock: {{ fruit.stock}}</h2>
            <ul> 
                <h4 v-for="tag in fruit.tags"> {{ tag }} </h4>
            </ul> 
        </div>
    `
}