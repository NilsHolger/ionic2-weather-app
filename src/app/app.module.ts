import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { GeoCodeService } from '../providers/geocodeservice';
import { WeatherService } from '../providers/weatherservice';
import { LocationsService } from '../providers/locationsservice';
import { Weathericon } from '../pipes/weathericon';

@NgModule({
  declarations: [
    MyApp,
    WeatherPage,
    LocationsPage,
    Weathericon
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    LocationsPage
  ],
  providers: [GeoCodeService, WeatherService, LocationsService]
})
export class AppModule {}
