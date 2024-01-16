import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterModule, HomeComponent, NgxSpinnerModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'poke-catalog';
}
