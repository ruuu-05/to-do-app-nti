import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';


@Component({
  selector: 'app-landing',
  imports: [RouterModule, Header, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {


}
