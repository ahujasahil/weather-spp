import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.css']
})
export class WeatherMainComponent implements OnInit {

   lat;
   lon;
   weather;

  constructor(private weatherService : WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data=>{
          this.weather = data;
          console.log(data);
        });
      })
    }
  }

  getCity(city){
    this.weatherService.getWeatherDataByCityName(city).subscribe(data=>{
      this.weather=data;
    })
  }

  

}
