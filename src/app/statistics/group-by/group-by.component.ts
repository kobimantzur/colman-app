import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modle';

@Component({
  selector: 'app-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit {

  @Input() selectedRecipe;
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnChanges(changes: SimpleChanges, e: any) {
    console.log(changes);
    const selectedRecipe: SimpleChange = changes.selectedRecipe;
    if (selectedRecipe.currentValue != undefined) {
      this.selectedRecipe = selectedRecipe.currentValue;
      console.log(selectedRecipe);
      console.log(this.selectedRecipe.ingredients);
      for (let ingredient of this.selectedRecipe.ingredients) {
        this.doughnutChartData.push(ingredient.ingredients.amount);
        this.doughnutChartLabels.push(ingredient.ingredients.name);
        console.log(changes);
        console.log(this.doughnutChartData);
      }
    }
    
  }
  
  ngOnInit() {
  }
  
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
