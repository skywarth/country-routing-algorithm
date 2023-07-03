
//This class or it's derivatives can be used for traversedCountries, visitableNeighbor, foundPath.
import Utils from "../utils.js";

export class CountryNode {
    #countryCode;
    #attributes;



    constructor(countryCode, attributes) {
        this.#countryCode = countryCode;
        this.#attributes = attributes;
    }

    get countryCode() {
        return this.#countryCode;
    }

    get attributes() {
        return this.#attributes;
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

    #distanceToFinalDestination;//TODO: this can be handled here. Consider.

    #distanceBetweenNode;

    constructor(countryCode, attributes, distanceToFinalDestination, distanceBetweenNode) {
        super(countryCode,attributes);
        this.#distanceToFinalDestination = distanceToFinalDestination;
        this.#distanceBetweenNode = distanceBetweenNode;
    }


    get distanceToFinalDestination() {
        return this.#distanceToFinalDestination;
    }

    get distanceBetweenNode() {
        return this.#distanceBetweenNode;
    }


}




class X extends TraverseCountryNode{
    //just an idea
}