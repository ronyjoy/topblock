function getWeather() {
    console.log("get Weather");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Sunny');
      }, 5000); // Simulates asynchronous operation like fetching weather
    });
  }
  
  async function fetchWeather() {
    const weather = await getWeather(); // Waits for getWeather to resolve
    console.log(`Async/Await received: ${weather}`);
  }
  
  fetchWeather();
  
  console.log("other operations");
  