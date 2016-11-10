import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { ICurrentLoc } from '../interfaces/icurrent-loc';
import { IWeatherLoc } from '../interfaces/iweather-loc';
import { LocationsPage } from '../pages/locations/locations';
import { WeatherPage } from '../pages/weather/weather';

import { WeatherService } from '../providers/weatherservice';
import { LocationsService } from '../providers/locationsservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<{title: string, component: any, icon: string, loc?: ICurrentLoc}>;

  constructor(public platform: Platform, public weatherData: WeatherService,
   public locations: LocationsService, public eventsCtrl : Events) {
    this.initializeApp();
    this.getMyLocations();
    //eventsCtrl.subscribe('locations: updated', (data) => { this.getMyLocations();})

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
    //   { title: 'Current Location', component: WeatherPage, icon: 'pin' },
    //   { title: 'Berlin, DE', component: WeatherPage, icon: 'pin', loc: {lat:52.520000659, lon: 13.4049539}},
    //   { title: 'Munich, DE', component: WeatherPage, icon: 'pin', loc: {lat:48.1351253, lon: 11.58198}},
    //   { title: 'New York, USA', component: WeatherPage, icon: 'pin', loc: {lat:40.71278, lon: -74.00594}},
    //   { title: 'Tokio, JP', component: WeatherPage, icon: 'pin', loc: {lat:35.6894875, lon: 139.6917063}}
    // ];

  }
  getMyLocations()
  {
    this.locations.locations$.subscribe((locs: Array<IWeatherLoc>) => {
      this.pages = [
      { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
      { title: 'Current Location', component: WeatherPage, icon: 'pin' }
      ];
      for (let newLoc of locs){
        this.pages.push(newLoc);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.hasOwnProperty('loc')){
        this.nav.setRoot(page.component, {geoloc: page.loc, title: page.title});
    } else {
    this.nav.setRoot(page.component);
    }
  }
}
