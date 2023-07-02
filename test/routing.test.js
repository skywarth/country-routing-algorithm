

/*import {Router} from "../src/country-routing-algorithm.js"
import GraphController from "../src/graph-controller.js";*/
import Graph from 'graphology';


import CRA,{countriesDatasetRaw,countriesDataset} from "../src/index.js"

import assert from 'assert';


describe('Standard land routing, no overseas', function () {

    describe('Starts from the origin country', function () {
        it('Should start routing from France when routing from France to Chad', function () {

            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'FRA','TCD');
            const routingResult=router.findRoute();

            assert.equal(routingResult.getFoundPath().shift().countryCode, 'FRA');
        });

    });

    describe('Reaches Destination',function (){
        describe('Should reach destination eventually',function (){
            it('Should eventually reach from Belgium to Qatar', function () {

                const graphController=new CRA.GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CRA.Router(graphController.graphInstance,'BEL','QAT');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath().pop().countryCode, 'QAT');
            });

            it('Should eventually reach from Spain to Indonesia', function () {

                const graphController=new CRA.GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CRA.Router(graphController.graphInstance,'ESP','IND');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath().pop().countryCode, 'IND');
            });

            it('Should eventually reach from Cambodia to Ghana', function () {

                const graphController=new CRA.GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CRA.Router(graphController.graphInstance,'KHM','GHA');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath().pop().countryCode, 'GHA');
            });


            it('Should eventually reach from United States to Uruguay', function () {

                const graphController=new CRA.GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CRA.Router(graphController.graphInstance,'USA','URY');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath().pop().countryCode, 'URY');
            });

            it('Should eventually reach from Mexico to French Guiana', function () {

                const graphController=new CRA.GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CRA.Router(graphController.graphInstance,'MEX','GUF');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath().pop().countryCode, 'GUF');
            });

            it('Should eventually reach from Paraguay to Canada', function () {

                const graphController=new CRA.GraphController(countriesDataset,new Graph());
                graphController.insertCountriesToGraph();
                let router=new CRA.Router(graphController.graphInstance,'PRY','CAN');
                const routingResult=router.findRoute();

                assert.equal(routingResult.getFoundPath().pop().countryCode, 'CAN');
            });


        });

    })



    describe('Europe', function () {
        it('Should go through Switzerland when routing from France to Austria', function () {

            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'FRA','AUT');
            const routingResult=router.findRoute();



            assert.equal(routingResult.getFoundPath()[1].countryCode, 'CHE');
        });

        it('Should go through Norway when routing from Finland to Germany', function () {
            //bruh dataset doesn't acknowledge Sweden having border with Denmark :(
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'FIN','DEU');
            const routingResult=router.findRoute();

            assert.equal(routingResult.getFoundPath().some(x=>x.countryCode==='NOR'),true);



        });

        it('Should go through France when routing from Spain to Lithuania', function () {
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'ESP','LTU');
            const routingResult=router.findRoute();

            assert.equal(routingResult.getFoundPath().some(x=>x.countryCode==='FRA'),true);



        });

        it('Should navigate through only European countries when navigating from Denmark to Croatia', function () {
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'DNK','HRV');
            const routingResult=router.findRoute();

            routingResult.getFoundPath().forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Europe',attr.region,`Navigated through ${attr.name.common} even though it is not in Europe`);
            })

        });
    });

    describe('Africa', function () {
        it('Should navigate through only North African countries when navigating from Morocco to Syria', function () {
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'MAR','EGY');
            const routingResult=router.findRoute();

            routingResult.getFoundPath().forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Northern Africa',attr.subregion,`Navigated through ${attr.name.common} even though it is not in Northern Africa`);
            })

        });
    })

    describe('Asia',function (){
        it('Should navigate through only Asian countries when navigating from Kazakhstan to India', function () {
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'KAZ','IND');
            const routingResult=router.findRoute();

            routingResult.getFoundPath().forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Asia',attr.region,`Navigated through ${attr.name.common} even though it is not in Asia`);
            })

        });

        it('Should navigate through only Asian countries when navigating from Oman to Thailand', function () {
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'OMN','THA');
            const routingResult=router.findRoute();

            routingResult.getFoundPath().forEach((pathCountry)=>{
                let attr=graphController.graphInstance.getNodeAttributes(pathCountry.countryCode);
                assert.equal('Asia',attr.region,`Navigated through ${attr.name.common} even though it is not in Asia`);
            })

        });

        it('Should navigate through China when routing from South Korea to Nepal', function () {
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'KOR','NPL');
            const routingResult=router.findRoute();

            let chinaIsInFoundPath=routingResult.getFoundPath().some(x=>x.countryCode==='CHN');
            assert.ok(chinaIsInFoundPath,'China is not traversed through !');



        });
    })


    describe("Shouldn't Cycle on the starting country", function () {
        it("Shouldn't revisit Finland when routing from Finland to Germany", function () {
            //because dataset dictates Sweden doesn't have border with Denmark. smh...
            const graphController=new CRA.GraphController(countriesDataset,new Graph());
            graphController.insertCountriesToGraph();
            let router=new CRA.Router(graphController.graphInstance,'FIN','DEU');
            const routingResult=router.findRoute();

            let foundPath=routingResult.getFoundPath();
            foundPath.shift();
            let startingCountryReached=foundPath.some(x=>x.countryCode==='FIN');

            assert.equal(startingCountryReached,false);


        });
    });
});

