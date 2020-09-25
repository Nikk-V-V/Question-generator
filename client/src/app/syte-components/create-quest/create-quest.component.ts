import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestService} from "../../shared/services/quest.service";
import {Quest} from "../../shared/interfaces";

@Component({
  selector: 'app-create-quest',
  templateUrl: './create-quest.component.html',
  styleUrls: ['./create-quest.component.scss']
})
export class CreateQuestComponent implements OnInit {

  @ViewChild('input') input: ElementRef

  form: FormGroup;
  image: File;

  imagePreview: string | ArrayBuffer;

  quests: Quest[] = [];
  questId;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private questService: QuestService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required)
    })
    this.get()
  }

  onSubmit() {
    let obs$;
    console.log(this.form.value['title'])
    this.form.disable();
    obs$ = this.questService.create(this.form.value['title'], this.form.value['description'], this.image);
    obs$.subscribe(
      () => {
        this.form.enable()
        this.get()
      }
    )
  }

  onFileSelect(event) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }


  chooseQuest(e, id) {
    document.querySelectorAll('.choose').forEach(
      x => {
        if (x === e.target) {
          x.className = 'choose fas fa-check'
        } else {
          x.className = 'choose'
        }
      }
    )
    this.questId = id;
  }

  get() {
    this.questService.fetch().subscribe(
      res => this.quests = res['tasks']
    )
  }


  show_(cont, id) {
    const quest = document.getElementById(cont)
    const arrow = document.getElementById(id)

    if ( arrow.className === 'fas fa-arrow-alt-circle-up') {
      quest.style.height = '100%'
      arrow.className = 'fas fa-arrow-alt-circle-down'
    } else {
      quest.style.height = '0px'
      arrow.className = 'fas fa-arrow-alt-circle-up'
    }
  }
}



