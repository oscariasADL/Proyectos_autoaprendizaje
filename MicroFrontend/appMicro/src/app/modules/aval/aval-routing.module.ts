import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsGuard } from '@commons/guards/products.guard';
import { AvalProductsComponent } from '@modules/aval/components/aval-products/aval-products.component';
import { StocksDetailComponent } from '@modules/aval/components/stocks-detail/stocks-detail.component';
import { StocksComponent } from '@modules/aval/components/stocks/stocks.component';
import { TuPlusComponent } from '@modules/aval/components/tu-plus/tu-plus.component';

const routes: Routes = [
  {
    path: 'products/:bank_code',
    component: AvalProductsComponent
  },
  {
    path: 'tu-plus',
    canActivate: [ProductsGuard],
    component: TuPlusComponent
  },
  {
    path: 'stocks',
    canActivate: [ProductsGuard],
    component: StocksComponent
  },
  {
    path: 'stocks-detail/:date/:type',
    canActivate: [ProductsGuard],
    component: StocksDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvalRoutingModule {}
