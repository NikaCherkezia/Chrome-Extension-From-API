function getCurrentTime() {
    let currentTime= new Date().toLocaleTimeString("en-us",{timeStyle: "short"});
    document.getElementById("time").textContent = currentTime
}



fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent=`By: ${data.user.name}`

    })

    .catch(error => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njk2MTg3ODc&ixlib=rb-4.0.3&q=80)`
        document.getElementById("author").textContent=`By: Sergey Shmidt`
    })




    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
        .then(res => {
            if(!res.ok) {
                throw error("ggg")
            }
            return res.json()

        })
        .then(data => {
            // console.log(data)
            document.getElementById("img-name").innerHTML = `
            <img src="${data.image.small}" alt="">
            <span>${data.localization.en}</span>
            `
            document.getElementById("prices").innerHTML = `
            <p id="first-par">⌛: $${data.market_data.current_price.usd}</p>
            <p>☝: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
            `
           
    
        })

        .catch(err => {
            console.error("Error occured, please try again")
        })


setInterval(getCurrentTime, 1000);

// navigator.geolocation.getCurrentPosition((position) => {
// 	doSomething(position.coords.latitude, position.coords.longitude);
// });

const weatherID = "caa0aa2aee18c47dbc0a994a25f1840b"


navigator.geolocation.getCurrentPosition((positions) => {
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${positions.coords.latitude}&lon=${positions.coords.longitude}&appid=${weatherID}`)
        .then(res => res.json())
        .then(data => {
            let currentLocation = data[0].name
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=${weatherID}&units=metric`)
                .then(res => {
                    if (!res.ok) {
                        throw Error("Something wnet wrong with weather data")
                    }
                    return res.json()
                })

                .then(data => {
                    console.log(data)
                    document.getElementById("icon-degree").innerHTML = `
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
                    <span>${data.main.temp}°C</span>
                    `

                    document.getElementById("location-name").innerHTML = `
                    <h3>${currentLocation}</h3>
                    `
                })
                .catch(err => console.error(err))

        })
        
})
