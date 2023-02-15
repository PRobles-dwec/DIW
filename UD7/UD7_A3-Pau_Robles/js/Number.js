export default {
    name: "Number",
    props: ["number"],
    template: `
        <div>
            <h1> List of numbers </h1>
            <button @click="$emit('click-number')"> {{number}} </button>
        </div>
       

    `
}