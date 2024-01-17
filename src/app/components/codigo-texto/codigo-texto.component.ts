import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigo-texto',
  templateUrl: './codigo-texto.component.html',
  styleUrls: ['./codigo-texto.component.scss'],
})
export class CodigoTextoComponent  implements OnInit {

  constructor() { }

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  ngOnInit() {}

}
