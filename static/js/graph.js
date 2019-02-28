queue()
    .defer(d3.csv, "data/Salaries.csv")
    .await(makeGraph);


function makeGraph(error, salaryData){
  
  var ndx = crossfilter(salaryData);
  
  disciplineSelector(ndx);
  genderBalance(ndx);
  
  dc.renderAll()
  
}

function disciplineSelector(ndx){
    var dim = ndx.dimension(dc.pluck('discipline'));
    var group = dim.group();
    
    dc.selectMenu('#discipline_selector')
        .dimension(dim)
        .group(group);
}



function genderBalance(ndx){
    
    var dim = ndx.dimension(dc.pluck('sex'));
    var group = dim.group();
    
    dc.barChart('#gender_balance')
        .width(400)
        .height(300)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(group)
        .transitionDuration(1500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Gender')
        .yAxis().ticks(20);

}

