import { Component, OnInit, ɵConsole } from '@angular/core';
import {AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, observable } from 'rxjs';
import 'firebase/database';
import { DatabaseServiceService } from '../database-service.service';
import { debug } from 'util';
import { BoilerServiceService } from '../boiler-service.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  
  items:Observable<any>;
  public arrayString:string[];
  public _string:string;
  showEnergy: boolean = true;
  public details:BoilerDetails[] = [];

  public tag: string;

  constructor(db:AngularFireDatabase,private service:DatabaseServiceService, bsv: BoilerServiceService) 
  {
    this.service.DbGetItems("/Boilers").subscribe(element => 
    {
      for (let index = 0; index < element.length; index++) 
      {
        this.tag = element[index].key;
        console.debug(element[index].key)
        this.getValues(this.tag,index);
      }
    });
  }

  ngOnInit() {
  }

  showEnergyM(){
    if (this.showEnergy ==true){
      this.showEnergy = false;
    }
    else 
    this.showEnergy=true;
  }
  getValues =(s:string,i:number)=>
  {
    this.items = this.service.DbGetItem("/Boilers/"+s,0);
      this.items.subscribe(x => {
      {
        this.details.push(new BoilerDetails);
        this._string =  x[3];
        this.arrayString = this._string.split(',');
        this._string = this.arrayString[0];
        //this._string = this._string.replace(/[^\d.]/g, '')
        this.details[i].currTemp = Number.parseInt(this._string);

        this._string =  x[4];
        this.arrayString = this._string.split(',');
        this._string = this.arrayString[0];
        this.details[i].setTemp = Number.parseInt(this._string);

        this.details[i].name =  x[0];
        
        this.details[i].currentEnergie =  x[2];

        this.details[i].state =  x[1];
      }
    });
  }

}

class BoilerDetails
{
  public currTemp:number;
  public name:string;
  public setTemp:number;
  public currentEnergie:string;
  public state:string;

  constructor()
  {
  }

} 
