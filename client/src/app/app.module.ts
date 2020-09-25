import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Query} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './syte-components/home/home.component';
import { TasksComponent } from './syte-components/tasks/tasks.component';
import { TaskInfoComponent } from './syte-components/task-info/task-info.component';
import { OptionQuestComponent } from './syte-components/option-quest/option-quest.component';
import { CreateQuestComponent } from './syte-components/create-quest/create-quest.component';
import { UpdateQuestComponent } from './syte-components/update-quest/update-quest.component';
import { QueryComponent } from './syte-components/query/query.component';
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/classes/auth.guard";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {SyteLayoutComponent} from "./shared/layouts/syte-layout/syte-layout.component";
import {QuestService} from "./shared/services/quest.service";
import {QueryService} from "./shared/services/query.service";
import { QuestLayoutComponent } from './shared/layouts/quest-layout/quest-layout.component';
import { QuestComponent } from './quest-components/quest/quest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SyteLayoutComponent,
    RegisterComponent,
    AuthLayoutComponent,
    HomeComponent,
    TasksComponent,
    TaskInfoComponent,
    OptionQuestComponent,
    CreateQuestComponent,
    UpdateQuestComponent,
    QueryComponent,
    QuestLayoutComponent,
    QuestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    QuestService,
    QueryService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LoginComponent,
    CreateQuestComponent,
    QuestComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
