import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestService} from "../../shared/services/quest.service";


@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {

  quest: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questService: QuestService
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.questService.getById(res['id']).subscribe(res => this.quest = res['task'])
    });
  }

}
