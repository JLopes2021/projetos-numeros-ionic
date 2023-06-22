import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  expenses: Expense[] = [
    { title: 'Compra do Mês', valor: 450, date: '2023-06-20', category: 'comida' },
    { title: 'Água', valor: 35, date: '2023-06-19', category: 'contas' },
    { title: 'Luz', valor: 97, date: '2023-06-19', category: 'contas' },
  ];

  filteredExpenses: Expense[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  salary: number = 1300;
  newExpenseTitle: string = '';
  newExpenseAmount: number = 0;
  newCategory: string = '';
  totalExpenses: number = 0;
  remainingAmount: number = 0;

  constructor(private alertController: AlertController) {
    this.filteredExpenses = this.expenses;
  }

  ngOnInit() {
    this.calculateTotalExpenses();
  }

  filterExpenses() {
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesSearchTerm = expense.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? expense.category === this.selectedCategory : true;
      return matchesSearchTerm && matchesCategory;
    });
    this.calculateTotalExpenses();
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.filteredExpenses.reduce((total, expense) => total + expense.valor, 0);
    this.remainingAmount = this.salary - this.totalExpenses;
  }

  addExpense() {
    const newExpense: Expense = {
      title: this.newExpenseTitle,
      valor: this.newExpenseAmount,
      date: new Date().toISOString(),
      category: this.newCategory,
    };

    this.expenses.push(newExpense);
    this.filterExpenses();

    // Reset the input fields
    this.newExpenseTitle = '';
    this.newExpenseAmount = 0;
  }

  async showAlertHelp() {
    const alert = await this.alertController.create({
      header: 'Olá, tudo certo?',
      message: 'Esse aplicativo vem para ajudar você nas contas das despesas. \n Utilize as categorias: Casa, Contas, Comida, Transporte, Outros',
      buttons: ['OK']
    });

    await alert.present();
  }
}
