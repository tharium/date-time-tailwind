/************
Dynamic Data
************/
// define `theClockApp` stored in function to be ran
const theClockApp = () => {
  
    // Get and store current date and time with `new Date()` object
    const timeNow = new Date();
    // Check-Check: See all `Date()` methods and properties
    // console.log( timeNow );

    const selectedTimeZone = document.getElementById("timeZoneSelector").value;

    // time zone offset based on PST by default
    const timeZoneOffsets = {
        PST: 0,
        MST: 1,
        CST: 2,
        EST: 3,
        AKST: -1,
        HST: -2,
    }
    
    // Get current hours
    let gotHours = timeNow.getHours() + timeZoneOffsets[selectedTimeZone];
    // Get current minutes
    let gotMinutes = timeNow.getMinutes();
    // Get current seconds
    let gotSeconds = timeNow.getSeconds();
    
    // Check-Check: Is the data correct? 
    // console.log(gotHours, gotMinutes, gotSeconds);

    if (gotHours >= 24) {
        gotHours %= 24; // Wrap around if greater than 23
    }
    
    /************
    Format Data
    ************/
    // Get AM or PM
    const gotAmOrPM = gotHours >= 12 ? 'PM' : 'AM';
    // Get 12 hour format
    gotHours = gotHours % 12 || 12;
    // Optionally, append zero to single digit hours
    gotHours = gotHours < 10 ? `0${gotHours}` : gotHours;   
    // Optionally, append zero to single digit minutes
    gotMinutes = gotMinutes < 10 ? `0${gotMinutes}` : gotMinutes;
    // Optionally, append zero to single digit seconds
    gotSeconds = gotSeconds < 10 ? `0${gotSeconds}` : gotSeconds;
    
    /************
    Get DOM Elements
    ************/
    // Get Hours
    const hours = document.querySelector(".hours");
    // Get minutes
    const minutes = document.querySelector(".minutes");
    // Get seconds
    const seconds = document.querySelector(".seconds");
    // Get AM or PM
    const amOrPM = document.querySelector('.amOrPM');
    
    /************
    Set DOM Elements
    ************/
    // Set the hours
    hours.innerText = gotHours;
    // Set the minutes
    minutes.innerText = gotMinutes;
    // Set the seconds
    seconds.innerText = gotSeconds;
    // Set AM or PM
    amOrPM.innerText = gotAmOrPM;
      
    }
    
    /************
    Run App
    ************/
    // Re-run `theClockApp` every 1 second (1000 ms)
    setInterval(theClockApp, 1000);

    // Function to update the sun/moon icon based on the time of day
    document.addEventListener("DOMContentLoaded", () => {
        const timeIcon = document.getElementById('timeIcon');
    
        function updateTimeIcon() {
            const now = new Date();
            const hours = now.getHours();
    
            if (hours >= 6 && hours < 18) {
                // day
                timeIcon.textContent = '🌞';
                timeIcon.classList.remove('text-gray-500');
                timeIcon.classList.add('text-yellow-500');
            } else {
                // night(ish)
                timeIcon.textContent = '🌙';
                timeIcon.classList.remove('text-yellow-500');
                timeIcon.classList.add('text-gray-500');
            }
        }
    
        // call the function once when the page loads
        updateTimeIcon();
    
        // update the icon every minute
        setInterval(updateTimeIcon, 60000);
    });

    document.addEventListener("DOMContentLoaded", () => {
        const body = document.getElementById("dynamicBg");
        const timeZoneSelector = document.getElementById("timeZoneSelector");
      
        function updateBackground(timezone) {
          // Define images based on the timezone (or any condition)
          const backgrounds = {
            EST: "url('./images/eastern-zone.png')",
            PST: "url('./images/pacific-zone.png')",
            CST: "url('./images/central-zone.png')",
            MST: "url('./images/mountain-zone.png')",
            AKST: "url('./images/alaskan-zone.png')",
            HST: "url('./images/hawaiin-zone.png')",
            DEFAULT: "url('./images/transparent-us-map.png')"
          };

          currentTimeZone.textContent = `Current Time Zone: ${timezone}`;
      
          const backgroundImage = backgrounds[timezone] || backgrounds["DEFAULT"];
      
          // Apply the background image
          body.style.backgroundImage = backgroundImage;
      
          body.style.backgroundColor = "rgba(17, 24, 39, 1)"; // Tailwind gray-900
        }

        timeZoneSelector.addEventListener("change", (event) => {
            const selectedTimeZone = event.target.value;
            updateBackground(selectedTimeZone);
          });

        const timeNow = new Date();
        const timezoneOffsetMinutes = timeNow.getTimezoneOffset(); // Offset in minutes
        const timezoneOffsetHours = -timezoneOffsetMinutes / 60; // Convert to hours and invert sign

        // Mapping offsets to time zones
        const timezoneMap = {
            "-10": "HST", // Hawaii Standard Time
            "-9": "AKST", // Alaska Standard Time
            "-8": "PST", // Pacific Standard Time
            "-7": "MST", // Mountain Standard Time
            "-6": "CST", // Central Standard Time
            "-5": "EST", // Eastern Standard Time
        };

        const timezone = timezoneMap[timezoneOffsetHours] || "DEFAULT";
      
        // call the function once when the page loads
        updateBackground(timezone);
      });
    