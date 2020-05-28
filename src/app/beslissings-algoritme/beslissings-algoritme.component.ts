import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, observable } from 'rxjs';
import 'firebase/database';
import { DatabaseServiceService } from '../database-service.service';
import { Time, DatePipe } from '@angular/common';
import { interval } from 'rxjs';


@Component({
  selector: 'app-beslissings-algoritme',
  templateUrl: './beslissings-algoritme.component.html',
  styleUrls: ['./beslissings-algoritme.component.css']
})
export class BeslissingsAlgoritmeComponent implements OnInit 
{

  EP:EnergiePrijs = new EnergiePrijs();
  UT:UserTime = new UserTime();
  S:Setting = new Setting();
  
  boiler:Boiler = new Boiler();
  mintemp:number = 60;
  maxTemp:number = 90;
  prefTemp:number = 65;

  _string:string;
  _arrayString:string[];

  SC:StateController = new StateController();
  boilerState:Boolean;

  prijsIndex:number = 2;

  today:string;

  items:Observable<any>;
  public arrayString:string[];

  public tag: string;

  constructor(db:AngularFireDatabase,private service:DatabaseServiceService) 
  { 

    interval(500 * 60).subscribe(x => {

     
    this.GetCurrentDay();
    console.debug(this.today);   

    this.boiler.MinTemp =  this.mintemp;
    this.boiler.MaxTemp =  this.maxTemp;
    this.boiler.PrefTemp = this.prefTemp;

    this.service.DbGetItem("/Login_Credentials/user1",0).subscribe(element => 
      {
        this.S.ManueleInstelling = element[0];
        console.debug(element[0])
       
      });

    this.service.DbGetItem("/Boilers/-M576F7ZRQKBv0KmMXlW",0).subscribe(element => 
      {
        this.boiler.CurrTemp = element[3];
       
      });


      this.service.DbGetItem(this.today,this.prijsIndex).subscribe(element => //date moet dynamish veranderen
        {
            this._string = JSON.stringify(  element[element.length-1]).slice(0,15); // neemt de laatste entry uit de databaselijst.
            this._string= this._string.replace(/[^\d.]/g, '');
            console.debug(this._string)
            this.EP.PrijsOpDitMoment = Number.parseInt(this._string);
        });


        
      this.service.DbGetItems("/Login_Credentials/user1/User_Settings").subscribe(element =>  
        {
            for (let index = 0; index < element.length; index++) 
            {
                this.tag = element[index].key;
                console.debug(element[index].key)
                this.getValues(this.tag,index);
            }

        });
    });
    
    
    }

    getValues =(s:string,i:number)=>
    {
      this.items = this.service.DbGetItem("/Login_Credentials/user1/User_Settings/"+s,0);
        this.items.subscribe(element => {
        {
            console.debug(element[0])
            console.debug(element[2])
            console.debug(element[3])
            this.UT.Dag = element[0];
            this.UT.StartTijd = element[2];
            this.UT.EindTijd = element[3];
            this.boilerState = this.SC.GetStateBoiler(this.EP, this.UT, this.S, this.boiler,this.service);
        }
      });
    }

  ngOnInit() 
  {
  }

  GetCurrentDay()
  {
    this.today = "/"+ new Date().toJSON().replace(/[^\d-]/g, '').slice(0,10);
  }

}


class Boiler
{ 
  public MaxTemp:number;
  public CurrTemp:number;
  public MinTemp:number;
  public PrefTemp:number;
  public State:string;
} 


class EnergiePrijs
{
    public Tijd:Date;
    public PrijsOpDitMoment:number
    
    public SetPrijs (prijs:number)
    {
        this.PrijsOpDitMoment = prijs;
    }

    public SetTijd (tijd:Date)
    {
        this.Tijd = tijd;
    }
}


class Setting
{
    public ManueleInstelling:boolean

    public InstellingBoiler( setting:boolean)
    {
        this.ManueleInstelling = setting;
    }
}

class UserTime
{
    public Dag:string 
    public StartTijd:number
    public EindTijd:number

    public SetupUserProfile( dag:string, starttijd:string, eindtijd:string)
    {
        this.Dag = dag;
        this.StartTijd = Number.parseInt( starttijd);
        this.EindTijd = Number.parseInt(eindtijd);
    }
}



