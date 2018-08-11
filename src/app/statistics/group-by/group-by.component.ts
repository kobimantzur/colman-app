import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modle';

@Component({
  selector: 'app-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit {

  @Input() selectedRecipe;
  public dataPoints = [];
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
    for (let ingredient of this.selectedRecipe.ingredients) {
      var dataPoint = {
        y: ingredient.ingredients.amount,
        name: ingredient.ingredients.name
      }
      this.dataPoints.push(dataPoint);
    }
  }
  
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
