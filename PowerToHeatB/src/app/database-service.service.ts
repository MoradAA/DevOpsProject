import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireAction,AngularFireList } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, onErrorResumeNext } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import 'firebase/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService 
{
  items: Observable<any[]>;
  dbListName:string;
  db:AngularFireDatabase
  s:string;
  itemsRef: AngularFireList<any>;

  constructor(db:AngularFireDatabase) 
  { 
    this.db = db;
    this.itemsRef = db.list('messages');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  DbGetItems(dbListName)
  {
    this.items = this.db.list(dbListName).snapshotChanges();
    return this.items;
  }

  DbGetItem(dbListName,i)
  {
    this.items = this.db.list(dbListName).valueChanges();
    return this.items;
  }

  DbRemoveItem(key:string, listName:string)
  {
    const itemsRef = this.db.list(listName);
    itemsRef.remove(key);
  }

  DbAddItem(value:string,listName:string)
  {
    const itemsRef = this.db.object(listName);
    itemsRef.update({ DateValues: value });
  }

  DbUpdateBoilerState(value:string,listName:string)
  {
    const itemsRef = this.db.object(listName);
    itemsRef.update({ State: value });
  }
}
