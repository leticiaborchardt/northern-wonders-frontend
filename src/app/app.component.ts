import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';

const matFormFieldDefaultOptions: MatFormFieldDefaultOptions = {
  hideRequiredMarker: true
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: matFormFieldDefaultOptions
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "MM/dd/Y" }
    }
  ]
})
export class AppComponent {
  title = 'northern-wonders';
}
