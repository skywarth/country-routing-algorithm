import {NoOtherBorderException,MaxAllowedMovesAchieved} from "./exceptions.js"
import Utils from "./utils.js"
import RoutingResult from "./routing-result.js"
import {NullifierProxyHandler} from "./nullifier-proxy.js"
import TraversedCountry from "./traversed-country.js";

//maybe export RoutingResult too
//export {Router,Utils}

export {Router}



class Router {

    _maxMoveLimiter=150


    _graph;
    _originCountryCode;
    _destinationCountryCode;

    _destinationCountry;
    _originCountry;

    _debugMode;
    _consoleProxy=null;




    get graph() {
        return this._graph;
    }

    get originCountryCode() {
        return this._originCountryCode;
    }

    get originCountry() {
        if(!this._originCountry){
            this._originCountry=this.graph.getNodeAttributes(this.originCountryCode);
        }

        return this._originCountry;
    }

    get destinationCountryCode() {
        return this._destinationCountryCode;
    }

    get destinationCountry() {
        if(!this._destinationCountry){
            this._destinationCountry=this.graph.getNodeAttributes(this.destinationCountryCode);
        }

        return this._destinationCountry;
    }

    get console(){
        if(this._consoleProxy===null){
            //to prevent creating duplicate instances, single proxy instance should suffice
            this._consoleProxy=new Proxy(
                this.debugMode?console:{},
                NullifierProxyHandler
            )
        }
        return this._consoleProxy;
    }


    get debugMode() {
        return this._debugMode;
    }

    set debugMode(value) {
        this._debugMode = value;
    }

    constructor(graph,originCountryCode,destinationCountryCode,debugMode=false) {
        this._graph=graph;
        this._originCountryCode=originCountryCode;
        this._destinationCountryCode=destinationCountryCode;
        this.debugMode=debugMode;
    }

    _moves=0;

    findRoute(){//obviously this is not the final name
        let finalRoute=[];
        let found=false;
        let moves=0;
        let outerThis=this;


        let currentCountryCode=this.originCountryCode;


        /*
        * we need a method to hold traversed nodes and current node stream
        * since we are doing DFS-like algorithm, it should really hold the current node stream.
        * */

        //so there is basically two schools of thought to this.
        //it can either be solved through recursive function (Applied this)
        //or it can be solved by one-after-another trace method. Trace will hold the current successful traversed.

        let response;
        try{
            response=this.iterate(
                new RoutingResult([],[],this.originCountryCode,this.destinationCountryCode),
                null
            );

        }catch (ex){
            if(ex instanceof MaxAllowedMovesAchieved){
                this.console.log({ex:ex});
                let sorted=ex.lastRoutingResult.traversedCountries.sort((a, b) => a.distanceToFinalDestination - b.distanceToFinalDestination);
                this.console.log({closestIs:sorted[0]});
                this._moves=0;
                //response=this.iterate(this.graph,[],currentCountryCode,sorted[0].countryCode,null);
                response=this.iterate(
                    new RoutingResult(
                        [],[],this.originCountryCode,sorted[0].countryCode
                    )
                    );
                response.routingResult.isClosest=true;
            }else{
                throw ex;
            }
        }

        //adding the originCountry to foundPath
        //a bit of a dirty method of doing it, i gotta admit
        response.routingResult.prependToFoundPath({countryCode:this.originCountryCode,attributes:this.originCountry,distanceToFinalDestination:response.routingResult.pathDistance,distanceBetweenNode:0});


        //response.totalDistance=response.foundPath.reduce((n, {distanceBetweenNode}) => n + distanceBetweenNode, 0);
        return response.routingResult;
    }


