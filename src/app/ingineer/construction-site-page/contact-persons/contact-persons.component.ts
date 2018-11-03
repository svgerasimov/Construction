import { Component, OnInit, Input } from '@angular/core';
/** Interfaces **/
import { ContactPerson } from "../../../models/contact-person.model"

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.css']
})
export class ContactPersonsComponent implements OnInit {
  @Input() contactPersons: ContactPerson[]

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['position', 'secondName', 'name', 'patronymic', 'phone', 'email'];

}
