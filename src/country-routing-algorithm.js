import {NoOtherBorderException,MaxAllowedMovesAchieved} from "./exceptions.js"
import Utils from "./utils.js"
import RoutingResult from "./routing-result.js"
import {NullifierProxyHandler} from "./nullifier-proxy.js"
import {CountryNode, TraverseCountryNode} from "./traverse-country-node/traverse-country-node.js";


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
        //TODO: this class should take GraphController (also rename it) instance. This way we can generalize it, in order to make graphs library independent.
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
        response.routingResult.prependToFoundPath(new TraverseCountryNode(this.originCountryCode,this.originCountry,response.routingResult.pathDistance,0));


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
            //return {countryCode:neighborKey,attributes:neighborAttributes}
            return new CountryNode(neighborKey,neighborAttributes);
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


        visitableNeighbors=visitableNeighbors.map(function(countryNode){
            let distanceBetweenNode;
            /*try{
                distanceBetweenNode=outerThis.graph.getEdgeAttribute(routingResult.fromCountryCode,countryNode.countryCode,'distance');
                //TODO: for whatever reason above is not working, error was:  NotFoundGraphError: Graph.getEdgeAttribute: could not find an edge for the given path ("IND" - "LKA"). Maybe we should also search the edge with target-source switched?
                //Yep that was it, below catch helps it work but i think it is dirty.
            }catch (ex){
                distanceBetweenNode=outerThis.graph.getEdgeAttribute(countryNode.countryCode,routingResult.fromCountryCode,'distance');
            }*/
            outerThis.graph.findEdge(routingResult.fromCountryCode,countryNode.countryCode,function(edgeKey,edgeAttributes,sourceCountryCode,targetCountryCode){//source-target doesn't matter (on param 1 and 2), because it is undirected
                distanceBetweenNode=edgeAttributes.distance;
            })

            let distanceToFinalDestination=Utils.distanceInKmBetweenEarthCoordinates(
                outerThis.destinationCountry.latlng[0],
                outerThis.destinationCountry.latlng[1],
                countryNode.attributes.latlng[0],
                countryNode.attributes.latlng[1],
            );
            return new TraverseCountryNode(
                countryNode.countryCode,
                countryNode.attributes,
                distanceToFinalDestination,
                distanceBetweenNode
            );
        })



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
                    routingResult.traversedCountries.push(visitableNeighborsByDistance[neighborToVisitCounter]);
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

