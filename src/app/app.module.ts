import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { FormService } from './components/form/form.service';
import { PersonService } from './service/savereaddelete.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SaveComponent } from './components/form/save/save.component';
import { ReadComponent } from './components/form/read/read.component';
import { DeleteComponent } from './components/form/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DashboardComponent,
    SaveComponent,
    ReadComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FormService, PersonService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
