import { Component } from '@angular/core';
import { BarTabService } from '../bar-tab.service';
import { Drink } from '../bar-tab.service';

@Component({
  selector: 'app-bar-tab',
  templateUrl: './bar-tab.component.html',
  styleUrls: ['./bar-tab.component.css']
})
export class BarTabComponent {
  public drinks: Drink[] = [];

  constructor(public bartapService: BarTabService) {
    this.getBarTabs()
  }

  public getBarTabs() {
    this.bartapService.getBarTabs()
      .then((data: Drink[]) => {
        this.drinks = data;
      })
      .catch((error: any) => {
        console.error('Error fetching bar tabs:', error);
        this.drinks = [];
      });
      console.log(this.drinks)
  }

  public addDrink(drink: string) {
    this.bartapService.addDrink(drink)
      .then((data: Drink[]) => {
        this.drinks = data;
      })
      .catch((error: any) => {
        console.error('Error adding drink:', error);
      });
  }
}
