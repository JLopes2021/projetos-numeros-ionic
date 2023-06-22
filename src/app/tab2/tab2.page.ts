import { Component } from '@angular/core';
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
export class Tab2Page {

  handlerMessage = '';
  roleMessage = '';

  expenses: Expense[] = [
    { title: 'Lanches', valor: 15, date: '2023-06-20', category: 'comida' },
    { title: 'Gas', valor: 50, date: '2023-06-19', category: 'transporte' },
    { title: 'Aluguel', valor: 1000, date: '2023-06-18', category: 'casa-decoracao' },
    // Add more sample expenses
  ];

  filteredExpenses: Expense[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  salary: number = 1300;
  newExpenseTitle: string = '';
  newExpenseAmount: number = 0;
  newCategory: string = '';

  constructor(private alertController: AlertController) {
    this.filteredExpenses = this.expenses;
  }

  filterExpenses() {
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesSearchTerm = expense.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? expense.category === this.selectedCategory : true;
      return matchesSearchTerm && matchesCategory;
    });
  }

  get totalExpenses(): number {
    return this.filteredExpenses.reduce((total, expense) => total + expense.valor, 0);
  }

  get remainingAmount(): number {
    const remaining = this.salary - this.totalExpenses;
    return remaining;
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


  async showExceededSalaryAlert() {
    const alert = await this.alertController.create({
      header: 'Gastou mais do que ganha! Enfim, eis o Brasil!',
      message: 'Por favor, reveja as suas despesas.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewDidEnter() {
    if (this.totalExpenses > this.salary) {
      this.showExceededSalaryAlert();
    }
  }
}
