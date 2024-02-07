import { Injectable, signal } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class FormService {

  forms$ = signal<FormGroup[]>([]);

}