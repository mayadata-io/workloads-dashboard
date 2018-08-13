import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/savereaddelete.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
private jivaDetail
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.jivaDetail = this.personService.getJivaVolumeDetails();
    console.log(this.jivaDetail);
  }

}
