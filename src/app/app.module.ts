import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { LoginComponent }  from './components/login.component';
import { RegisterComponent }  from './components/register.component';
import { DefaultComponent }  from './components/default.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, AppRoutingModule ],
  declarations: [ AppComponent, LoginComponent, RegisterComponent, DefaultComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
