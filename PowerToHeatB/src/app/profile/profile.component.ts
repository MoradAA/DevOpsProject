import { Component, OnInit, ɵConsole } from '@angular/core';
import {AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import 'firebase/database';
import { Time } from '@angular/common';
import {UserTime} from './UserTime';
import * as sha512 from 'js-sha512';
import { DatabaseServiceService } from '../database-service.service';
import { debug } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  

})
export class ProfileComponent implements OnInit {

  loggedInAs:string;

  dbSnapshot$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  Credentials$: BehaviorSubject<string|null>;

  username:string; 
  password:string;

  loggedIn:number;
  isAMatch:number;

  result:string;
  db:AngularFireDatabase;

  items:Observable<any>;
  public arrayString:string[];
  public _string:string;
  public _number:number;


  constructor(db:AngularFireDatabase,private service:DatabaseServiceService) 
  {
    this.loggedInAs = "";
    this.result = '';
    this.db = db;
    this.username = "user1";
    this.password = "p1";

    this.Credentials$ = new BehaviorSubject(null);
    this.dbSnapshot$ = this.Credentials$.pipe
    (
      switchMap(size => db.list('/Login_Credentials', ref => ref.child(this.username).orderByValue().equalTo(sha512.sha512(this.password)
      )).snapshotChanges())
    );
  }

  ngOnInit() 
  {
  }

  dayChoice : String;
  startTimeChoice: Time;
  endTimeChoice: Time;
  userTimeArray: UserTime[] = new Array();
  user : UserTime;

  //Makes an array (userTimeArray) within this array there are UserTime objects with their own day, start and end time.
  //Each element in this array is a period in which the customer NEEDS hotwater.
  //For example monday between 07:00 and 09:00 AM
  addTime(){

    if (this.dayChoice != null && this.startTimeChoice != null && this.endTimeChoice != null){
      this.user = new UserTime();
      this.user.day = this.dayChoice;
      this.user.startTime = this.startTimeChoice;
      this.user.endTime = this.endTimeChoice;
      this.userTimeArray.push(this.user);

      console.log(this.userTimeArray);
    }  
  }


  ObserveCredentials():void
  {
    this.dbSnapshot$.subscribe(queriedItems => {
      this.isAMatch = queriedItems.length;
      this.ValidateCredentials();
    });
  }

  ValidateCredentials = () =>
  {
    if(this.isAMatch != 0 && this.isAMatch != null)
    {
      alert("Logged in succesfully as: " + this.username)
      this.loggedIn = 1;
      this.loggedInAs = this.username;
    }
    else
    {
      this.loggedIn = 0;
      alert("Login failed, username and password did not match.")
    }
  }

  GeneratePassword = (l,db:AngularFireDatabase) => 
  {
    if(this.loggedInAs != " ")
    {
      this.result = "";
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charLength = chars.length;
      for ( var i = 0; i < l; i++ ) 
      {
        this.result += chars.charAt(Math.floor(Math.random() * charLength));
      }
      alert("New password generated: " + this.result);
      this.HashPassword(db);
    }
 }
 
  HashPassword = (db:AngularFireDatabase) =>
  {
    this.result = sha512.sha512(this.result);

    const itemRef = db.object('/Login_Credentials/user1');                
    itemRef.update({ password: this.result });
  }


  startTime:Time;
  stopTime:Time;
  day:string;
  entryName:string;
  checkBool:boolean = false;

  SaveUserSettings = (db:AngularFireDatabase) =>
  {
    if(this.loggedInAs != " ")
    {
      const itemsRef = db.object('/Login_Credentials/user1');
      itemsRef.update({Manual: this.checkBool});
      
    }

    if(this.startTime != null && this.stopTime != null && this.day != "" && this.loggedInAs != " ")
    {
      const itemsRef = db.list('/Login_Credentials/user1/User_Settings');
      itemsRef.push({entry: this.entryName, day:this.day,stoptime: this.stopTime ,starttime: this.startTime});
      
    }
  }
}
