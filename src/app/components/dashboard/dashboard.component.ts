import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/savereaddelete.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jivaDetail;
  jivas;
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getJivaVolumeDetails().subscribe(res => {
      this.jivaDetail = res;
      this.jivas = this.jivaDetail.data.items;
      console.log(this.jivaDetail);
      console.log('this is data')
      console.log(this.jivaDetail.data);
      console.log('this is item')
      console.log(this.jivaDetail.data.items);
      console.log('this is metad data')
      // console.log(this.jivaDetail.data.items[0]);
    });

  }

}
