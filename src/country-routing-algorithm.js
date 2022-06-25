

class CountryRouting{

    _maxMoveLimiter=150


    _graph;
    _originCountryCode;
    _destinationCountryCode;

    _destinationCountry;




    get graph() {
        return this._graph;
    }

    get originCountryCode() {
        return this._originCountryCode;
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
        while(!found && moves<this._maxMoveLimiter){
            moves++;
            //get neighbours
            //calculate each neighbours distance to final destination (no pun intended)
            countriesGraph.forEachEdge('TUR',function(edgeId,edgeAttributes,source,target){
                let originalAttribute={...edgeAttributes};
                let a=outerThis.destinationCountry;
                let distanceToFinalDestination=distanceInKmBetweenEarthCoordinates()
                debugger
            });
        }

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