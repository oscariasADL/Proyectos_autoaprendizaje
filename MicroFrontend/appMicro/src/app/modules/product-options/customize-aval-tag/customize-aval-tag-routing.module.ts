import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomizeAvalTagCanActivateGuard } from '@modules/product-options/customize-aval-tag/guards/customize-aval-tag.guard';
import { CustomizeAvalTagPage } from '@modules/product-options/customize-aval-tag/customize-aval-tag.page';
import { EmptyAvalTagGuardParam } from './guards/empty-aval-tag.guard';
import { CustomizeAvalTagSelectComponent } from './components/customize-aval-tag-select/customize-aval-tag-select.component';
import CustomizeResultTransactionComponent from './components/customize-result-transaction/customize-result-transaction.component';
import { CustomizeResultFailedComponent } from './components/customize-result-failed/customize-result-failed.component';

const routes: Routes = [
  {
    path: '',
    component: CustomizeAvalTagPage,
    canActivate: [EmptyAvalTagGuardParam]
  },
  {
    path: ':aval_tag',
    canActivate: [CustomizeAvalTagCanActivateGuard],
    children: [
      {
        path: '',
        component: CustomizeAvalTagPage
      },
      {
        path: 'edit_key',
        component: CustomizeAvalTagSelectComponent
      },
      {
        path: 'transaction-result',
        component: CustomizeResultTransactionComponent
      },
      {
        path: 'transaction-failed',
        component: CustomizeResultFailedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizeAvalTagRoutingModule {}
