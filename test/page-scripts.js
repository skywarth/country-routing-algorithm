console.log(countriesDataset);


//let countriesGraph = createGraph({multigraph:true});

const {UndirectedGraph, DirectedGraph} = graphology;
let countriesGraph=new UndirectedGraph();
/*
countriesGraph.addNode('whaddup',{'yoo':'111'});
countriesGraph.addNode('whaddup2',{'yoo':'222'});


countriesGraph.addEdge('whaddup','whaddup2',{
    'heres':'johnny'
})

console.log(countriesGraph.hasEdge('whaddup2','whaddup'));
console.log(countriesGraph.hasEdge('whaddup','whaddup2'));


countriesGraph.addEdge('whaddup','whaddup2',{
    'heres':'johnny'
})
*/


async function insertCountriesToGraph(){
    //TODO: global vars suck, use parameter hobo
    countriesDataset.forEach(function(country){
        countriesGraph.addNode(country.cca3,country);
    });

    countriesDataset.forEach(function(country){
        country.borders.forEach(function(borderCountryCode){
            if(!countriesGraph.hasEdge(country.cca3,borderCountryCode)){
                //add border as an edge if not declared previously (undirected)
                let borderingCountryNode=countriesGraph.getNodeAttributes(borderCountryCode);
                let sphericalDistanceBetween=distanceInKmBetweenEarthCoordinates(
                    country.latlng[0],
                    country.latlng[1],
                    borderingCountryNode.latlng[0],
                    borderingCountryNode.latlng[1]
                    );
                countriesGraph.addEdge(country.cca3,borderCountryCode,{
                    'distance':sphericalDistanceBetween
                })
            }
        })
    })

}


insertCountriesToGraph();
/*let router=new CountryRouting(countriesGraph,'IRN','ITA');
router.findRoute();*/

let router2=new CountryRouting(countriesGraph,'OMN','GBR'); //you silly of course this'll cause exception, but we did it to test the exception right ?
router2.findRoute()
/*



function testDuplicateProperty(arr,propName){
    //this proves we cannot use 'area' as unique identifier
    //cca3 or similar one is better, probably.
    let normalized=arr.map(x=>x[propName]);
    let isDuplicate=normalized.some(function(item,index){
        return normalized.indexOf(item) !== index
    });
    return isDuplicate;
}
*/
