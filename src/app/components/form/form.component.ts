import { Component, OnInit, Output, EventEmitter, NgModule, Pipe, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, MinLengthValidator } from '@angular/forms';
import { Subscription, Observable, timer } from 'rxjs';
import { contactDetails } from './form.model';
import { FormService } from './form.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {


  leadForm: FormGroup;
  name: FormControl;
  email: FormControl;
  companyname: FormControl;
  isFormEmpty: boolean = false;
  setFormChange: boolean = false;
  mdTag: string = 'MDMainPage';
  count = 100;

  posts: contactDetails[] = [];
  private postsSub: Subscription;
  constructor(private agileServices: FormService) {

  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();

    timer(0, 100000).subscribe(x => {
      // console.log(Math.floor(Math.random() * 10000000));
      var rnumber = Math.floor(Math.random() * 10000000)
      // this.agileServices.addPost(this.leadForm.value.name,this.leadForm.value.email, this.leadForm.value.companyname,this.mdTag);
      this.agileServices.addRandomDetails(rnumber, 'fd');
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  };


  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.companyname = new FormControl();
  }

  createForm() {
    this.leadForm = new FormGroup({
      name: this.name,
      email: this.email,
      companyname: this.companyname
    });
  }

  formSubmit() {

    if (this.name.errors == null && this.email.errors == null) {
      this.agileServices.addPost(this.leadForm.value.name, this.leadForm.value.email, this.leadForm.value.companyname, this.mdTag);
    }
    if (this.name.errors || this.email.errors) {
      this.isFormEmpty = true;
    }
  }


}