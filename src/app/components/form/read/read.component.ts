import { Component, OnInit, Output, EventEmitter, NgModule, Pipe, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, MinLengthValidator } from '@angular/forms';
import { Subscription, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { PersonService } from '../../../service/savereaddelete.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['../form.component.css']

})
export class ReadComponent implements OnInit {

  persons;
  constructor(private personService: PersonService) {

  }

  ngOnInit() {

   
  }
  readData(){
    this.personService.getpersonDetails().subscribe(data =>{
      this.persons = data;
    });
  }

}
