
//This class or it's derivatives can be used for traversedCountries, visitableNeighbor, foundPath.
import Utils from "../utils.js";

export class CountryNode {
    _countryCode;
    _attributes;



    constructor(countryCode, attributes) {
        this._countryCode = countryCode;
        this._attributes = attributes;
    }

    get countryCode() {
        return this._countryCode;
    }

    get attributes() {
        return this._attributes;
    }

    isSameCountryNode(targetCountryNode){
        //currently we'll compare country nodes based merely on country code. We might alter this behaviour in the future as needed.
        return this.isSameCountryCode(targetCountryNode.countryCode);
    }

    isSameCountryCode(targetCountryCode){
        return this.countryCode===targetCountryCode;
    }


    distanceBetween(countryNode){//TODO: bug, why can't i rename this to distanceBetweenNode ??
        return Utils.distanceInKmBetweenEarthCoordinates(
            this.attributes.latlng[0],
            this.attributes.latlng[1],
            countryNode.attributes.latlng[0],
            countryNode.attributes.latlng[1],
        );
    }


}

export class TraverseCountryNode extends CountryNode {

    _distanceToFinalDestination;//TODO: this can be handled here. Consider.

    _distanceBetweenNode;

    constructor(countryCode, attributes, distanceToFinalDestination, distanceBetweenNode) {
        super(countryCode,attributes);
        this._distanceToFinalDestination = distanceToFinalDestination;
        this._distanceBetweenNode = distanceBetweenNode;
    }


    get distanceToFinalDestination() {
        return this._distanceToFinalDestination;
    }

    get distanceBetweenNode() {
        return this._distanceBetweenNode;
    }


}




class X extends TraverseCountryNode{
    //just an idea
}