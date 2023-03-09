export default {
    name: "Number", // The component will have this name.
    props: ["number"], // With the props, we will pass the number with a prop.
    template:  // This will be shown as the template of the component. Always will have a div.
    ` 
        <div>            
            <button @click="$emit('click-number', number)"> {{number}} </button> 
        </div>
    `
}

// When we are doing $emit, we will make a function that need to be called in the parent component. In the second parameter, we will call the number.
// And the text will be the number that we pass from the parent component.