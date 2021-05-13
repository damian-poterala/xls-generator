import { Component                                                                                                              } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormControlDirective } from '@angular/forms';

export class TemplateRowForm {
  [key: string]: AbstractControl;
  nameHeader = new FormControl('', Validators.required);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  form: FormGroup = new FormGroup({
    reportName      : new FormControl(''),
    reportFileName  : new FormControl(''),
    reportSheetName : new FormControl(''),
    colorHeader     : new FormControl(''),
    borderHeader    : new FormControl(''),
    stickyHeader    : new FormControl(''),
    amountHeaders   : new FormControl(''),
    headersName     : new FormArray([]),
  });

  yesOrNo : any = [];
  bases   : any = [];

  constructor(

  ) {  }

  ngOnInit(): void {
    this.yesOrNo = [
      { label: 'Yes', value: 1 }, 
      { label: 'No' , value: 2 }
    ];
    
    this.bases   = [
      { label: 'MySql Old'  , value: 1 },
      { label: 'MySql New'  , value: 2 },
      { label: 'Mssql'      , value: 3 },
      { label: 'Stock Mssql', value: 4 },
    ]
  }

  get template() {
    return this.form.get('headersName') as FormArray;
  }

  addedHeadersName() {
    this.template.push(new FormGroup(new TemplateRowForm()));
  }

  generateInputsWithHeadersName() {
    console.log('%c Number of headers: ', 'color: #338333', this.form.get('amountHeaders')?.value);

    for(var i = 0; i < this.form.get('amountHeaders')?.value; i++) {
      this.addedHeadersName();
    }

  }

}
