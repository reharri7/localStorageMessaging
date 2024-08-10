import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbar,
    MatIconModule,
    MatButton
  ]
})
export class HomeModule { }
