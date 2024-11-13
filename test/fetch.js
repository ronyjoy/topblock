const url = "http://worldtimeapi.org/api/timezone"

async function getData() {
    const data = await fetch(url)
    const json = await data.json()
    console.log(json)
}

getData()