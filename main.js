// for the menu
// Get the required elements
const dmenu = document.getElementById('dmenu');
const menuSpan = document.getElementById('menu');

// Function to handle menu click
function handleMenuClick() {
  // Remove the 'hidden' class from dmenu
  dmenu.classList.remove('hidden');
  // Add the 'transition-transform', 'duration-300', 'ease-in-out', 'translate-x-0' classes to dmenu
 dmenu.classList.add('transition-transform', 'duration-300', 'ease-in-out', 'translate-x-0');
}

// Function to handle clicks outside dmenu
function handleOutsideClick(event) {
  // Check if the clicked element is not inside dmenu or menuSpan
  if (!dmenu.contains(event.target) && event.target !== menuSpan) {
    // Remove the 'translate-x-0' class from dmenu
    dmenu.classList.remove('translate-x-0');
    // Add the 'transition-transform', 'duration-300', 'ease-in-out', '-translate-full' classes to dmenu
    dmenu.classList.add('transition-transform', 'duration-300', 'ease-in-out', '-translate-full');
    // Add the 'hidden' class back to dmenu after the animation ends
    setTimeout(() => {
      dmenu.classList.add('hidden');
      // Remove the '-translate-full' class from dmenu
      dmenu.classList.remove('-translate-full');
    }, 300); // Adjust the timeout duration to match your animation duration
  }
}

// Add event listeners
menuSpan.addEventListener('click', handleMenuClick);
document.addEventListener('click', handleOutsideClick);
// end of the menu
// background blur beginning
const background = document.getElementById('blur');
const windowHeight = window.innerHeight;
const pageHeight = document.documentElement.scrollHeight;
const blurDistance = pageHeight - windowHeight;

// Add a scroll event listener
window.addEventListener('scroll', () => {
  // Get the scroll position
  const scrollPosition = window.scrollY || window.pageYOffset;

  // Check if scroll position is greater than or equal to windowHeight
  if (scrollPosition >= windowHeight) {
    // Calculate the remaining scroll distance
    const remainingScroll = Math.max(pageHeight - (scrollPosition + windowHeight), 0);
    
    // Calculate the blur value based on the remaining scroll distance
    const blurValue = Math.floor((remainingScroll / blurDistance) * 100);

    // Remove all existing blur classes
    background.classList.remove('blur-none', 'blur-sm', 'blur-lg', 'blur-xl', 'blur-2xl');

    // Apply the appropriate blur class based on the blurValue
    if (blurValue <= 25) {
      background.classList.add('blur-sm');
    } else if (blurValue <= 50) {
      background.classList.add('blur');
    } else if (blurValue <= 75) {
      background.classList.add('blur-lg');
    } else {
      background.classList.add('blur-2xl');
    }
  } else {
    // Reset the blur effect
    background.classList.remove('blur-sm', 'blur', 'blur-lg', 'blur-2xl');
    background.classList.add('blur-none');
  }
});
// background blur end
// this is for the weather visuals
window.addEventListener('load', () => {
  function initializeWeatherApp() {
    // Your weather app initialization code goes here
function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);

          // Call the function to fetch weather data using the obtained latitude and longitude
          fetchWeatherData(latitude, longitude);
        }, handleError);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
