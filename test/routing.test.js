import * as CountryRouting from "../src/country-routing-algorithm.js"
import {countriesDataset} from "../data/full.js";
import GraphController from "../src/graph-controller.js";
import Graph from 'graphology';


import assert from 'assert';


describe('Land routing', function () {

    describe('Reaches Destination',function (){
        describe('Should reach destination eventually',function (){
            it('Should eventually reach from Belgium to Qatar', function () {

                const graphController=new GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CountryRouting.CountryRouting(graphController.graphInstance,'BEL','QAT');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath(true).pop().countryCode, 'QAT');
            });

            it('Should eventually reach from Spain to Indonesia', function () {

                const graphController=new GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CountryRouting.CountryRouting(graphController.graphInstance,'ESP','IND');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath(true).pop().countryCode, 'IND');
            });

            it('Should eventually reach from Cambodia to Ghana', function () {

                const graphController=new GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CountryRouting.CountryRouting(graphController.graphInstance,'KHM','GHA');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath(true).pop().countryCode, 'GHA');
            });


            it('Should eventually reach from United States to Uruguay', function () {

                const graphController=new GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CountryRouting.CountryRouting(graphController.graphInstance,'USA','URY');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath(true).pop().countryCode, 'URY');
            });

            it('Should eventually reach from Mexico to French Guiana', function () {

                const graphController=new GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CountryRouting.CountryRouting(graphController.graphInstance,'MEX','GUF');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath(true).pop().countryCode, 'GUF');
            });

            it('Should eventually reach from Paraguay to Canada', function () {

                const graphController=new GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CountryRouting.CountryRouting(graphController.graphInstance,'PRY','CAN');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath(true).pop().countryCode, 'CAN');
            });


        });

    })



    describe('Europe', function () {
        it('Should go through Switzerland when routing from France to Austria', function () {

            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'FRA','AUT');
            const routingResult=router.findRoute();



            assert.equal(routingResult.getFoundPath(true)[1].countryCode, 'CHE');
        });

        it.only('Should go through Norway when routing from Finland to Germany', function () {
            //bruh dataset doesn't acknowledge Sweden having border with Denmark :(
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'FIN','DEU');
            const routingResult=router.findRoute();

            assert.equal(routingResult.getFoundPath(true).some(x=>x.countryCode==='NOR'),true);



        });
    });


    describe("Shouldn't Cycle on the starting country", function () {
        it.only('Should go through Denmark when routing from Finland to Germany', function () {

            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'FIN','DEU');
            const routingResult=router.findRoute();

            console.log({xx:routingResult});
            let startingCountryReached=routingResult.getFoundPath(false).some(x=>x.countryCode==='FIN');

            assert.equal(startingCountryReached,false);


        });
    });
});




