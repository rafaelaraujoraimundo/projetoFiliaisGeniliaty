import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FluigService } from '../../services/fluig.service';
import {
  PoComboOption,
  PoDialogService,
  PoNotificationService,
  PoTableColumn,
  PoTagType
} from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  columns: Array<any> = new Array();
  public items: Array<any> = [];
  userLogin!: string;
  user!: User;
  user$!: Observable<User>;

  constructor(
    private fluigService: FluigService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userLogin = this.fluigService.getUserLogin();

    this.columns = this.fluigService.getColumns();
    this.getCards()
    this.getUser();
    
    };

    addItem() {
      this.router.navigate(['/card-new']);  // Redireciona para a página de criação
    }
    
    getCards(){
      this.fluigService.getDataset().subscribe(
        (response: any) => {
          this.items = [];
          this.items = response.content.values.map((val: any) => ({
            codigoFilial: val.codigoFilial,
            ativoInativo: val.ativoInativo,  // Tratamento para checkbox
            dataCriacao: val.dataCriacao,
            usuarioCriacao: val.usuarioCriacao,
            dataAlteracao: val.dataAlteracao,
            usuarioAlteracao: val.usuarioAlteracao,
            cardid: val.cardid,
            documentid: val.documentid,
            valorFilial: val.valorFilial,
            acoes: {
              ...val,  // Inclui todas as propriedades de val
              inativarButton: val.ativoInativo === "true" ? false : true // Adiciona o campo inativarButton invertido
            }
             
          }
          
        ));
        console.log(this.items)
        },
        (error) => {
        //this.poNotification.error(error.error.message)
        console.error('Erro ao consumir a API', error);
        }
      );
    }
    editItem(row: any) {
      console.log(row)
    }

    confirmDelete(row: any) {
      this.poDialog.confirm({
        title: 'Confirmação de Exclusão',
        message: `Você tem certeza de que deseja excluir a filial ${row.codigoFilial}?`,
        confirm: () => {
          console.log(row)
          this.excluirItem(row);
        },
        cancel: () => {
          console.log('Operação cancelada.');
        }
      });
    }

    confirmInativar(row: any) {
      this.poDialog.confirm({
        title: 'Confirmação de Inativação',
        message: `Você tem certeza de que deseja Inativar a filial ${row.codigoFilial}?`,
        confirm: () => {
          console.log(row)
          this.inativarItem(row);
        },
        cancel: () => {
          console.log('Operação cancelada.');
        }
      });
    }

    inativarItem(row: any) {
      
      const payload = {
        "values": [
          { "fieldId": "ativoInativo", "value": false },
          { "fieldId": "dataAlteracao", "value": new Date().toISOString().split('T')[0] },
          { "fieldId": "usuarioAlteracao", "value": this.user.name }
        ]
      };
    
      this.fluigService.inativarFilial(row.cardid, row.documentid, payload).subscribe(
        (response: any) => {
          this.poNotification.success('Filial inativada com sucesso!');
          this.getCards();  // Atualiza a lista de cards
        },
        (error) => {
          console.error('Erro ao consumir a API', error);
        }
      );
    }

    excluirItem(row: any) {
      this.fluigService.deleteFilial(row.cardid, row.documentid).subscribe(
        (response: any) => {
        this.poNotification.success('Filial excluída com sucesso!');
        this.getCards()
        },
        (error) => {
        //this.poNotification.error(error.error.message)
        console.error('Erro ao consumir a API', error);
        }
      );
    }
  
    InativarButton(value: any){
      if (value.ativoInativo === true){
        console.log(value.ativoInativo)
        console.log(value)
        return false
      }
      return false
    }
    getUser() {
      // Usamos o FluigService para buscar o usuário com base no userLogin
      this.fluigService.getCurrent(this.userLogin).subscribe({
        next: (res: any) => {
          // Criamos um objeto do tipo User com base na resposta da API
          this.user = {
            email: res.email,
            name: res.name,
            alias: res.alias
          };
          console.log('Usuário carregado:', this.user);
        },
        error: (err: any) => {
          // Tratamento de erro
          this.poNotification.error('Erro ao carregar o usuário: ' + err.error.message);
          console.log(err);
        }
      });
    }
}
