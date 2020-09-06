import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoTableColumn, PoDialogService, PoNotificationService } from '@portinari/portinari-ui';

interface Itask {
  tarefa: string;
  data: Date;
}

@Component({
  selector: 'app-to-do-app',
  templateUrl: './to-do-app.component.html',
  styleUrls: ['./to-do-app.component.css']
})
export class ToDoAppComponent implements OnInit {

  literalsConfirm: any;

  constructor(
    private poNotification: PoNotificationService,
    private poAlert: PoDialogService
  ) { }

  columns: Array<PoTableColumn>;
  listOfTasks: Array<object>;
  itemEscolhido: string;
  dataValidade = new Date();
  items: Array<Itask> = [];

  public readonly pageActions: Array<PoPageAction> = [
    { label: 'Excluir', action: this.excluirTarefa.bind(this), disabled: this.desabilitarButtonExcluir.bind(this) }
  ];

  ngOnInit() {
    this.columns = this.getColums();

  }

  getColums() {
    return [
      { property: 'tarefa', label: 'Tarefa'},
      { property: 'data', label: 'Data'}
    ];
  }

  createLista() {
    console.log(this.itemEscolhido);
    this.items.push({
      tarefa: this.itemEscolhido,
      data: this.dataValidade
    });

  }


  excluirTarefa() {
    console.log('aqui2', this.items);
    this.poAlert.confirm({
      literals: this.literalsConfirm,
      title: 'Atenção!!!',
      message: 'Excluir Tarefa?',
      confirm: this.confirmExclusao.bind(this)
    });

  }

  confirmExclusao() {
    console.log('Antes', this.items);
    this.items = this.items.filter((task: any) => (task.$selected || false) === false);
    console.log('confirmExclusao', this.items);
/*     for (let i = 0; i <= this.items.length; i++) {
      if (this.items[i]['$selected']) {
        this.items = this.items.splice(i, 1);
    }
  } */
    this.poNotification.success('Exclusão realizada com sucesso!');
  }

  desabilitarButtonExcluir() {
    console.log(this.items);
    return !this.items.find(tarefa => tarefa['$selected']);
  }

}
