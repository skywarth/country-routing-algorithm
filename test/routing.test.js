import * as CountryRouting from "../src/country-routing-algorithm.js"
import {countriesDataset} from "../data/full.js";
import GraphController from "../src/graph-controller.js";
import Graph from 'graphology';


import assert from 'assert';


describe('Standard land routing, no overseas', function () {

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

        it('Should go through Norway when routing from Finland to Germany', function () {
            //bruh dataset doesn't acknowledge Sweden having border with Denmark :(
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'FIN','DEU');
            const routingResult=router.findRoute();

            assert.equal(routingResult.getFoundPath(true).some(x=>x.countryCode==='NOR'),true);



        });

        it('Should go through France when routing from Spain to Lithuania', function () {
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'ESP','LTU');
            const routingResult=router.findRoute();

            assert.equal(routingResult.getFoundPath(true).some(x=>x.countryCode==='FRA'),true);



        });

        it('Should navigate through only European countries when navigating from Denmark to Croatia', function () {
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'DNK','HRV');
            const routingResult=router.findRoute();

            routingResult.getFoundPath(true).forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Europe',attr.region,`Navigated through ${attr.name.common} even though it is not in Europe`);
            })

        });
    });

    describe('Africa', function () {
        it('Should navigate through only North African countries when navigating from Morocco to Syria', function () {
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'MAR','EGY');
            const routingResult=router.findRoute();

            routingResult.getFoundPath(true).forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Northern Africa',attr.subregion,`Navigated through ${attr.name.common} even though it is not in Northern Africa`);
            })

        });
    })

    describe('Asia',function (){
        it('Should navigate through only Asian countries when navigating from Kazakhstan to India', function () {
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'KAZ','IND');
            const routingResult=router.findRoute();

            routingResult.getFoundPath(true).forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Asia',attr.region,`Navigated through ${attr.name.common} even though it is not in Asia`);
            })

        });

        it('Should navigate through only Asian countries when navigating from Oman to Thailand', function () {
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'OMN','THA');
            const routingResult=router.findRoute();

            routingResult.getFoundPath(true).forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Asia',attr.region,`Navigated through ${attr.name.common} even though it is not in Asia`);
            })

        });

        it('Should navigate through China when routing from South Korea to Nepal', function () {
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'KOR','NPL');
            const routingResult=router.findRoute();

            let chinaIsInFoundPath=routingResult.getFoundPath().some(x=>x.countryCode==='CHN');
            assert.ok(chinaIsInFoundPath,'China is not traversed through !');



        });
    })


    describe("Shouldn't Cycle on the starting country", function () {
        it("Shouldn't revisit Finland when routing from Finland to Germany", function () {
            //because dataset dictates Sweden doesn't have border with Denmark. smh...
            const graphController=new GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CountryRouting.CountryRouting(graphController.graphInstance,'FIN','DEU');
            const routingResult=router.findRoute();

            let startingCountryReached=routingResult.getFoundPath(false).some(x=>x.countryCode==='FIN');

            assert.equal(startingCountryReached,false);


        });
    });
});




