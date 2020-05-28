import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BoilerComponent } from './home/boiler/boiler.component';
import { FooterComponent } from './footer/footer.component';

import { LineChartComponent } from './home/line-chart/line-chart.component';
import {ChartModule} from 'primeng/chart';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { BeslissingsAlgoritmeComponent } from './beslissings-algoritme/beslissings-algoritme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatisticsComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    SettingsComponent,
    NavigationComponent,
    BoilerComponent,
    FooterComponent,
    LineChartComponent,
    BeslissingsAlgoritmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "settings", component: SettingsComponent},
      { path: "about", component: AboutComponent },
      { path: "contact", component: ContactComponent},      
      { path: "profile", component: ProfileComponent },
      { path: "statistics", component: StatisticsComponent},
      { path: "linechart", component: LineChartComponent},
      { path: "algoritme", component: BeslissingsAlgoritmeComponent},
      {path: "" , redirectTo:"home", pathMatch:"full"}
    ]),
    ChartModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  

})
export class AppModule { }
