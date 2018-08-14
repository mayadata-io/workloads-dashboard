import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { contactDetails } from "../components/form/form.model";
import { randomDetails } from "../components/form/random.model";
import { personDetail, deletePerson, personDetails } from "../model/data.model"

@Injectable()

export class PersonService {
  private contactAdd: contactDetails[] = [];
  private contactUpdated = new Subject<contactDetails[]>();
  private randomAdd : randomDetails[] = [];
  private saveDetails: personDetail[]= [];
  private deletePersonDetails : deletePerson[]= [];
  private personDetails: personDetails[]=[];
  private apiurl:string;
  private host:string;
  private rnumber = Math.floor(Math.random() * 10000000)

  constructor(private http: HttpClient) {
    this.host = window.location.host;
    console.log(window.location);
    if(this.host == 'localhost:4200'){
      this.apiurl ='http://localhost:3000/';
      console.log(this.host);
    }
    else if((window.location.host) == 'mongojiva.test.openebs.io'){
      this.apiurl ='https://mongojiva.test.openebs.io/api/';
    }else{
      this.apiurl ='https://mongojiva.test.openebs.io/api/';
      console.log(this.host);
    }
   
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: contactDetails[] }>(
        this.apiurl+"sample/users"
      )
      .subscribe(postData => {
        this.contactAdd = postData.posts;
        this.contactUpdated.next([...this.contactAdd]);
      });
  }

  getPostUpdateListener() {
    return this.contactUpdated.asObservable();
  }

  addPost(firstName:string, emailId: string, companyName: string,addtag: string) {
    const contactAdd: contactDetails = { name: firstName, email: emailId, company: companyName,tag: addtag };
    this.http
      .post<{ message: string }>(this.apiurl+"sample/users", contactAdd)
      .subscribe(responseData => {
        this.contactAdd.push(contactAdd);
      });
  }

  addRandomDetails(randomNumber:number, randomString: string) {
    const randomAdd: randomDetails = { rNumer: randomNumber, rString: randomString};
    this.http
      .post<{ message: string }>(this.apiurl+"sample/detail", randomAdd)
      .subscribe(responseData => {
        this.randomAdd.push(randomAdd);
        // this.contactUpdated.next([...this.contactAdd]);
      });
  }

  savePersonDetails(name:string, email:string, age:number,){
    const saveDetails: personDetail = { rNumber: this.rnumber ,name: name, email:email, age:age};
    this.http
      .post<{ message: string }>(this.apiurl+"person/save", saveDetails)
      .subscribe(responseData => {
        this.saveDetails.push(saveDetails);
      });
  }
  deletePerson( name:string){
    const deletePersonDetails: deletePerson = { rNumber:this.rnumber, name: name};
    this.http
      .post<{ message: string }>(this.apiurl+"person/delete", deletePersonDetails)
      .subscribe(responseData => {
        this.deletePersonDetails.push(deletePersonDetails);
      });
  }
  getpersonDetails() {
   return this.http
      .get<{ message: string; posts: personDetails[] }>(
        this.apiurl+"person/read/"+this.rnumber
      );
      // .subscribe(responseData => {
      //   this.personDetails = responseData.posts
      //   console.log(responseData)
        
      //   // this.contactUpdated.next([...this.contactAdd]);

      // });
  }
  getJivaVolumeDetails() {
   return this.http
      .get(
        this.apiurl+"jiva/"
      );
  }

}