    //iterate(graph,traversedCountries=[],currentCountryCode,finalDestinationCountryCode,previous){
    iterate(routingResult, previous){
        const response={
            previous:previous,
            routingResult:routingResult
        }

        this.console.log({previous:previous,currentCountryCode:routingResult.fromCountryCode});

        if(routingResult.fromCountryCode===routingResult.toCountryCode){
            this.console.log('SOLD !!!');
            return response;
        }



        let outerThis=this;//please forgive me father for I have sinned
        this._moves++;
        if(this._moves>250){
            throw new MaxAllowedMovesAchieved('max moves achieved !!',routingResult,previous);
        }


        //let nonPreviousNeighbors=this.graph.neighbors(routingResult.fromCountryCode).filter(x=>x!==previous).map((y)=>({'countryCode':y}));//filtering out previous neighbors (the one we come from)
        let nonPreviousNeighbors=this.graph.mapNeighbors(routingResult.fromCountryCode,(neighborKey,neighborAttributes)=> {
            return {countryCode:neighborKey,attributes:neighborAttributes}
        }).filter(x=>x.countryCode!==previous);


        let visitableNeighbors=nonPreviousNeighbors.filter(x =>
            (
                !routingResult.traversedCountries.find(y=>y.countryCode===x.countryCode) && //filtering out already traversed countries

                //This one was discovered during tests. When routing from Finland to Germany, it was first going through Norway, Sweden, Finland, Russia. It doesn't make sense to revisit the origin country.
                x.countryCode!==this.originCountryCode //filtering out origin country
            )

        );
        //visitableNeighbors=visitableNeighbors.map((y)=>({'countryCode':y}));



        if(visitableNeighbors.length===0 && routingResult.fromCountryCode!==routingResult.toCountryCode){
            throw new NoOtherBorderException('backup, backup !!');
        }


        //calculate each neighbours distance to final destination (no pun intended)
        this.graph.forEachNeighbor(routingResult.fromCountryCode,function(neighborCountryCode,neighborAttribute){

            let visitableNeighbor=visitableNeighbors.find(x=>x.countryCode===neighborCountryCode);
            if(!visitableNeighbors.some(x=>x.countryCode===neighborCountryCode)){
                return;
            }
            /*
            //ok now I remember. This section is to prevent re-calculation of distance to final destination each time we pass through this said none
            if(!neighborAttribute.distanceToFinalDestination){

                let originalAttribute={...neighborAttribute};
                let distanceToFinalDestination=Utils.distanceInKmBetweenEarthCoordinates(
                    outerThis.destinationCountry.latlng[0],
                    outerThis.destinationCountry.latlng[1],
                    neighborAttribute.latlng[0],
                    neighborAttribute.latlng[1],
                )
                neighborAttribute.distanceToFinalDestination=distanceToFinalDestination;//I don't really trust this method to append it but well it worked.
            }

            visitableNeighbor.distanceToFinalDestination=neighborAttribute.distanceToFinalDestination;
            */
            visitableNeighbor.distanceToFinalDestination=Utils.distanceInKmBetweenEarthCoordinates(
                outerThis.destinationCountry.latlng[0],
                outerThis.destinationCountry.latlng[1],
                neighborAttribute.latlng[0],
                neighborAttribute.latlng[1],
            );
            outerThis.graph.findEdge(routingResult.fromCountryCode,neighborCountryCode,function(edgeKey,edgeAttributes,sourceCountryCode,targetCountryCode){//source-target doesn't matter (on param 1 and 2), because it is undirected
                visitableNeighbor.distanceBetweenNode=edgeAttributes.distance;
            })



        });


        let visitableNeighborsByDistance=[...visitableNeighbors].sort((a, b) => a.distanceToFinalDestination - b.distanceToFinalDestination);
        //it will try 0,1,2,3 and so forth

        let neighborToVisitCounter=0;

        this.console.log(visitableNeighborsByDistance);

        if(visitableNeighborsByDistance.some(x=>x.countryCode===routingResult.toCountryCode)){//wait does it even make sense ? I think it is utter BS
            //means final destination country is in our reach, it is our dear neighbor !

            neighborToVisitCounter=visitableNeighborsByDistance.findIndex(x=>x.countryCode===routingResult.toCountryCode);
        }


        let noOtherBorderException;
        do{
            try{
                let haventTraversed=routingResult.traversedCountries.findIndex(x=>x.countryCode===visitableNeighborsByDistance[neighborToVisitCounter].countryCode)===-1;
                if(haventTraversed){
                    //routingResult.traversedCountries.push({countryCode: visitableNeighborsByDistance[neighborToVisitCounter].countryCode,distanceToFinalDestination:visitableNeighborsByDistance[neighborToVisitCounter].distanceToFinalDestination});
                    routingResult.traversedCountries.push(new TraversedCountry(
                        visitableNeighborsByDistance[neighborToVisitCounter].countryCode,
                        visitableNeighborsByDistance[neighborToVisitCounter],
                        visitableNeighborsByDistance[neighborToVisitCounter].distanceToFinalDestination,
                        visitableNeighborsByDistance[neighborToVisitCounter].distanceBetweenNode
                    ));
                }





                let childResponse=this.iterate(
                    new RoutingResult(
                        [],
                        routingResult.traversedCountries,
                        visitableNeighborsByDistance[neighborToVisitCounter].countryCode,
                        routingResult.toCountryCode
                    ),
                    routingResult.fromCountryCode,//for previous

                );
                let recursionRoutingResult=new RoutingResult(
                    [visitableNeighborsByDistance[neighborToVisitCounter],...childResponse.routingResult.getFoundPath()],
                    routingResult.traversedCountries,
                    routingResult.fromCountryCode,
                    routingResult.toCountryCode
                )
                response.routingResult=recursionRoutingResult;

                return response;

            }catch (ex){
                if(ex instanceof NoOtherBorderException){
                    this.console.info('NoOtherBorderException caught');
                    neighborToVisitCounter++;
                    if(visitableNeighborsByDistance[neighborToVisitCounter]===undefined){
                        throw new NoOtherBorderException('backup, backup !!');
                    }
                    noOtherBorderException=true;


                }else if(ex instanceof MaxAllowedMovesAchieved){
                    throw ex;
                }
                else{
                    throw ex;
                }
            }
        }while(noOtherBorderException);



    }
}

