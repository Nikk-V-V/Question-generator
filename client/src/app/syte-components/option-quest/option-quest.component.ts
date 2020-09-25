import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-quest',
  templateUrl: './option-quest.component.html',
  styleUrls: ['./option-quest.component.scss']
})
export class OptionQuestComponent implements OnInit {

  isCreate: boolean = true;
  isUpdate: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }


  changeOption(create: boolean, update: boolean){
    if (create) {
      this.isCreate = true;
      this.isUpdate = false;
    } else if (update) {
      this.isCreate = false;
      this.isUpdate = true;
    } else  {
      this.isCreate = false;
      this.isUpdate = false;
    }
  }



}
