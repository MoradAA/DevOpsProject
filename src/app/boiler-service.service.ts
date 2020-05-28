import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoilerServiceService {
  //The service that handles all of the boiler data.
  /*  -Ideally we should have about 3 (or more) boilers in our database of which the user can choose.
      -Name, power, capacity, description, image should be stored in our database and are none changeable properties.
      -Minimum- and Maximumtemperature, state, preferredTemperature should be stored and are changeable properties.
      -Current Temperature is dependent on the boiler itself this is none changeable and should update regularly depending on the state of the boiler.
  */


  imgSourceBoiler: String = "assets/img/boiler.png";
  nameBoiler: String = "Van Marcke Go elektrische boiler droge weerstand 200 L"; 
  powerBoiler: String= "1200W";
  minimumTemperatureBoiler: Number = 45;
  maximumTemperatureBoiler: Number = 90;
  currentTemperatureBoiler: Number= 56;
  preferredTemperatureBoiler: Number = 65;
  boilerOn: boolean = false;
  boilerCapactiy: Number = 200;
  descriptionBoiler: String = "Deze elektrische boiler van Van Marcke met droge weerstand is ideaal geschikt als verticaal wandmodel. Hij heeft een eenvoudige montage als muurmodel en zorgt voor een snelle opwarming met een hoogwaardige weerstand. Bovendien beschikt deze boiler over een CE-keurnorm."




  constructor() { }
}
