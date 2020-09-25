import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {QuestService} from "../../shared/services/quest.service";
import {Quest} from "../../shared/interfaces";
import {Observable} from "rxjs";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Observable<Quest[]>;

  constructor(private router: Router, private questService: QuestService) { }

  async ngOnInit() {
    this.questService.fetch().subscribe(res => {
      this.tasks = res['tasks']
    })
  }

}
