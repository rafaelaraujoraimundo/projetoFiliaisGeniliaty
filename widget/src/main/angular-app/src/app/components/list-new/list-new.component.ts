import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FluigService } from '../../services/fluig.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.css']
})
export class ListNewComponent implements OnInit {

  filialOptions: any[] = [];
  form?: FormGroup;
  userLogin!: string;
  user!: User;
  user$!: Observable<User>;
  constructor(
    private fb: FormBuilder,
    private fluigService: FluigService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userLogin = this.fluigService.getUserLogin();
    this.createForm();
    this.getFilial();
    this.getUser();
  }

  // Função para criar o FormGroup (formulário) com os campos solicitados
  createForm() {
    this.form = this.fb.group({
      ativoInativo: ['on'],  // Preenche com valor padrão
      codigoFilial: [null],  // Será preenchido pelo usuário
      dataAlteracao: [{ value: new Date().toISOString().split('T')[0], disabled: true }],  // Readonly
      dataCriacao: [{ value: new Date().toISOString().split('T')[0], disabled: true }],  // Dia atual
      usuarioAlteracao: [{ value: this.userLogin , disabled: true }],  // Readonly
      usuarioCriacao: [{ value: this.userLogin, disabled: true }],  // Valor fixo
      valorFilial: [{ value: '1212', disabled: true }]  // Readonly
    });
  }

  // Função para carregar a lista de filiais para o dropdown
  getFilial() {
    this.fluigService.getFilial().subscribe({
      next: (res: any) => {
        this.filialOptions = res.content.values.map((filial: any) => ({
          value: filial.CODIGO,
          label: filial.CODIGO + ' - ' + filial.NOME + ' - ' + filial.CNPJ,
        }));
      },
      error: (err: any) => {
        this.poNotification.error(err.error.message);
        console.log(err);
      }
    });
  }

  // Função para salvar o formulário preenchido
  saveForm() {
    const formValue = this.form!.getRawValue();
    const payload = {
      values: [
        { fieldId: 'ativoInativo', value: formValue.ativoInativo === 'on' },  // Converte para booleano
        { fieldId: 'codigoFilial', value: formValue.codigoFilial },
        { fieldId: 'dataAlteracao', value: formValue.dataAlteracao },
        { fieldId: 'dataCriacao', value: formValue.dataCriacao },
        { fieldId: 'usuarioAlteracao', value: this.user.name },
        { fieldId: 'usuarioCriacao', value: this.user.name },
        { fieldId: 'valorFilial', value: formValue.valorFilial }
      ]
    };

    this.fluigService.incluirFilial(payload).subscribe({
      next: (res) => {
        this.poNotification.success('Filial incluída com sucesso!');
        this.router.navigate(['']);  // Redireciona para a página inicial
      },
      error: (err) => {
        this.poNotification.error('Erro ao incluir a filial: ' + err.error.message);
        console.log(err);
      }
    });
  }
  cancel() {
    this.router.navigate(['']);  // Redireciona para a rota padrão (inicial)
  }

  getUser() {
    // Usamos o FluigService para buscar o usuário com base no userCode
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