describe('Should find the closest land route destination for oversea destinations',function () {

    describe('Destination: Europe',function () {
        it('Should route to [France, Belgium or Netherlands] when routing from Turkey to United Kingdom', function () {

            let expectedClosestDestinations=['FRA','BEL','NLD'];

            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'TUR', 'GBR');
            const routingResult = router.findRoute();

            assert.ok(routingResult.isClosest,'Result is not closest !');
            let finalDestination=routingResult.getFoundPath().pop();
            assert.ok(
                expectedClosestDestinations.includes(finalDestination.countryCode),
                `Closest point is not among the expected, got ${finalDestination.countryCode}`
            )
        });
        it('Should route to [Denmark, Netherlands or Norway] when routing from Greece to Iceland', function () {

            let expectedClosestDestinations=['DNK','NLD','NOR'];

            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'GRC', 'ISL');
            const routingResult = router.findRoute();

            assert.ok(routingResult.isClosest,'Result is not closest !');
            let finalDestination=routingResult.getFoundPath().pop();
            assert.ok(
                expectedClosestDestinations.includes(finalDestination.countryCode),
                `Closest point is not among the expected, got ${finalDestination.countryCode}`
            )
        });
    });

    describe('Destination: Americas',function () {
        it('Should route to Norway when routing from Kazakhstan to United States of America', function () {



            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'KAZ', 'USA');
            const routingResult = router.findRoute();

            assert.ok(routingResult.isClosest,'Result is not closest !');
            let finalDestination=routingResult.getFoundPath().pop();
            assert.equal(finalDestination.countryCode,'NOR');
        });

        it('Should route to a West African Country when routing from Oman to Guatemala', function () {



            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'OMN', 'GTM');
            const routingResult = router.findRoute();

            assert.ok(routingResult.isClosest,'Result is not closest !');
            let finalDestination=routingResult.getFoundPath().pop();
            let finalDestinationAttr=graphController.graphInstance.getNodeAttributes(finalDestination.countryCode);
            assert.equal('Western Africa',finalDestinationAttr.subregion,
                `Routed to the closest in a non-western Africa country! 
                Final destination region: ${finalDestinationAttr.subregion}, Final destination Country: ${finalDestination.countryCode}`
            );

        });

        it('Should route to a West African Country when routing from Somalia to Uruguay', function () {



            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'SOM', 'URY');
            const routingResult = router.findRoute();

            assert.ok(routingResult.isClosest,'Result is not closest !');
            let finalDestination=routingResult.getFoundPath().pop();
            let finalDestinationAttr=graphController.graphInstance.getNodeAttributes(finalDestination.countryCode);
            assert.equal('Western Africa',finalDestinationAttr.subregion,
                `Routed to the closest in a non-western Africa country! 
                Final destination region: ${finalDestinationAttr.subregion}, Final destination Country: ${finalDestination.countryCode}`
            );

        });
    });

    describe('Destination: Africa',function () {
        it('Should route to Mozambique when routing from Sweden to Madagascar', function () {



            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'SWE', 'MDG');
            const routingResult = router.findRoute();

            assert.ok(routingResult.isClosest,'Result is not closest !');
            let finalDestination=routingResult.getFoundPath().pop();
            assert.equal(finalDestination.countryCode,'MOZ');
        });
    })





});


describe('Estimated Total Distance',function () {

    describe('Europe',function (){
        it('Switzerland->Liechtenstein found path distance smaller than 250km', function () {
            let designatedMaxDistanceKM=250;
            const graphController = new CRA.GraphController(countriesDataset, new Graph());
            graphController.insertCountriesToGraph();
            let router = new CRA.Router(graphController.graphInstance, 'CHE', 'LIE');
            const routingResult = router.findRoute();


            assert.ok(routingResult.pathDistance<designatedMaxDistanceKM,
                `Distance is bigger than designated max distance, got ${routingResult.pathDistance} while expecting <=${designatedMaxDistanceKM}`
                );
        });
    });

});