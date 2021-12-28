import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingRoutingModule } from "./landing-routing.module";
import { RouterModule } from "@angular/router";
import { LandingComponent } from "./landing.component";

import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./template/navbar/navbar.component";
import { FooterComponent } from "./template/footer/footer.component";
@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [NavbarComponent, FooterComponent]
})
export class LandingModule {}
