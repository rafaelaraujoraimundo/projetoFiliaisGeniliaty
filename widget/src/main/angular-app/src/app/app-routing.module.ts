import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { ListNewComponent } from './components/list-new/list-new.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';

const routes: Routes = [
  // Rota inicial que mostra o card-list no app-component
  { path: '', component: ListCardsComponent, pathMatch: 'full' },
  
  // Outras rotas
  { path: 'card-new', component: ListNewComponent },
  { path: 'card-edit/:id', component: ListEditComponent }, // Aqui você pode passar o id para editar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }