import { Component, OnInit } from '@angular/core';
import { BoilerServiceService } from 'src/app/boiler-service.service';


@Component({
  selector: 'app-boiler',
  templateUrl: './boiler.component.html',
  styleUrls: ['./boiler.component.css']
})
export class BoilerComponent implements OnInit {
  imgSourceBoiler: String;
  nameBoiler: String;
  powerBoiler: String;
  minimumTemperatureBoiler: Number;
  maximumTemperatureBoiler: Number;
  currentTemperatureBoiler: Number;
  stateBoiler: String;
  boilerOn: boolean;
  descriptionBoiler: String;
  preferredTemperatureBoiler: Number;
  boilerCapacity:Number;
  constructor(bs: BoilerServiceService) {

    this.imgSourceBoiler=bs.imgSourceBoiler;
    this.nameBoiler = bs.nameBoiler;
    this.powerBoiler=bs.powerBoiler;
    this.maximumTemperatureBoiler=bs.maximumTemperatureBoiler;
    this.minimumTemperatureBoiler=bs.minimumTemperatureBoiler;
    this.currentTemperatureBoiler=bs.currentTemperatureBoiler;
    this.preferredTemperatureBoiler=bs.preferredTemperatureBoiler;
    this.boilerOn=bs.boilerOn;
    this.stateBoiler= this.checkBoiler(this.boilerOn);
    this.descriptionBoiler=bs.descriptionBoiler;
    this.boilerCapacity = bs.boilerCapactiy;
   }

  ngOnInit() {

  }


  checkBoiler(currentStateBoiler:boolean)
  {
      if (currentStateBoiler==true)
      {
        return "Active";
      }
      else{
        return "Inactive";
      }
  }
}
