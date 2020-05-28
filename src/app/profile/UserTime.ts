import { Time } from '@angular/common';

export class UserTime {
    
    
    private _day : String;
    public get day() : String {
        return this._day;
    }
    public set day(v : String) {
        this._day = v;
    }
    

    
    private _startTime : Time;
    public get startTime() : Time {
        return this._startTime;
    }
    public set startTime(v : Time) {
        this._startTime = v;
    }
    
    
    private _endTime : Time;
    public get endTime() : Time {
        return this._endTime;
    }
    public set endTime(v : Time) {
        this._endTime = v;
    }
    

}