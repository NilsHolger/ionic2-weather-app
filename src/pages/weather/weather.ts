import { Component } from '@angular/core';
import { NavController, LoadingController, Refresher, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { WeatherService } from '../../providers/weatherservice';
import { ICurrentLoc } from '../../interfaces/icurrent-loc';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
    theWeather: any = {};
    currentData: any = {};
    daily: any = {};
    currentLoc : ICurrentLoc = {lat: 0, lon: 0};
    loading: LoadingController;
    refresher: Refresher;
    pageTitle: string = 'Current Location';
  constructor(public navCtrl: NavController, public weatherData: WeatherService, 
  public loadingCtrl: LoadingController, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
        content: "Loading weather data ...",
        duration: 3000
    });
    let loc = this.navParams.get('geoloc');
    loader.present();
    if (loc === undefined){
    Geolocation.getCurrentPosition().then(pos => { 
      console.log('Current Location lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.currentLoc.lat = pos.coords.latitude;
      this.currentLoc.lon = pos.coords.longitude;
      this.currentLoc.timestamp = pos.timestamp;
      return this.currentLoc;
  }).then(currentLoc =>{
      weatherData.getWeather(currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        loader.dismiss();
      });
  });
  } else {
      this.pageTitle = this.navParams.get('title');
      this.currentLoc = loc;
      console.log(this.pageTitle + ' lat: ' + this.currentLoc.lat + ', lon: ' + this.currentLoc.lon);   
       weatherData.getWeather(this.currentLoc).then(theResult => {
        this.theWeather = theResult;
        console.log(this.theWeather);
        this.currentData = this.theWeather.currently;
        console.log(this.pageTitle + ' Current weather ' + this.theWeather.currently);
        this.daily = this.theWeather.daily;
        loader.dismiss();
  });
  }
  }

  ionViewDidLoad() {
    console.log('get it done ...');
  }
  doRefresh(refresher){
    this.weatherData.getWeather(this.currentLoc).then(theResult =>{
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;
      refresher.complete();
    });
}
}
