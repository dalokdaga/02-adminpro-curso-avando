import { Component } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  labels1: Label[]= ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1:MultiDataSet= [
    [350, 450, 100],
  ];

  labels2: Label[]= ['Estacionario', 'Portátil', 'Carburación'];
  public data2:MultiDataSet= [
    [50, 30, 20],
  ];

  labels3: Label[]= ['Pemex', 'Propangol', 'Barco'];
  public data3:MultiDataSet= [
    [6000, 3000, 1000],
  ];

  labels4: Label[]= ['Anden', 'Bascula', 'Pipaa'];
  public data4:MultiDataSet= [
    [100, 10, 30],
  ];
}
