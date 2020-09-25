import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Quest} from "../interfaces";
import {Params} from "@angular/router";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private http: HttpClient) {}

  create(title: string, description: string, image?: File) {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('title', title);

    fd.append('description', description);

    return this.http.post('/api/quest/', fd)
  }

  getById(id: Params): Observable<Quest>{
    return this.http.get<Quest>(`/api/quest/${id}`)
  }

  fetch(): Observable<Quest[]> {
    return this.http.get<Quest[]>('/api/quest/')
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)
  }
}
