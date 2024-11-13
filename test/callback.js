getWeather(weatherReceived)
console.log("other operations")

function weatherReceived(weather){
    console.log(`call back received ${weather}`)
}

function getWeather(callback) {
    console.log("get Weather")
    setTimeout(() => {
        callback('Sunny')
    },5000)
}
