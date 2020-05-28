import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  title = 'PowerToHeatB';
  Quarters: string[];

  data: any;
  options: any;

  quarter: string;
  price: number;
  priceList: number[] = [];
  dateList: string[] = [];

  selectedDate: string;
  dbDate: string = "/2020-03-22";

  //Methode waarbij data wordt opgezocht in de database moet worden verplaatst naar aparte methode.
  constructor(db: AngularFireDatabase) {
    db.list(this.dbDate) //User kan nu zelf een datum kiezen die dan wordt opgezocht in de database
    .valueChanges().subscribe((Quarters: string[]) => {
      this.Quarters = Quarters;
      //console.log(this.Quarters);

      for (let i = 0; i < this.Quarters.length; i++) {
        //Parse the element to JSON so I can access the pPos property and push this in the priceList
        this.price = JSON.parse(this.Quarters[i]).pPos;
        this.priceList.push(this.price);

        //Parse the element to JSON so I can access the pPos property and push this in the dateList
        this.quarter = JSON.parse(this.Quarters[i]).Quarter;
        this.dateList.push(this.quarter);
      }
    });
    //const itemRef = db.object('/Students');
    //itemRef.update({ age: "24" });

      this.data = {
          labels: this.dateList,
          datasets: [
              {
                  label: 'Prices',
                  data: this.priceList,
                  fill: false,
                  borderColor: '#4bc0c0'
              },
              // {
              //     label: 'Second Dataset',
              //     data: [28, 48, 40, 19, 86, 27, 90],
              //     fill: false,
              //     borderColor: '#565656'
              // }
          ]
      }

      this.options = {
        title: {
            display: true,
            text: this.title,
            fontSize: 16
        },
        legend: {
            position: 'bottom'
        }
    };
  }

  set SelectedDate(value: string){
    this.selectedDate = value;
    this.dbDate = "/" + this.selectedDate;
    this.searchDate();
  }

  ngOnInit() {

  }

  searchDate(): void{
    console.log(this.selectedDate);
    console.log(this.dbDate);
  }
}

// export interface quarterData {
//   Quarter: Date;
//   pNeg: number;
//   pPos: number;
// }
