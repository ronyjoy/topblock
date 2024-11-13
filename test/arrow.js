const obj = {
    who: "World",
    greet() {
        return `Hello, ${this.who}`
    },
    farewell: () => {
        return  `Goodbye, ${this.who}`
    }

}
console.log(obj.greet()) 
console.log(obj.farewell())