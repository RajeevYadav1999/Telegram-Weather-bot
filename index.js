const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const axios = require('axios')
require('dotenv').config()



const bot = new Telegraf(process.env.TELEGRAFH_KEY)
const weatherAPIKey = (process.env.WEATHER_API_KEY)

bot.start((ctx) => ctx.reply('Welcome To the Weather bot Type Your City Name followed By Weather command'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.command('weather', async(ctx) => {
    const cityName = ctx.message.text.split(" ").slice(1).join(" ");
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}&units=metric`)
        // console.log(response);

        const weatherData = response.data;
        const city = weatherData.name;
        const weatherDescription = weatherData.weather[0].description;
        const temp = weatherData.main.temp;
        const feelsLIke = weatherData.main.feels_like;
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;

        const weatherMessage = 
        (`The weather in ${city} is 
       🌡️ Temperature : ${temp}
       ⛅ Description : ${weatherDescription}
       👻 Feels Like :  ${feelsLIke}
       💦 Humidity : ${humidity}
       👀 Pressure : ${pressure}`)

        ctx.reply(weatherMessage)

    }catch(error){
        return ctx.reply("Enter a valid city name");
    }
})


bot.launch()