function getWeather() {
    console.log("get Weather");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Sunny');
      }, 5000); // Simulates asynchronous operation like fetching weather
    });
  }
  
  getWeather().then(weather => {
    console.log(`Promise resolved: ${weather}`);
  });
  
  console.log("other operations");
  