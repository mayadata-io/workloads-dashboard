import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { contactDetails } from "./form.model";
import { randomDetails } from "./random.model"

@Injectable()

export class FormService {
  private contactAdd: contactDetails[] = [];
  private contactUpdated = new Subject<contactDetails[]>();
  private randomAdd : randomDetails[] = [];
  private apiurl:string;
  private host:string;

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
        "http://localhost:3000/sample/users"
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
      .post<{ message: string }>("http://localhost:3000/sample/users", contactAdd)
      .subscribe(responseData => {
        this.contactAdd.push(contactAdd);
      });
  }

  addRandomDetails(randomNumber:number, randomString: string) {
    const randomAdd: randomDetails = { rNumer: randomNumber, rString: randomString};
    this.http
      .post<{ message: string }>("http://localhost:3000/sample/detail", randomAdd)
      .subscribe(responseData => {
        this.randomAdd.push(randomAdd);
        // this.contactUpdated.next([...this.contactAdd]);
      });
  }
}
