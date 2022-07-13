

class CountryRouting{

    _maxMoveLimiter=150


    _graph;
    _originCountryCode;
    _destinationCountryCode;

    _destinationCountry;
    _originCountry;




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


    constructor(graph,originCountryCode,destinationCountryCode) {
        this._graph=graph;
        this._originCountryCode=originCountryCode;
        this._destinationCountryCode=destinationCountryCode;
    }

    _moves=0;

    findRoute(){//obviously this is not the final name
        let finalRoute=[];
        let found=false;
        let moves=0;
        let outerThis=this;

        let traversedCountries=[];//country codes

        let currentCountryCode=this.originCountryCode;


        /*
        * we need a method to hold traversed nodes and current node stream
        * since we are doing DFS-like algorithm, it should really hold the current node stream.
        * */

        //so there is basically two schools of thought to this.
        //it can either be solved through recursive function (Applied this)
        //or it can be solved by one-after-another trace method. Trace will hold the current successful traversed.


        let path=this.someSubRoutine(this.graph,[],currentCountryCode,this.destinationCountryCode,null);
        console.info({path:path});

    }


    someSubRoutine(graph,traversedCountries=[],currentCountryCode,finalDestinationCountryCode,previous){
        console.log({previous:previous,currentCountryCode:currentCountryCode});

        if(currentCountryCode===finalDestinationCountryCode){
            console.log('SOLD !!!');
            return [previous];
        }



        let outerThis=this;//please forgive me father for I have sinned
        this._moves++;
        if(this._moves>250){
            alert('aa');
            throw 'Max moves achieved';
        }


        let nonPreviousNeighbors=graph.neighbors(currentCountryCode).filter(x=>x!==previous);//filtering out previous neighbors (the one we come from)
        let visitableNeighbors=nonPreviousNeighbors.filter(x => !traversedCountries.includes(x.countryCode));//filtering out already traversed countries
        console.log({visitableNeighbors:visitableNeighbors});
        visitableNeighbors=visitableNeighbors.map((y)=>({'countryCode':y}));



        if(visitableNeighbors.length===0 && currentCountryCode!==finalDestinationCountryCode){
            throw new NoOtherBorderException('backup, backup !!');
        }

        //calculate each neighbours distance to final destination (no pun intended)
        countriesGraph.forEachNeighbor(currentCountryCode,function(neighborCountryCode,neighborAttribute){

            if(!visitableNeighbors.some(x=>x.countryCode===neighborCountryCode)){
                //debugger
                return;
            }
            if(!neighborAttribute.distanceToFinalDestination){
                let originalAttribute={...neighborAttribute};
                let distanceToFinalDestination=distanceInKmBetweenEarthCoordinates(
                    outerThis.destinationCountry.latlng[0],
                    outerThis.destinationCountry.latlng[1],
                    neighborAttribute.latlng[0],
                    neighborAttribute.latlng[1],
                )
                neighborAttribute.distanceToFinalDestination=distanceToFinalDestination;//I don't really trust this method to append it but well it worked.
            }
            visitableNeighbors.find(x=>x.countryCode===neighborCountryCode).distanceToFinalDestination=neighborAttribute.distanceToFinalDestination;

        });



        let visitableNeighborsByDistance=[...visitableNeighbors].sort((a, b) => a.distanceToFinalDestination - b.distanceToFinalDestination);
        //it will try 0,1,2,3 and so forth
        let neighborToVisitCounter=0;

        traversedCountries.push({countryCode: currentCountryCode});


        try{

            let previousArray=this.someSubRoutine(
                graph,
                traversedCountries,
                visitableNeighborsByDistance[neighborToVisitCounter].countryCode,//next neighbor to visit
                finalDestinationCountryCode,
                currentCountryCode,//for previous

            );
            return [...previousArray,previous];

        }catch (ex){
            if(ex instanceof NoOtherBorderException){
            console.error('NoOtherBorderException caught');



            }else{
                throw ex;
            }
        }
    }
}



class NoOtherBorderException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoOtherBorderException';
    }
}












/* UTILS */
function degreesToRadians(degrees) {
    //thanks SO
    return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    //thanks SO
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}
/* UTILS */