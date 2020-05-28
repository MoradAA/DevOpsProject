import { Component, OnInit } from '@angular/core';
import { BoilerServiceService } from 'src/app/boiler-service.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  statusBoilerSetting: boolean;
  maxTempBoilerSetting: Number;
  minTempBoilerSetting: Number;
  prefTempBoilerSetting:Number;


  statusBoiler: boolean;
  maxTempBoiler: Number;
  minTempBoiler: Number;
  prefTempBoiler: Number;
  invalidInput: boolean = true;
  boilerService: BoilerServiceService;
  constructor(bs: BoilerServiceService) { 
    this.boilerService = bs;
    this.maxTempBoilerSetting = bs.maximumTemperatureBoiler;
    this.minTempBoilerSetting = bs.minimumTemperatureBoiler;
    this.prefTempBoilerSetting = bs.preferredTemperatureBoiler;
    this.statusBoilerSetting = bs.boilerOn;
   
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    //when the page is closed, this method will save the settings to the boilerservice.
    this.updateServiceSettings(this.boilerService);
    console.log(this.boilerService.preferredTemperatureBoiler);
  }

  updateSettings(){
    this.statusBoiler = this.statusBoilerSetting;
    this.maxTempBoiler = this.maxTempBoilerSetting;
    this.minTempBoiler = this.minTempBoilerSetting;
    this.prefTempBoiler = this.prefTempBoilerSetting;
    console.log("Saved Settings");
  }

  updateServiceSettings(bs : BoilerServiceService){
      bs.maximumTemperatureBoiler=this.maxTempBoiler;
      bs.minimumTemperatureBoiler=this.minTempBoiler;
      bs.boilerOn = this.statusBoiler;
      bs.preferredTemperatureBoiler = this.prefTempBoiler;
  }

  formatSetting(bool : boolean){
    if (bool == true){
      return  "Active";
    }
    else {
      return "Inactive";
    }
  }


  checkInput(){
   //Method to validate input
  }
}
