
const {UndirectedGraph, DirectedGraph} = graphology;


import CountryRoutingAlgorithm,{countriesDataset} from "../src/index.js"


let graphController=new CountryRoutingAlgorithm.GraphController(countriesDataset,new UndirectedGraph());

await graphController.insertCountriesToGraph();





function fillInCountriesToSelect(selectDOM){
    graphController.graphInstance.forEachNode(function (node,attr){
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
    const router=new CountryRoutingAlgorithm.Router(graphController.graphInstance,getOriginCountrySelectedValue(),getDestinationCountrySelectedValue());
    router.debugMode=true;
    const routingResult=router.findRoute();

    console.log(routingResult);
})


//Old tests below
/*let router=new CountryRouting(countriesGraph,'IRN','ITA');
const routingResult=router.findRoute();*/

/*
let router2=new CountryRouting(countriesGraph,'IND','CHE');
const routingResult=router2.findRoute();
*/

/*let router2=new CountryRouting(countriesGraph,'OMN','GBR'); //you silly of course this'll cause exception, but we did it to test the exception right ?
const routingResult=router2.findRoute();*/

//console.log(routingResult);

