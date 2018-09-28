import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { overAllStatus } from "../model/data.model";

@Injectable()
export class KubernetsService {

  private apiurl: string;
  private host: string;
  constructor(private http: HttpClient) {
    this.host = window.location.host;
    if ((this.host.toString().indexOf("localhost")+1) && this.host.toString().indexOf(":")) {
      this.apiurl = "http://localhost:3000/";
    } else {
      this.apiurl = "https://" + window.location.host + "/api/";
    }
  }

  getJivaVolumeDetails() {
    return this.http.get(this.apiurl + "openebs/volume");
  }

  getPodDetails() {
    return this.http.get<overAllStatus>(this.apiurl + "pods/sequence");
  }

}
