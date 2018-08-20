import { ElementRef, Component, OnInit, Input, SimpleChanges, SimpleChange, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modle';
import { RecipeService } from '../../recipes/recipe.service';
import * as d3 from "d3";
@Component({
  selector: 'app-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit {
  @Input() selectedRecipe;
    private host: any;
    public svg: any;
    public pieLabels: string[] = [];
    public pieData: number[] = [];
    public height: any;
    public width: any;
    public radius: any;
    public g: any;
  constructor(private recipeService: RecipeService) {
    
   }
  ngOnInit() {
    this.recipeService.getGroupedCategories()
    .subscribe(response => {
      var parsedResponse = response as any[]
      for (let i=0;i<parsedResponse.length;i++) {
      
        this.pieLabels.push(parsedResponse[i]._id);
        this.pieData.push(parsedResponse[i].count);
      }
      console.log("starting svg")
      var totalCount = parsedResponse.length;		//calcuting total manually
    
      var width = 1200,
      height = 600,
      radius = 200;
      let counter = 0;
      const colors = ['#000000','#f8b70a','#6149c6','#9f8170','#8ABD4A']
      for (let i=0;i<parsedResponse.length;i++) {
        counter += parsedResponse[i].count;
        parsedResponse[i].color = colors[i] ? colors[i] : colors[0];
      }
      console.log(parsedResponse);

      const data = parsedResponse.map(item => {
        return {
          name: item._id,
          count: item.count,
          color: item.color,
          percentage: (item.count/counter)*100
        }
      })
      var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(100);
  
      var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d['count'];
        });
  
      var svg = d3.select('body').append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
      var g = svg.selectAll(".arc")
        .data(pie(data as any))
        .enter().append("g");    
  
       g.append("path")
        .attr("d", arc as any)
        .style("fill", function(d,i) {
          return d.data['color'];
        });
  
      g.append("text")
        .attr("transform", function(d) {
          var _d = arc.centroid(d as any);
          _d[0] *= 1.5;	//multiply by a constant factor
          _d[1] *= 1.5;	//multiply by a constant factor
          return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function(d) {
          if(d.data['percentage'] < 8) {
            return '';
          }
          return d.data['name'] + '-' + d.data['percentage'] + '%';
        });
          
      g.append("text")
       .attr("text-anchor", "middle")
       .attr('font-size', '4em')
       .attr('y', 20)
       .text(totalCount);
  });

  }

}