function fetchWeatherData(latitude, longitude) {
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C${longitude}?unitGroup=us&key=97X962FSPDFPTYND3ZLD34KWQ&contentType=json`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Call the function to display weather data
          displayWeatherData(data);
        })
        .catch(error => {
          console.log('An error occurred while fetching weather data:', error);
        });
    }
  function displayWeatherData(data) {
// Process and display the weather information
  console.log('Weather Data:', data);
 // Add your logic to handle and display the weather data in your app
const temperatureParagraph = document.querySelector('#temperature');
const temperatureConditions = document.querySelector('#conditions');
 const temperatureDescription = document.querySelector('#description');
const tmaxSpan = document.querySelector('#tmax');
const tminSpan = document.querySelector('#tmin');
const timeZone = document.querySelector('#timezone')
const feelsLike = document.querySelector('#feelslike')
  if (temperatureParagraph) {
        const { temp } = data.currentConditions;
        const temperatureInFahrenheit = parseFloat(temp);
        const temperatureValue = Math.round(temperatureInFahrenheit);
        temperatureParagraph.textContent = temperatureValue + '°';
      }
  if (feelsLike) {
        const { feelslike} = data.currentConditions;
        const feelsLikeInFahrenheit = parseFloat(feelslike);
        const feelsLikeValue = Math.round(feelsLikeInFahrenheit);
        feelsLike.textContent = feelsLikeValue + '°';
      }
  if (timeZone) {
        const { timezone } = data;

        timeZone.textContent = timezone;
      }
 if (temperatureConditions) {
        const { conditions } = data.days[0];
        temperatureConditions.textContent = conditions;
      }
 if (temperatureDescription) {
        const { description } = data.days[0];
        temperatureDescription.textContent = description;
      }
      if (tmaxSpan && tminSpan) {
        const currentDayIndex = 0; // Assuming the current day's data is at index 0
        const temperatureMax = data.days[currentDayIndex].tempmax;
        const temperatureMin = data.days[currentDayIndex].tempmin;
        let temperatureMaxFahrenheit = parseFloat(temperatureMax);
        let temperatureMinFahrenheit = parseFloat(temperatureMin);
        let temperatureMaxValue = Math.round(temperatureMaxFahrenheit);
        let temperatureMinValue = Math.round(temperatureMinFahrenheit);
        tmaxSpan.textContent = temperatureMaxValue + '°';
        tminSpan.textContent = temperatureMinValue + '°';
      }
// Get the current hour
      let currentHour = new Date().getHours();
     let currentHourIndex = currentHour;
     let currentDate = new Date().getDay();
     let currentDayIndex = currentDate;
  // Find the index of the current hour in the weatherData.hours array
     let temperatureMax = data.days[currentDayIndex].hours[currentHourIndex].tempmax;
// Handle cases where the current hour is beyond the last hour or not the first hour
      if (currentHourIndex === -1) {
        current
        currentHourIndex = 0; // Set it to the first hour of the next day
      } else if (currentHourIndex !== 0) {
        currentHourIndex++; // Increment the index to continue from there
      }
   if (currentDayIndex === -1) {
        current
        currentDayIndex = 0; // Set it to the first hour of the next day
      } else if (currentDayIndex !== 0) {
        currentDayIndex++; // Increment the index to continue from there
      }
for (let i = currentDayIndex; i < data.days.length; i++) {
  console.log('Subsequent Day Index:', i);
  
      }

const hourlyDataDiv = document.getElementById('hourData');
const hourlyDataDiv2 = document.getElementById('hourData2');

 
// Clear the existing content of the div
 hourlyDataDiv.innerHTML = '';
 hourlyDataDiv2.innerHTML = '';
 //--------- for the invisible division
for (let i = 0; i < data.days.length; i++) {
  const day = data.days[i];
  console.log('Day Index:', i);

  if (i ===0 ) {
    for (let j = currentHourIndex; j < day.hours.length; j++) {
  console.log('currentHour Index:', i);
      const hourDiv2 = document.createElement('div');
      hourDiv2.className = 'flex justify-between ';

      const hour = day.hours[j];
      const { windgust, temp, icon } = hour;
const cleanIcon = icon.replace(/\s+/g, ''); // Remove spaces from the icon value
      hourDiv2.innerHTML = `
        <p>${j} : 00</p>
  <img src="SVG/four/${cleanIcon}.svg" class="h-10 w-10" />
        <p class="text-white/75">${windgust}mph</p>
        <p>${temp}°</p>
      `;

      hourlyDataDiv2.appendChild(hourDiv2);
    }
  } else {
    for (let j = 0; j < day.hours.length; j++) {
      const hourDiv2 = document.createElement('div');
      hourDiv2.className = 'flex justify-between';

      const hour = day.hours[j];
      const { windgust, temp, icon } = hour;
const cleanIcon = icon.replace(/\s+/g, '');
      hourDiv2.innerHTML = `
        <p>${j} : 00</p>
  <img src="SVG/four/${cleanIcon}.svg" class="h-10 w-10" />
        <p class="text-white/75">${windgust}mph</p>
        <p>${temp}°</p>
      `;

      hourlyDataDiv2.appendChild(hourDiv2);
    }
  }
}
// for the visible division 

for (let i = 0; i < data.days.length; i++) {
  const day = data.days[i];
  console.log('Day Index:', i);

  if (i === currentDayIndex) {
    const maxHourIndex = Math.min(currentHourIndex + 5, day.hours.length);
    for (let j = currentHourIndex; j < maxHourIndex; j++) {
      const hourDiv = document.createElement('div');
      hourDiv.className = 'flex flex-col justify-between';

      const hour = day.hours[j];
      const { windgust, temp, icon } = hour;
const cleanIcon = icon.replace(/\s+/g, ''); // Remove spaces from the icon value

      hourDiv.innerHTML = `
        <p class="text-xs">${j} : 00</p>
  <img src="SVG/four/${cleanIcon}.svg" class="h-8 w-8" />
        <p class="text-white/75 text-xs">${windgust}mph</p>
        <p class="text-xs mt-1">${temp}°</p>
      `;

      hourlyDataDiv.appendChild(hourDiv);
    }
  } else if (i === currentDayIndex + 1) {
    const remainingIterations = 5 - (day.hours.length - currentHourIndex);
    const maxHourIndex = Math.min(remainingIterations, day.hours.length);
    for (let j = 0; j < maxHourIndex; j++) {
      const hourDiv = document.createElement('div');
      hourDiv.className = 'flex flex-col';

      const hour = day.hours[j];
      const { windgust, temp, icon } = hour;
const cleanIcon = icon.replace(/\s+/g, ''); // Remove spaces from the icon value

      hourDiv.innerHTML = `
        <p>${j} : 00</p>
  <img src="SVG/four/${cleanIcon}.svg" class="h-10 w-10" />
        <p class="text-white/75">${windgust}mph</p>
        <p>${temp}°</p>
      `;

      hourlyDataDiv.appendChild(hourDiv);
    }
  }
}


}
  function handleError(error) {
      console.log('Error occurred while retrieving geolocation:', error.message);
      // Display an error message or fallback to a default location
    };
  getUserLocation();
  }
  initializeWeatherApp();
});


// for the see more button 
document.getElementById("seemore").addEventListener("click", function() {
    var initialContent = document.getElementById("initial");
    var productContent = document.getElementById("product");
    var seeLessButton = document.getElementById("nav");

    initialContent.style.display = "none";
    productContent.style.display = "block";
    seeLessButton.style.display = "none";
});


// for the see less button
document.getElementById("seeless").addEventListener("click", function() {
    var initialContent = document.getElementById("initial");
    var productContent = document.getElementById("product");
    var seeLessButton = document.getElementById("nav");

    initialContent.style.display = "block";
    productContent.style.display = "none";
    seeLessButton.style.display = "block";
});

// For the See More button
document.getElementById("seemore").addEventListener("click", function() {
    var initialContent = document.getElementById("initial");
    var productContent = document.getElementById("product");

    gsap.to(initialContent, { duration: 0.8, opacity: 0, display: 'none' }); // Fade out and disappear initial content

    gsap.fromTo(productContent, { y: productContent.offsetHeight, opacity: 0, display: 'block' }, 
        { duration: 0.8, y: 0, opacity: 1 }); // Slide up product content and make it visible
});

// For the See Less button
document.getElementById("seeless").addEventListener("click", function() {
    var initialContent = document.getElementById("initial");
    var productContent = document.getElementById("product");

    gsap.to(initialContent, { duration: 0.8, opacity: 1, display: 'block' }); // Fade in initial content

    gsap.fromTo(productContent, { y: 0, opacity: 1, display: 'block' }, 
        { duration: 0.8, y:300, opacity: 0, display: 'none' }); // Slide down and fade out product content
});