class StateController
    {
        
        minimumPrijs:number = 20;
        maximumPrijs:number = 50;
        
        dagOpDitMoment:string = "";
        //tijdopditmoment moet altijd een waarde bijgeteld worden om rekening te houden met de opwarming tijd.
        tijdOpDitMomentAsString:string = new Date().toTimeString().slice(0,6)

        tijdOpDitMoment:number = this._ConvertTimeToNumber( this.tijdOpDitMomentAsString);
        //Kan berekent worden door middel van huidige tijd en starttijd van warm water volgens userprofile.
        //In combinatie met de opwarming curve. 
        tijdTotWaterNodig:number = 0.78;


        public GetStateBoiler(EP:EnergiePrijs, UT:UserTime, S:Setting, B:Boiler,service:DatabaseServiceService)
        {
            if(new Date().getDay() == 0)
                this.dagOpDitMoment = "Sunday"
            if(new Date().getDay() == 1)
                this.dagOpDitMoment = "Monday"
            if(new Date().getDay() == 2)
                this.dagOpDitMoment = "Tuesday"
            if(new Date().getDay() == 3)
                this.dagOpDitMoment = "Wednesday"
            if(new Date().getDay() == 4)
                this.dagOpDitMoment = "Thursday"
            if(new Date().getDay() == 5)
                this.dagOpDitMoment = "Friday"
            if(new Date().getDay() == 6)
                this.dagOpDitMoment = "Saturday"
        
            UT.StartTijd = this.ConvertTimeToNumber(UT.StartTijd)
            UT.EindTijd = this.ConvertTimeToNumber(UT.EindTijd)

            //Boiler Instellingen
            B.MaxTemp = 90;
            B.MinTemp = 60;
      
            console.debug(this.dagOpDitMoment)
            console.debug(this.tijdOpDitMoment)
            console.debug(B.CurrTemp)
            console.debug(UT.Dag)
            console.debug(UT.EindTijd)
            console.debug(UT.StartTijd)
            console.debug(EP.PrijsOpDitMoment)

            //Prioriteiten
            //1. User Setting heeft hoofd prioriteit, als de user de boiler uitschakelt zal deze uit blijven.
            //2. UserProfile de gebruiker mag geen hinder ondervinden en wanneer deze warm water nodig heeft moet het ter beschikking zijn.
            //3. EnergiePrijs de energieprijs is slechts de bepalende factor als de andere prioriteiten inorde zijn.
      
            //Situatie 1a:
            //Manueel boiler uitgezet.
            if (S.ManueleInstelling != true)
            {
                console.log("Situatie 1a");
                service.DbUpdateBoilerState("off","/Boilers/-M576F7ZRQKBv0KmMXlW")
                return false;
            }


            //Situatie 1b:
            //Boiler valt onder minimum temperatuur.
            if (B.CurrTemp < B.MinTemp)
            {
                console.log("Situatie 1b");
                service.DbUpdateBoilerState("on","/Boilers/-M576F7ZRQKBv0KmMXlW")
                
                return false;
            }

            //Situatie 2:
            //Userprofile geeft aan warm water nodig te hebben (er wordt rekening gehouden met opwarming tijd zodat de boiler op temperatuur is wanneer nodig).
            //De temperatuur in de boiler is kleiner dan de gewenste temperatuur.
            //De boiler zal opwarmen tot de gewenste temperatuur.
            if (UT.Dag == this.dagOpDitMoment && this.tijdOpDitMoment > UT.StartTijd && this.tijdOpDitMoment < UT.EindTijd && B.CurrTemp < B.PrefTemp)
            {
                console.log("Situatie 2");
                service.DbUpdateBoilerState("on","/Boilers/-M576F7ZRQKBv0KmMXlW")
                return true;
            }
            
            //Situatie 3:
            //Userprofile geeft aan binnenkort (tijdtotwarmwater variabele) warm water nodig te hebben.
            //Energieprijs is lager dan minimum energieprijs.
            if (UT.Dag == this.dagOpDitMoment && this.tijdOpDitMoment > (UT.StartTijd-(this.tijdTotWaterNodig*2))  && EP.PrijsOpDitMoment < this.minimumPrijs && B.CurrTemp < B.PrefTemp)
            {
                console.log("Situatie 3");
                service.DbUpdateBoilerState("on","/Boilers/-M576F7ZRQKBv0KmMXlW")
                return true;
            }

            //Situatie 4:
            //Userprofile geeft aan binnenkort (tijdtotwarmwater variabele) warm water nodig te hebben.
            //Energieprijs is "normaal"
            console.debug(UT.StartTijd-this.tijdTotWaterNodig)
            console.debug(this.tijdOpDitMoment)
            if (UT.Dag == this.dagOpDitMoment && this.tijdOpDitMoment > (UT.StartTijd - this.tijdTotWaterNodig) && EP.PrijsOpDitMoment > this.minimumPrijs && EP.PrijsOpDitMoment< this.maximumPrijs && B.CurrTemp < B.PrefTemp)
            {
                console.log("Situatie 4");
                service.DbUpdateBoilerState("on","/Boilers/-M576F7ZRQKBv0KmMXlW")
                return true;
            }

            //Situatie 5:
            //Userprofile geeft aan binnenkort (tijdtotwarmwater variabele) warm water nodig te hebben.
            //Energieprijs is "hoog"
            if (UT.Dag == this.dagOpDitMoment && this.tijdOpDitMoment > (UT.StartTijd - this.tijdTotWaterNodig) && EP.PrijsOpDitMoment > this.maximumPrijs && B.CurrTemp < B.PrefTemp)
            {
                console.log("Situatie 5");
                service.DbUpdateBoilerState("on","/Boilers/-M576F7ZRQKBv0KmMXlW")
                return true;
            }

            //Situatie 6:
            //Userprofile geeft aan geen water nodig te hebben.
            //Energie prijs is negatief.
            if (B.CurrTemp < B.MaxTemp && EP.PrijsOpDitMoment < 0)
            {
                console.log("Situatie 6");
                service.DbUpdateBoilerState("on","/Boilers/-M576F7ZRQKBv0KmMXlW")
                return true;
            }

            return false;
        }

        ConvertTimeToNumber(time:number)
        {
            return Number.parseFloat( time.toString().replace(/[^\d.]/g, ''))/100
        }
        _ConvertTimeToNumber(time:string)
        {
            return Number.parseFloat( time.replace(/[^\d.]/g, ''))/100
        }

    }
    


