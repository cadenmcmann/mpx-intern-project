import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: [],
})
export class ShoppingComponent {
  userToken: string;
  public foodIconLink =
    'https://www.seriouseats.com/thmb/3JoYWz3_PajrDhL57P9eQrpg-xE=/735x0/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__07__20150702-sous-vide-hamburger-anova-primary-bf5eefff4505446f9cbf33f5f2d9b2e6.jpg';

  public electronicsIconLink =
    'https://media.istockphoto.com/photos/mobile-devices-picture-id178716575?k=20&m=178716575&s=612x612&w=0&h=Cpbs-ivT4RGz--xBlXFrHhTTPX5kaEcRd4FK4koduWM=';

  public beveragesIconLink =
    'https://cdn-icons-png.flaticon.com/512/3050/3050153.png';

  public alcoholIconLink =
    'https://cdn-icons-png.flaticon.com/512/920/920523.png';

  constructor() { }

}
