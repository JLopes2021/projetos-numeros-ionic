import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Interface para representar uma despesa
interface Expense {
  title: string;
  valor: number;
  date: string;
  category: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  handlerMessage = '';
  roleMessage = '';

  expenses: Expense[] = []; // Lista de despesas

  filteredExpenses: Expense[] = []; // Lista de despesas filtradas
  searchTerm: string = ''; // Termo de busca
  selectedCategory: string = ''; // Categoria selecionada
  salary!: number; // Salário
  newExpenseTitle: string = ''; // Título da nova despesa
  newExpenseAmount: number = 0; // Valor da nova despesa
  newCategory: string = ''; // Categoria da nova despesa
  totalExpenses: number = 0; // Total de despesas
  remainingAmount: number = 0; // Valor restante do salário

  constructor(private alertController: AlertController) {
    this.filteredExpenses = this.expenses;
    this.showAlertInicial();
  }

  ngOnInit() {
    this.calculateTotalExpenses();
  }

  // Filtra as despesas com base no termo de busca e na categoria selecionada
  filterExpenses() {
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesSearchTerm = expense.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? expense.category === this.selectedCategory : true;
      return matchesSearchTerm && matchesCategory;
    });
    this.calculateTotalExpenses();
  }

  // Calcula o total de despesas e o valor restante do salário
  calculateTotalExpenses() {
    this.totalExpenses = this.filteredExpenses.reduce((total, expense) => total + expense.valor, 0);
    this.remainingAmount = this.salary - this.totalExpenses;
  }

  // Adiciona uma nova despesa
  addExpense() {
    const newExpense: Expense = {
      title: this.newExpenseTitle,
      valor: this.newExpenseAmount,
      date: new Date().toLocaleDateString(),
      category: this.newCategory,
    };

    // Verifica se o título da despesa está vazio
    if (this.newExpenseTitle == "") {
      this.showAlertSemTItulo();
      return;
    }
    // Verifica se o valor da despesa é menor ou igual a 0
    else if (this.newExpenseAmount <= 0) {
      this.showAlertSemValor();
      return;
    }

    this.expenses.push(newExpense);
    this.filterExpenses();

    this.newExpenseTitle = '';
    this.newExpenseAmount = 0;
  }

  // Exibe um alerta quando o título da despesa está vazio
  async showAlertSemTItulo() {
    const alert = await this.alertController.create({
      header: 'Opa, temos algum errinho aqui',
      message: 'Você se esqueceu de colocar o nome da despesa em questão, volta lá rapidinho e coloca ;)',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Exibe um alerta quando o valor da despesa é menor ou igual a 0
  async showAlertSemValor() {
    const alert = await this.alertController.create({
      header: 'Opa, temos algum errinho aqui',
      message: 'Você deve estar colocando algum valor igual a 0 ou menor que 0, volta lá rapidinho e coloca um valor maior que 0  ;)',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Exibe o alerta inicial
  async showAlertInicial() {
    const alert = await this.alertController.create({
      cssClass: 'alert_inicial',
      header: 'Olá tudo bem?',
      message: "Não se esqueça de nenhuma conta",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.showSetSalaryAlert();
          }
        }
      ]
    });

    await alert.present();
  }

  // Exibe o alerta para informar o salário
  async showSetSalaryAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert_inicial',
      header: 'Agora, Informe seu salário',
      inputs: [
        {
          name: 'salary',
          type: 'number',
          placeholder: 'Salário'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            this.salary = Number(data.salary);
            this.calculateTotalExpenses();
          }
        }
      ]
    });

    await alert.present();
  }

}
