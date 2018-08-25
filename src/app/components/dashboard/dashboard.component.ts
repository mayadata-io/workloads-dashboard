import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/savereaddelete.service'
import { statefulSet, jivaReplica, jivaController, applicationPod, overAllStatus, link } from "../../model/data.model";
import * as $ from 'jquery';
import { Subscription, Observable, timer } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jivaDetail;
  jivas;
  private windowWidth;
  public statefullSets: statefulSet[] = [];
  public jivaContrllers: jivaController[] = [];
  public jivaReplicas: jivaReplica[] = [];
  public applicationPods: applicationPod[] = [];
  public overAllStatus: overAllStatus[] = [];
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
    this.personService.getJivaVolumeDetails().subscribe(res => {
      this.jivaDetail = res;
      this.jivas = this.jivaDetail.data.items;
      // console.log(this.jivaDetail.data.items[0]);
    });

    timer(0, 10000).subscribe(x => {

      this.personService.getPodDetails().subscribe(res => {

        this.statefullSets = res.statefulSet;
        this.applicationPods = res.applicationPod;
        this.jivaContrllers = res.jivaController;
        this.jivaReplicas = res.jivaReplica;
        this.dockerImage = this.jivaContrllers[0].openebsjivaversion;
        this.openebsversion = this.jivaContrllers[0].openebsjivaversion.split(":")[1];
        this.overallStatus = res.status;
        if (this.overallStatus == "Running") {
          this.runningStatus = true;
        } else if (this.overallStatus == "Pending" || this.overallStatus == "Failed") {
          this.failledStatus = true
        }
        else {
          this.unknownStatus = true;
        }

        error =>{
          this.unknownStatus = true;
          console.log(res);
        }
        
      })
    });





    // window.onload = function () {
    //   var drawline = [];
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', "https://mongojiva.test.openebs.io/api/pods/sequence", true);
    //   xhr.send();

    //   xhr.onreadystatechange = processRequest;
    //   function processRequest(e) {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //       var response = JSON.parse(xhr.responseText);
    //       console.log(response);
    //       for (var i = 0; i < response.statefulSet.length; i++) {
    //         var div = document.getElementById(response.statefulSet[i].name);
    //         var divOffset = offset(div);
    //         console.log(divOffset.left + (document.getElementById(response.statefulSet[i].name).clientWidth / 2), divOffset.top + (document.getElementById(response.statefulSet[i].name).offsetHeight / 2));
    //         drawline.push([{
    //           startx: divOffset.left + (document.getElementById(response.statefulSet[i].name).clientWidth / 2),
    //           starty: divOffset.top + (document.getElementById(response.statefulSet[i].name).offsetHeight / 2),
    //           id: response.statefulSet[i].name,
    //           adjency: response.statefulSet[i].adjacency,
    //           pvc: response.statefulSet[i].pvc
    //         }]);
    //         response.statefulSet[i].startx = divOffset.left + (document.getElementById(response.statefulSet[i].name).clientWidth / 2);
    //         response.statefulSet[i].starty = divOffset.top + (document.getElementById(response.statefulSet[i].name).offsetHeight / 2)
    //       }
    //       for (var i = 0; i < response.jivaController.length; i++) {
    //         var div = document.getElementById(response.jivaController[i].name);
    //         var divOffset = offset(div);
    //         console.log(divOffset.left + (document.getElementById(response.jivaController[i].name).clientWidth / 2), divOffset.top + (document.getElementById(response.jivaController[i].name).offsetHeight / 2));
    //         response.jivaController[i].startx = divOffset.left + (document.getElementById(response.jivaController[i].name).clientWidth / 2);
    //         response.jivaController[i].starty = divOffset.top + (document.getElementById(response.jivaController[i].name).offsetHeight / 2)


    //         for (var j = 0; j < response.statefulSet.length; j++) {
    //           if (response.statefulSet[j].pvc == response.jivaController[i].pvc) {
    //             document.getElementById('path').innerHTML = document.getElementById('path').innerHTML + `<path id=${response.statefulSet[i].name} d="M ${response.statefulSet[j].startx} ${response.statefulSet[j].starty} L ${response.jivaController[i].startx} ${response.jivaController[i].starty}" stroke="red" stroke-width="3" fill="none" />`;
    //           }
    //         }

    //       }
    //       for (var i = 0; i < response.jivaReplica.length; i++) {
    //         var div = document.getElementById(response.jivaReplica[i].name);
    //         var divOffset = offset(div);
    //         console.log(divOffset.left + (document.getElementById(response.jivaReplica[i].name).clientWidth / 2), divOffset.top + (document.getElementById(response.jivaReplica[i].name).offsetHeight / 2));

    //         response.jivaReplica[i].startx = divOffset.left + (document.getElementById(response.jivaReplica[i].name).clientWidth / 2);
    //         response.jivaReplica[i].starty = divOffset.top + (document.getElementById(response.jivaReplica[i].name).offsetHeight / 2)

    //         for (var j = 0; j < response.jivaController.length; j++) {
    //           if (response.jivaReplica[j].pvc == response.jivaController[i].pvc) {
    //             document.getElementById('path').innerHTML = document.getElementById('path').innerHTML + `<path id=${response.jivaController[i].name}  d="M ${response.jivaController[i].startx} ${response.jivaController[i].starty} L ${response.jivaReplica[j].startx} ${response.jivaReplica[j].starty}" stroke="green" stroke-width="3" fill="none" />`;
    //             console.log(response.jivaReplica[i].pvc)
    //             console.log(response.jivaReplica[i].name)
    //             console.log(response.jivaController[j].pvc)
    //             console.log(response.jivaController[j].name)

    //           }
    //         }

    //       }
    //     }
    //   }

    // }


    // function offset(el) {
    //   var rect = el.getBoundingClientRect(),
    //     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    //     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //   return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    // }

  }

}
