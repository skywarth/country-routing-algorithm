console.log(countriesDataset);



const {UndirectedGraph, DirectedGraph} = graphology;
import * as CountryRouting from "../src/country-routing-algorithm.js"
let countriesGraph=new UndirectedGraph();


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
                let sphericalDistanceBetween=CountryRouting.Utils.distanceInKmBetweenEarthCoordinates(
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
const routingResult=router.findRoute();*/

/*
let router2=new CountryRouting(countriesGraph,'IND','CHE');
const routingResult=router2.findRoute();
*/

/*let router2=new CountryRouting(countriesGraph,'OMN','GBR'); //you silly of course this'll cause exception, but we did it to test the exception right ?
const routingResult=router2.findRoute();*/

//console.log(routingResult);




function fillInCountriesToSelect(selectDOM){
    //TODO: fix the global var, hobo...
    countriesGraph.forEachNode(function (node,attr,qwe){
        let domNode=document.createElement('option');
        let text=`${attr.name.common} (${attr.cca3}) ${attr.flag}`;
        domNode.innerText=text;
        domNode.value=attr.cca3;
        selectDOM.appendChild(domNode)

    })
}

const originCountrySelectDOM=document.querySelector('#originCountrySelect');
const destinationCountrySelectDOM=document.querySelector('#destinationCountrySelect');
const findRouteButton=document.querySelector('#findRouteButton');

fillInCountriesToSelect(originCountrySelectDOM)
fillInCountriesToSelect(destinationCountrySelectDOM)

function getOriginCountrySelectedValue(){
    //TODO: make into getter (encapsulation)
    return originCountrySelectDOM.value;
}

function getDestinationCountrySelectedValue(){
    //TODO: make into getter (encapsulation)
    return destinationCountrySelectDOM.value;
}

findRouteButton.addEventListener('click',function(e){
    //TODO: fix the global var below, hobo...
    const router=new CountryRouting.CountryRouting(countriesGraph,getOriginCountrySelectedValue(),getDestinationCountrySelectedValue());

    const routingResult=router.findRoute();

    console.log(routingResult);
})