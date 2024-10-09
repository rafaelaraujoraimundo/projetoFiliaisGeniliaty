import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PoTableColumn, PoTableDetail, PoTagType } from '@po-ui/ng-components';
import { User } from '../interfaces/user';
import { WINDOW } from 'ngx-window-token';
import { IWCMAPI } from '../interfaces/IWCMAPI';

@Injectable()
export class FluigService {

WCMAPI!: IWCMAPI;
  
body?: Object = {}
httpOptions: any;
      
      constructor(
        @Inject(WINDOW) private _window: Window,
                private http: HttpClient,
      ) { 
        this.WCMAPI = this._window.WCMAPI;
        this.httpOptions = environment.development ? {
        
        headers: new HttpHeaders({
          'Authorization': 'Bearer eyJraWQiOiI1OGM3NjQzZi03NTQwLTQ4Y2YtOGVhYy01NDhiM2I4MGYxOTMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWZhZWwuYXJhdWpvIiwicm9sZSI6InVzZXIsYWRtaW4iLCJ0ZW5hbnQiOjEsInVzZXJUZW5hbnRJZCI6NDQ3LCJzaXRlQ29kZSI6IkZsdWlnIiwic2l0ZUlkIjoxLCJ1c2VyVHlwZSI6MCwidXNlclVVSUQiOiJjNWViZmI2Yy0xZDA2LTQyNDMtYjMxZi1iZTkwOGJlNjY5NjciLCJ0ZW5hbnRVVUlEIjoiNThjNzY0M2YtNzU0MC00OGNmLThlYWMtNTQ4YjNiODBmMTkzIiwibGFzdFVwZGF0ZURhdGUiOjE3MjgwNDQ5NDgwMDAsInVzZXJUaW1lWm9uZSI6IkFtZXJpY2EvU2FvX1BhdWxvIiwiZXhwIjoxNzI4NDc0MTU2LCJpYXQiOjE3Mjg0NzI5NTYsImF1ZCI6ImZsdWlnX2F1dGhlbnRpY2F0b3JfcmVzb3VyY2UifQ.TMv0eMESSygh4cHNxEkAmWRKjYLXUdP0uopXEXgYCtZjys4sODN89q52P-3R7AHr7IjgJDHGxNddcAHIfUBTTSiYGmHQeYSkOyCr5UCd7uYOOr3JDymtVkl2ZnYZcTxBvLUA4yyxSDAIhOH_y8ITJmF4QWYyvIf0FzTmOAQR-9P7qH7nq53luWOb-vf8lLRG-j5rEYUbPtUX6EutY80RBX4K0bno9Hivawp5Syq0DRJ3tamfZkXWLXVUuboDjnWvk0A7RP68My_Xms7Rbwj7kBdCP8VERkrwDqMzgI9dp5y5EcLEiy2vmMoviMHtvFWWPCR5mvhMv_1JQMVrREdA9g',
        })
      } : undefined; }


  public getDataset(): Observable<any> {
        const url = '/api/public/ecm/dataset/datasets/';
        
       
          this.body = {
            "name": 'ds_filialProjetosGeniality',
            "constraints": [],
          }

        return this.http.post(url, this.body, this.httpOptions);
      }

  public getFilial(): Observable<any> {
        const url = '/api/public/ecm/dataset/datasets/';
        
         this.body = {
            "name": "ds_zoom_estab_cnpj",
            "constraints": [],
        }
        return this.http.post(url, this.body, this.httpOptions);
      }

public incluirFilial(payload: any): Observable<any> {
  const urlProd = '/ecm-forms/api/v2/cardindex/664732/cards';
  const urlHomolog = '/ecm-forms/api/v2/cardindex/111518/cards';
  const url = urlProd
        return this.http.post(url, payload, this.httpOptions);
      }


  //cardid e documentid
  public deleteFilial(cardid: string, documentid: string){
    const url = `/ecm-forms/api/v2/cardindex/${cardid}/cards/${documentid}`
    return this.http.delete(url, this.httpOptions);
  }

  public inativarFilial(cardid: string, documentid: string, payload: any) {
    const url = `/ecm-forms/api/v2/cardindex/${cardid}/cards/${documentid}`;
    return this.http.put(url, payload, this.httpOptions);  // Usando PUT para atualizar
  }

  getColumns(): Array<PoTableColumn> {
        return [
            { property: 'codigoFilial', label: 'Código Filial' },
            { property: 'ativoInativo', label: 'Ativo:', type: 'boolean' },
            { property: 'dataCriacao', label: 'Data de Criação', type: 'date' },
            { property: 'usuarioCriacao', label: 'Usuário Criação' },
            { property: 'dataAlteracao', label: 'Data de Alteração', type: 'date' },
            { property: 'usuarioAlteracao', label: 'Usuário Alteração' },
            //{ property: 'cardid', label: 'Card ID' },
            //{ property: 'documentid', label: 'Document ID' },
            { property: 'acoes', label: '', type: 'columnTemplate' }
            //{ property: 'valorFilial', label: 'Valor Filial', type: 'currency', format: 'BRL' }
        ];
    }
  
    public getCurrent(userLogin: string): Observable<any> {
     
      const url = `/collaboration/api/v3/users/${userLogin}`
      
      return this.http.get(url, this.httpOptions)
   
    }
    
     
    public getUserLogin(): string {
      return this.WCMAPI.userLogin;
    }
       
}

declare global {
  interface Window {
    WCMAPI: IWCMAPI;
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
