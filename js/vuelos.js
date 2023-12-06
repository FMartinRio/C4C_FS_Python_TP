window.addEventListener("DOMContentLoaded", () => {
    let flights = document.querySelectorAll(".flight");
    let city;
    let forecastTitle = document.querySelector(".forecast_title");
    let forecastDays = document.querySelectorAll(".forecast_day");

    for (const flight of flights) {
        let title = flight.querySelector(".flight_title");
        let content = flight.querySelector(".flight_content");
        let secondFlightdata = flight.querySelector(".second_flight_data");
        let secondFlightCheck = flight.querySelector(".second_flight_check");
        let payment = flight.querySelector(".payment select");
        let totalPrice = flight.querySelector(".total_price h3");
        let price = flight.querySelector(".flight_price");
        let quantities = flight.querySelectorAll(".flight_quantity");
        let confirm = flight.querySelector(".confirm");
        let success = flight.querySelector(".flight_confirmed");
        let form = flight.querySelector(".form");
        let date = flight.querySelector(".flight_date");
        
        content.style.display = "none";
        secondFlightdata.style.display = "none";
        price = parseFloat(price.textContent.slice(2).replace(".", "").replace(",", "."));
        totalPrice.textContent = `Precio Total: $ ${price.toLocaleString("es")}`;
        success.style.display = "none";

        title.addEventListener("click", function expandContent(event) {
            let content = flight.querySelector(".flight_content");
            city = title.querySelector("h2").textContent;

            let space = city.includes(" ");
            if (space) {
                city = city.substring(0, city.indexOf(" "));
            }
            
            let url = `http://api.weatherapi.com/v1/forecast.json?key=6cdad5f9224e4f5d9de113504232410&q=${city}&days=3&aqi=no&alerts=no`;

            if (content.style.display == "none") {
                content.style.display = "flex";
            } else {
                content.style.display = "none";
            }
            
            forecastTitle.textContent = `Pronostico de ${city}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < forecastDays.length; i++) {
                        forecastDays[i].innerHTML = `
                            <h3 class="date">${data.forecast.forecastday[i].date}</h3>
                            <p class="box sunrise"><img class="forecast_icon" src="img/icons/sunrise.svg"> ${data.forecast.forecastday[i].astro.sunrise}</p>
                            <p class="box sunset"><img class="forecast_icon" src="img/icons/sunset.svg"> ${data.forecast.forecastday[i].astro.sunset}</p>
                            <p class="box max_temp"><img class="forecast_icon" src="img/icons/max.svg"> ${data.forecast.forecastday[i].day.maxtemp_c} °</p>
                            <p class="box min_temp"><img class="forecast_icon" src="img/icons/min.svg"> ${data.forecast.forecastday[i].day.mintemp_c} °</p>
                            <P class="box humidity"><img class="forecast_icon" src="img/icons/humidity.svg"> ${data.forecast.forecastday[i].day.avghumidity} %</P>
                            <P class="box rain_chance"><img class="forecast_icon" src="img/icons/rain.svg"> ${data.forecast.forecastday[i].day.daily_chance_of_rain} %</P>
                            <P class="box snow_chance"><img class="forecast_icon" src="img/icons/snow.svg"> ${data.forecast.forecastday[i].day.daily_chance_of_snow} %</P>
                        `
                    }
                });
        });

        secondFlightCheck.addEventListener("change", function expandSecondFlight(event) {
            let content = flight.querySelector(".second_flight_data");
            
            if (event.currentTarget.checked) {
                content.style.display = "flex";
            } else {
                quantities[1].value = "0";
                quantities[1].dispatchEvent(new Event("change"));
                content.style.display = "none";
            }
        });

        payment.addEventListener("change", function showPaymentData(event) {
            let cardData = flight.querySelector(".card_data");
            let aliasData = flight.querySelector(".alias_data");

            if (payment.value == 2 || payment.value == 3) {
                cardData.style.display = "block";
                aliasData.style.display = "none";
            } else if (payment.value == 4) {
                aliasData.style.display = "block";
                cardData.style.display = "none";
            } else {
                cardData.style.display = "none";
                aliasData.style.display = "none";
            }
        });

        for (const quantity of quantities) {
            quantity.addEventListener("change", function calculateTotal() {
                let fuck = 0;
                for (let i = 0; i < quantities.length; i++) {
                    fuck += parseInt(quantities[i].value);
                }
                let newPrice = fuck * price;
                totalPrice.textContent = `Precio Total: $ ${newPrice.toLocaleString("es")}`;
            });
        }

        confirm.addEventListener("click", function() {
            form.style.display = "none";
            success.style.display = "block";
        });
    }


});