

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
        this.someSubRoutine(this.graph,currentCountryCode,this.destinationCountryCode,)
        debugger
        while(!found && moves<this._maxMoveLimiter){
            moves++;




        }
    }


    someSubRoutine(graph,currentCountryCode,finalDestinationCountryCode,previous){

        let nonPreviousNeighbors=graph.neighbors(currentCountryCode).filter(x=>x!==previous);
        debugger

        //calculate each neighbours distance to final destination (no pun intended)
        countriesGraph.forEachEdge('TUR',function(edgeId,edgeAttributes,sourceCode,targetCode,sourceAttr,targetAttr){
            let originalAttribute={...edgeAttributes};
            let distanceToFinalDestination=distanceInKmBetweenEarthCoordinates(
                outerThis.destinationCountry.latlng[0],
                outerThis.destinationCountry.latlng[1],
                sourceAttr.latlng[0],
                sourceAttr.latlng[1],
            )
            edgeAttributes.distanceToFinalDestination=distanceToFinalDestination;//I don't really trust this method to append it but well it worked.
        });
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