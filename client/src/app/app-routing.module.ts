import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./auth-components/login/login.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {RegisterComponent} from "./auth-components/register/register.component";
import {HomeComponent} from "./syte-components/home/home.component";
import {TasksComponent} from "./syte-components/tasks/tasks.component";
import {TaskInfoComponent} from "./syte-components/task-info/task-info.component";
import {OptionQuestComponent} from "./syte-components/option-quest/option-quest.component";
import {CreateQuestComponent} from "./syte-components/create-quest/create-quest.component";
import {UpdateQuestComponent} from "./syte-components/update-quest/update-quest.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {SyteLayoutComponent} from "./shared/layouts/syte-layout/syte-layout.component";
import {QuestLayoutComponent} from "./shared/layouts/quest-layout/quest-layout.component";
import {QuestComponent} from "./quest-components/quest/quest.component";

const routes: Routes = [
  {
    path: '', component: SyteLayoutComponent, children: [
      {path: '', redirectTo: '/tasks', pathMatch: 'full'},
      {path: 'tasks', component: TasksComponent},
      {path: 'task/:id', component: TaskInfoComponent},
      {path: 'option-quest', component: OptionQuestComponent, children: [
          {path: 'create', component: CreateQuestComponent},
          {path: 'update', component: UpdateQuestComponent}
        ]}
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: '', redirectTo: '/login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ]
  },
  {
    path: '', component: QuestLayoutComponent, children: [
      {
        path: '', redirectTo: '/login', pathMatch: 'full'
      },
      {
        path: 'quest/:id', component: QuestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
