import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PgDataService } from './pg-data.service';
import { ItemViewerComponent } from './components/item-viewer/item-viewer.component';
import { SourceViewerComponent } from './components/source-viewer/source-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemViewerComponent,
    SourceViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PgDataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
