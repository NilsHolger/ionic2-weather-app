import { ICurrentLoc } from './icurrent-loc';

export interface IWeatherLoc {
    title: string;
    component: any;
    icon: string;
    loc?: ICurrentLoc;
}