const temperatureFeild = document.querySelector(".weather1");
const cityFeild = document.querySelector(".weather2 P");
const dateFeild = document.querySelector(".weather2 span");
const imgFeild = document.querySelector(".weather3 img");
const weatherFeild = document.querySelector(".weather3 span");
const searchFeild = document.querySelector(".searchFeild");
const formFeild = document.querySelector("form");


//Default Location
let target = `Punjab`;

//Function to fetch data from weather API
const fetchData = async(target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=24e7f6fcea1b4e7baee102640242110&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();
    
        //destructure
        const {
            current: {temp_c,condition: {
                text, icon
            },},
            location: {name, localtime },
            
        }= data;

        //Calling update DOM function
        updateDom(temp_c, name,localtime,icon,text);
    
        
    } catch (error) {
        alert("Location not found")
        
    }
};

//function to update DOM
function updateDom(temperature,city,time, image,text){
   
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayName(new Date(exactDate).getDay());
   
    temperatureFeild.innerText = `${temperature}°`;
    cityFeild.innerText = city;   
    dateFeild.innerText = `${exactTime} ${exactDay}  ${exactDate}`;
    imgFeild.src = image;
    weatherFeild.innerText = text;
};

fetchData();

//function to search the location
const search = (e)=>{

    e.preventDefault();
    target = searchFeild.value;

    fetchData(target);

}

//Adding eventListener in the form
formFeild.addEventListener("submit",search);

//function to get the name of the day
function getDayName (num){
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
                                    
        default:
            "Don't Know";
    }
}