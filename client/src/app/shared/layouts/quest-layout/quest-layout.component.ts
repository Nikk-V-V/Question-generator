import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestService} from "../../services/quest.service";
import {QueryService} from "../../services/query.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-quest-layout',
  templateUrl: './quest-layout.component.html',
  styleUrls: ['./quest-layout.component.scss']
})
export class QuestLayoutComponent implements OnInit {

  isAuth;
  constructor(
    public auth: AuthService,
    ) { }

  ngOnInit(): void {
    this.isAuth = !!localStorage.getItem('authToken');
    this.auth.getProfile()
  }



}
