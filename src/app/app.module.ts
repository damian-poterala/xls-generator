import { BrowserModule           } from '@angular/platform-browser';
import { NgModule                } from '@angular/core';
import { HttpClientModule        } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule             } from '@angular/forms';
import { ReactiveFormsModule     } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent     } from './app.component';

import { InputTextModule   } from 'primeng/inputtext';
import { DropdownModule    } from 'primeng/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    DropdownModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
