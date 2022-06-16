console.log(countriesDataset);



let countriesGraph = createGraph();



async function insertCountriesToGraph(){
    //TODO: global vars suck, use parameter hobo
    countriesDataset.forEach(function(country){
        countriesGraph.addNode(country.cca3,country);
    })

    countriesGraph.forEachNode(function(node){
        console.log(node);
    })


    //createUniqueLink
    //it's defined through options


    //TODO border links here

}
insertCountriesToGraph();





function testDuplicateProperty(arr,propName){
    //this proves we cannot use 'area' as unique identifier
    //cca3 or similar one is better, probably.
    let normalized=arr.map(x=>x[propName]);
    let isDuplicate=normalized.some(function(item,index){
        return normalized.indexOf(item) !== index
    });
    return isDuplicate;
}

