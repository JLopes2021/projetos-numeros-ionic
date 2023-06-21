import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {

  }
  digits: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0','(',')'];
  operators: string[] = ['+', '-', '*', '/',];
  displayValue: string = '';
  resultado: any;
  addDigit(digit: string) {
    this.displayValue += digit;
  }

  setOperator(operator: string) {
    this.displayValue += operator;
  }

  addSquareRoot() {
    this.displayValue += 'Math.sqrt(';
  }
  clear() {
    this.displayValue = '';
    this.resultado = null;
  }

  calculate() {
    try {
      this.resultado = eval(this.displayValue);
    } catch (error) {
      this.resultado = null;
    }
  }

}


