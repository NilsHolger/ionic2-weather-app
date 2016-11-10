import { Injectable } from '@angular/core';
import { IWeatherLoc } from '../interfaces/iweather-loc';
import { WeatherPage } from '../pages/weather/weather';
import { Observable, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class LocationsService{
    locations: Array<IWeatherLoc>;
    locationsSubject: BehaviorSubject<Array<IWeatherLoc>> = new BehaviorSubject([]);
    locations$: Observable<Array<IWeatherLoc>> = this.locationsSubject.asObservable();


    constructor(){
        this.locations = [
      { title: 'Berlin, Deutschland', component: WeatherPage, icon: 'pin', loc: {lat:52.520000659, lon: 13.4049539}},
      { title: 'Munich, Deutschland', component: WeatherPage, icon: 'pin', loc: {lat:48.1351253, lon: 11.58198}},
      { title: 'New York, USA', component: WeatherPage, icon: 'pin', loc: {lat:40.71278, lon: -74.00594}},
      { title: 'Tokio, Japan', component: WeatherPage, icon: 'pin', loc: {lat:35.6894875, lon: 139.6917063}}
    ];
    this.refresh();
    }
    getLocations(){
        return Promise.resolve(this.locations);
    }
    removeLocation(loc){
        let index = this.locations.indexOf(loc);
        if (index != -1){
            this.locations.splice(index, 1);
            this.refresh();
        }
    }
    addLocation(loc){
        this.locations.push(loc);
        this.refresh();
    }
    refresh() {
        this.locationsSubject.next(this.locations);
    }

}