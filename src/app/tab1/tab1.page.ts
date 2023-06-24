import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {}

  d: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')']; // Dígitos permitidos
  o: string[] = ['+', '-', '*', '/']; // Operadores permitidos
  v: string = ''; // Expressão de cálculo atual
  r: any; // Resultado do cálculo

  /**
   * Adiciona um dígito à expressão de cálculo.
   * @param d O dígito a ser adicionado.
   */
  addDigit(d: string) {
    this.v += d;
  }

  /**
   * Adiciona um operador à expressão de cálculo.
   * @param o O operador a ser adicionado.
   */
  setOperator(o: string) {
    this.v += o;
  }

  /**
   * Adiciona a função de raiz quadrada à expressão de cálculo.
   */
  addSquareRoot() {
    this.v += 'Math.sqrt(';
  }

  /**
   * Limpa a expressão de cálculo atual.
   */
  clear() {
    this.v = '';
    this.r = null;
  }

  /**
   * Realiza o cálculo da expressão de cálculo atual.
   * Exibe o resultado do cálculo.
   * Em caso de erro, exibe null como resultado.
   */
  calculate() {
    try {
      this.r = eval(this.v);
    } catch (e) {
      this.r = null;
    }
  }
}
