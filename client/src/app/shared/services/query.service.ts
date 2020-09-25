import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Query} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  create(title, file, quest, answer, answers) {

    const fd = new FormData()

    fd.append('title', title)

    if (file) fd.append('file', file, file.name)

    fd.append('quest', quest)

    fd.append('answer', answer)

    fd.append('answers', answers)

    return this.http.post('/api/query/', fd)
  }

  getAll(id): Observable<Query> {
    return this.http.get<Query>(`/api/query/${id}`)
  }

}
