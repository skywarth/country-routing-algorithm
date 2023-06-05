
//This class or it's derivatives can be used for traversedCountries, visitableNeighbor, foundPath.
//So a name change is in order
export default class TraversedCountry{
    #countryCode;
    #attributes;
    #distanceToFinalDestination;//TODO: this can be handled here. Consider.

    #distanceBetweenNode;


    constructor(countryCode, attributes, distanceToFinalDestination, distanceBetweenNode) {
        this.#countryCode = countryCode;
        this.#attributes = attributes;
        this.#distanceToFinalDestination = distanceToFinalDestination;
        this.#distanceBetweenNode = distanceBetweenNode;
    }

    get countryCode() {
        return this.#countryCode;
    }

    get attributes() {
        return this.#attributes;
    }

    get distanceToFinalDestination() {
        return this.#distanceToFinalDestination;
    }

    get distanceBetweenNode() {
        return this.#distanceBetweenNode;
    }
}


class X extends TraversedCountry{
    //just an idea
}