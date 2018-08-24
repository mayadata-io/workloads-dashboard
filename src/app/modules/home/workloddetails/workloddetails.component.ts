import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../service/savereaddelete.service';
import { statefulSet, jivaReplica, jivaController, applicationPod, overAllStatus, link,pvc } from "../../../model/data.model";
import * as $ from 'jquery';
import { Subscription, Observable, timer } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-workloddetails',
  templateUrl: './workloddetails.component.html',
  styleUrls: ['./workloddetails.component.scss']
})
export class WorkloddetailsComponent implements OnInit {
  jivaDetail;
  jivas;
  private windowWidth;
  public statefullSets: statefulSet[] = [];
  public jivaContrllers: jivaController[] = [];
  public jivaReplicas: jivaReplica[] = [];
  public applicationPods: applicationPod[] = [];
  public overAllStatus: overAllStatus[] = [];
  public pvc: pvc[] = [];
  public pvctemp; 
  public pvcarray;
  public namespace = "";
  public dockerImage = "";
  public openebsversion = "";
  public overallStatus = "";
  public runningStatus = false;
  public failledStatus = false;
  public unknownStatus = false;
  constructor(private personService: PersonService) {
    this.windowWidth = window.innerWidth
  }

  ngOnInit() {
    // this.personService.getJivaVolumeDetails().subscribe(res => {
    //   this.jivaDetail = res;
    //   this.jivas = this.jivaDetail.data.items;
    //   // console.log(this.jivaDetail.data.items[0]);
    // });

    // timer(0, 10000).subscribe(x => {

      this.personService.getPodDetails().subscribe(res => {
        console.log(res);
        this.statefullSets = res.statefulSet;
        this.applicationPods = res.applicationPod;
        this.jivaContrllers = res.jivaController;
        this.jivaReplicas = res.jivaReplica;
        this.pvc = res.pvc;
        this.pvctemp=res.pvc
        this.pvcarray = this.pvctemp.pvc
        console.log(this.pvcarray);

        
        // console.log(res.pvc);
        // console.log(res);
        // console.log(this.pvcDetail +'hgvhjgvkhgvkhvkjhvkjh');
        this.dockerImage = this.jivaContrllers[0].openebsjivaversion;
        this.openebsversion = 'OpenEBS:' + this.jivaContrllers[0].openebsjivaversion.split(":")[1];
        this.namespace = this.jivaContrllers[0].namespace;
        this.overallStatus = res.status;
        if (this.overallStatus == "Running") {
          this.runningStatus = true;
        } else if (this.overallStatus == "Pending" || this.overallStatus == "Failed") {
          this.failledStatus = true
        }
        else {
          this.unknownStatus = true;
        }

        error => {
          this.unknownStatus = true;
          console.log(res);
        }

      })
    // });

  }
  public listVolume() {
    this.personService.getJivaVolumeDetails().subscribe(res => {
      this.jivaDetail = res;
      this.jivas = this.jivaDetail.data.items;
      // console.log(this.jivaDetail.data.items[0]);
    });
  }

}
