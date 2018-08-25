import { Component, OnInit, Output, EventEmitter, NgModule, Pipe, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, MinLengthValidator } from '@angular/forms';
import { Subscription, Observable, timer } from 'rxjs';
import { contactDetails } from '../form.model';
import { FormService } from '../form.service';
import { take } from 'rxjs/operators';
import { PersonService } from '../../../service/savereaddelete.service';
@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['../form.component.css']
})
export class SaveComponent implements OnInit {


  leadForm: FormGroup;
  name: FormControl;
  age: FormControl;
  email: FormControl;
  isFormEmpty: boolean = false;
  setFormChange: boolean = false;
  count = 100;

  posts: contactDetails[] = [];
  private postsSub: Subscription;
  constructor(private personService: PersonService) {

  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();

    // timer(0, 100000).subscribe(x => {
    //   // console.log(Math.floor(Math.random() * 10000000));
    //   var rnumber = Math.floor(Math.random() * 10000000)
    //   // this.agileServices.addPost(this.leadForm.value.name,this.leadForm.value.age, this.leadForm.value.companyname,this.mdTag);
    //   // this.agileServices.addRandomDetails(rnumber, 'fd');
    // });
  }
  ngOnDestroy() {
    // this.postsSub.unsubscribe();
  };


  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.age = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.leadForm = new FormGroup({
      name: this.name,
      age: this.age,
      email: this.email
    });
  }

  formSubmit() {

    if (this.name.errors == null && this.age.errors == null && this.email.errors == null) {
      // console.log(this.leadForm.value.name+' '+ this.leadForm.value.age+' '+this.leadForm.value.email)
      this.personService.savePersonDetails(this.leadForm.value.name,this.leadForm.value.email,this.leadForm.value.age);
    }
    if (this.name.errors || this.age.errors) {
      this.isFormEmpty = true;
    }
  }
}
