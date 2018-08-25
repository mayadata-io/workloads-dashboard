import { Component, OnInit, Output, EventEmitter, NgModule, Pipe, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, MinLengthValidator } from '@angular/forms';
import { Subscription, Observable, timer } from 'rxjs';
import { contactDetails } from '../form.model';
import { FormService } from '../form.service';
import { take } from 'rxjs/operators';
import { PersonService } from '../../../service/savereaddelete.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../form.component.css']

})
export class DeleteComponent implements OnInit {

 
  leadForm: FormGroup;
  name: FormControl;
  isFormEmpty: boolean = false;
  count = 100;

  posts: contactDetails[] = [];
  private postsSub: Subscription;
  constructor(private personService: PersonService) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();

    timer(0, 100000).subscribe(x => {
      // console.log(Math.floor(Math.random() * 10000000));
      var rnumber = Math.floor(Math.random() * 10000000)
      // this.agileServices.addPost(this.leadForm.value.name,this.leadForm.value.email, this.leadForm.value.companyname,this.mdTag);
      // this.agileServices.addRandomDetails(rnumber, 'fd');
    });
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
  }

  createForm() {
    this.leadForm = new FormGroup({
      name: this.name,
    });
  }

  formSubmit() {

    if (this.name.errors == null) {
      // this.agileServices.addPost(this.leadForm.value.name, this.leadForm.value.email, this.leadForm.value.companyname, this.mdTag);
     console.log(this.leadForm.value.name);
     this.personService.deletePerson(this.leadForm.value.name);
   
    }
    if (this.name.errors) {
      this.isFormEmpty = true;
    }
  }

}
