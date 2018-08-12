import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modle';
import { RecipeService } from '../../recipes/recipe.service';
@Component({
  selector: 'app-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit {

  @Input() selectedRecipe;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  constructor(private recipeService: RecipeService) {
    
   }
  
  ngOnInit() {
    this.recipeService.getGroupedCategories()
    .subscribe(response => {
      var parsedResponse = response as any[]
      for (let i=0;i<parsedResponse.length;i++) {
        console.log(parsedResponse[i])
        this.doughnutChartLabels.push(parsedResponse[i]._id);
        this.doughnutChartData.push(parsedResponse[i].count);
      }
    })
  }
  
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
