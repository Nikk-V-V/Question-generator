import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestService} from "../../shared/services/quest.service";
import {QueryService} from "../../shared/services/query.service";
import {Subject, Subscription} from "rxjs";
import {QuestLayoutComponent} from "../../shared/layouts/quest-layout/quest-layout.component";

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  questId;
  task = [];
  queries = [];
  queryNumber = 0;
  isVideoImg;
  value;
  number = new Subject<number>();
  disabled = true;

  constructor(
    private router: ActivatedRoute,
    private quest: QuestService,
    private query: QueryService,
  ) { }

  ngOnInit(): void {
    this.get()

  }

  get() {
    this.router.params.subscribe(
      res => this.questId = res['id']
    )

    this.quest.getById(this.questId).subscribe(
      res => this.task = res['task']
    )

    this.query.getAll(this.questId).subscribe(
      res => {
        this.queries = res['query']
        this.init()
      }
    )

  }


  init() {
    if (this.queries[this.queryNumber].file)
      this.isVideoImg = this.queries[this.queryNumber].file.split('.')[1] === 'jpeg' || this.queries[this.queryNumber].file.split('.')[1] === 'png';
  }


  check(e, value) {
    let check = e.target.parentElement.querySelector('.chk');
    document.querySelectorAll('.chk').forEach((x) => {
      x === check
        ? x.className = 'chk fas fa-check-circle'
        : x.className = 'chk far fa-check-circle'
    })
    this.value = value;
    this.disabled = false
  }


  chooseAnswer(value) {
    let query =  document.querySelectorAll('.query')[this.queryNumber];
    if (this.queries[this.queryNumber].answer === value) {
      query.className = `query true`
    } else {
      query.className = `query false`
    }

    this.queryNumber++
    if (this.queryNumber === this.queries.length) {
      this.model()

      return true
    }

    this.init()
    this.disabled = true
  }


  model() {
    const model = document.getElementById('model').style
    if (model.opacity === '1') {
      model.opacity = '0'
      model.zIndex = '-1'
    } else {
      model.opacity = '1'
      model.zIndex = '100'
    }

  }
}
