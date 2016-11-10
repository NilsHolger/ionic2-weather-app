import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { IWeatherLoc } from '../../interfaces/iweather-loc';
import { WeatherPage } from '../weather/weather';
import { LocationsService } from '../../providers/locationsservice';
import { GeoCodeService } from '../../providers/geocodeservice';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
locs:Array<IWeatherLoc>;

  constructor(public navCtrl: NavController, public locations: LocationsService,
  public geocode: GeoCodeService, public alertCtrl: AlertController,public eventsCtrl: Events) {
    locations.locations$.subscribe((locs: Array<IWeatherLoc>) => {
      this.locs = locs;
    });
  }
  deleteLocation(loc){
    this.locations.removeLocation(loc);
    //this.eventsCtrl.publish('locations: updated', {});
  }
  addLocation(){
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter the city's name",
      inputs: [
        {
          name: 'title',
          placeholder: 'City name'
        },
      ],
      buttons: [
        {
          text:'Cancel',
          handler: data => { console.log('Cancel clicked');}
        },
        {
          text:'Add',
          handler: data => { 
                  if (data.title !== ''){
                    this.geocode.getLatLong(data.title).then(res => {
                      let newLoc = { title: '', component: WeatherPage, icon: 'pin', loc:{lat:0, lon:0}}
                      newLoc.title = res.name;
                      newLoc.loc.lat = res.location.latitude;
                      newLoc.loc.lon = res.location.longitude;
                      this.locations.addLocation(newLoc);
                      //this.eventsCtrl.publish('locations: updated', {});
                    });
                  }          
        }}
      ]});
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('hello world');
  }

}
