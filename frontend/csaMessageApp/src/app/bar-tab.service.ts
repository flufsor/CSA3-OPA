import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
export interface Drink {
  name: string;
  price: number;
  isAlcoholic: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BarTabService {
  private _drinks: Drink[] = [];

  constructor(private apiService:ApiService ) {
    this.getBarTabs();
  }

  public async getBarTabs(): Promise<Drink[]> {
    try {
      const data = await this.apiService.getApiRoute("bartab");
      if (data) {
        this._drinks = data;
      }
      return this._drinks;
    } catch (error) {
      console.error('Error fetching bar tabs:', error);
      return this._drinks;
    }
  }

  public async addDrink(drink: string): Promise<Drink[]> {
    try {
      const data = await this.apiService.getApiRoute(`bartab/add/${drink}`);
      if (data) {
        this._drinks = data;
      }
      return this._drinks;
    } catch (error: any) {
        console.error('Error adding drink:', error.error.message);
      return this._drinks;
    }
  }
}
