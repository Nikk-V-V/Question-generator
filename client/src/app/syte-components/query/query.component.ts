import { Component, OnInit } from '@angular/core';
import {Quest} from "../../shared/interfaces";
import {QuestService} from "../../shared/services/quest.service";
import {AuthService} from "../../shared/services/auth.service";
import {CreateQuestComponent} from "../create-quest/create-quest.component";
import {QueryService} from "../../shared/services/query.service";

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  file;

  queryTitle = ''
  answer: ''
  answers: []


  constructor(
    private questService: QuestService,
    public quest: CreateQuestComponent,
    private query: QueryService
  ) { }

  async ngOnInit() {

  }



  onFileSelect(event) {
    this.file = event.target.files[0]
    const reader = new FileReader()
  }


  createInputAnswer() {
    let out = ''
    // @ts-ignore
    let quantity = +document.getElementById('quantity').value

    let html = `
        <div class="d-flex justify-center">
            <input class="ans" type="text">
        </div>
    `
    for (let i = 0; i < quantity; i++){
     out += html
    }
    document.getElementById('alternative-answers').innerHTML = out;
  }

  create() {
    this.change()
    let obs$;

    obs$ = this.query.create(this.queryTitle, this.file, this.quest.questId,this.answer, this.answers);
    obs$.subscribe(
      () => {
        this.answers = []
        this.answer = ''
        this.queryTitle = ''
        this.file = undefined
        this.createInputAnswer()
      }
    )
  }

  change() {

    this.answers = []

    document.querySelectorAll('.ans')
      .forEach(
        x =>{
          // @ts-ignore
          this.answers.push(x.value)
        }
      )
  }

}
