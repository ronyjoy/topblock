function hi(name) {
    const value = "how are you"
    function sayHi() {
        console.log(`hi ${name}`)
    }
    function sayHowAreYou() {
        console.log(`${value} ${name}`)
    }
    return {
    sayHi,sayHowAreYou
    }
}

const a = hi("Rony")
a.sayHi()
a.sayHowAreYou()
