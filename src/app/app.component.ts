import { Component                                                                                                              } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormControlDirective } from '@angular/forms';

import { AlphabetInterface } from './interfaces/alphabet.interface';
import { BasesInterface    } from './interfaces/bases.interface';
import { YesOrNoInterface  } from './interfaces/yesOrNo.interface';

export class TemplateRowForm {
  [key: string]: AbstractControl;
  nameHeader  = new FormControl('', Validators.required);
  aliasHeader = new FormControl('', Validators.required);
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
    centerHeader    : new FormControl(''),
    borderHeader    : new FormControl(''),
    stickyHeader    : new FormControl(''),
    amountHeaders   : new FormControl(''),
    headersName     : new FormArray([]),
  });

  yesOrNo  : YesOrNoInterface[]  = [];
  bases    : BasesInterface[]    = [];
  alphabet : AlphabetInterface[] = [];

  headerName   : string = '';
  import       : string = '';
  centerHeader : string = '';
  borderHeader : string = '';
  stickyHeader : string = '';

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
    ];

    this.alphabet = [
      { key: 0, value: 'A' },
      { key: 1, value: 'B' },
      { key: 2, value: 'C' },
      { key: 3, value: 'D' },
    ];

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

  generateFile() {
    /** import phpexcel */

    this.import += `$objPHPExcel = new PHPExcel();\n\n`;
    this.import += `$objPHPExcel->createSheet(0);\n`;
    this.import += `$objPHPExcel->setActiveSheetIndex(0);\n`;
    this.import += `$objPHPExcel->getActiveSheet()->setTitle('${ this.form.get('reportSheetName')?.value }');\n`;
    this.import += `$objPHPExcel->getProperties()->setTitle('${ this.form.get('reportSheetName')?.value }');\n\n`;


    /** header name */

    for(var i = 0; i < this.form.get('headersName')?.value.length; i++) {
      this.headerName += `$objPHPExcel->getActiveSheet()->setCellValue('${ this.alphabet[i].value }1', '${ this.form.get('headersName')?.value[i].nameHeader }');\n`;
    }

    /** header centering */

    this.form.get('centerHeader')?.value.value == 1
      ? this.centerHeader += `$objPHPExcel->getActiveSheet()->getStyle('')->applyFromArray(array(
        'alignment' => array(
          'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
        )  
      ));\n\n` 
      : this.centerHeader += '\n';


    /** border header */

    this.form.get('borderHeader')?.value.value == 1
      ? this.borderHeader += `$objPHPExcel->getActiveSheet()->getStyle('')->applyFromArray(array(
        'allborders' => array(
          'borders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
          )
        )
      ))\n\n;`
      : this.borderHeader = '\n' ;


    /** sticky header */

    this.form.get('stickyHeader')?.value.value == 1 
      ? this.stickyHeader += `\n$objPHPExcel->getActiveSheet()->freezePane('A2');\n\n`
      : this.stickyHeader = '\n' ;


    /** save file */

    var text = this.import+''+this.headerName+''+this.stickyHeader+''+this.centerHeader+''+this.borderHeader,

    blob = new Blob([text], { type: 'text/plain' }),
    anchor = document.createElement('a');

    anchor.download = "build_xls_with_php.txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
  }

}
