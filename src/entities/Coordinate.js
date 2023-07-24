import Utils from "../utils.js";

export default class Coordinate{
    _latitude;
    _longitude;


    get latitude() {
        return this._latitude;
    }

    get longitude() {
        return this._longitude;
    }

    constructor(latitude, longitude) {
        this._latitude = latitude;
        this._longitude = longitude;
    }

    sphericalDistanceKM(targetCoordinate){
       Utils.distanceInKmBetweenEarthCoordinates(this.latitude,this.longitude,targetCoordinate.latitude,targetCoordinate.longitude);
    }
}