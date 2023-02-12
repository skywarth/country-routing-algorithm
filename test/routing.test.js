import * as CountryRouting from "../src/country-routing-algorithm.js"
import {countriesDataset} from "../data/full.js";
import GraphController from "../src/graph-controller.js";
import Graph from 'graphology';


import assert from 'assert';


describe('Land routing', function () {

    describe('Reaches Destination',function (){
        it('Should reach destination eventually', function () {

            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'BEL','QAT');
            const routingResult=router.findRoute();

            assert.equal(routingResult.foundPath.pop().countryCode, 'QAT');
        });
    })



    describe('Europe', function () {
        it('Should go through Switzerland when routing from France to Austria', function () {

            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'FRA','AUT');
            const routingResult=router.findRoute();



            assert.equal(routingResult.foundPath[0].countryCode, 'CHE');
        });
    });
});




