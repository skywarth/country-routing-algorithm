
//This class or it's derivatives can be used for traversedCountries, visitableNeighbor, foundPath.
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
        return this.countryCode===targetCountryNode;
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