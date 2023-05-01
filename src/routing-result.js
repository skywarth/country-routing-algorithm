
//export {RoutingResult as default};

export default class RoutingResult{
    #foundPath=[];
    #traversedCountries=[];
    #isClosest=false;

    #fromCountryCode='';
    #toCountryCode='';


    get isClosest() {
        return this.#isClosest;
    }

    set isClosest(value) {
        this.#isClosest = value;
    }

    get traversedCountries() {
        return this.#traversedCountries;
    }

    get fromCountryCode() {
        return this.#fromCountryCode;
    }

    get toCountryCode() {
        return this.#toCountryCode;
    }

    getFoundPath() {
        //TODO: foundPath elements should be a class instance!
        return this.#foundPath;
    }

    prependToFoundPath(foundPathEntry){
        //TODO: this is not used sufficiently, use it wherever you can
        this.#foundPath=[foundPathEntry,...this.#foundPath];
    }

    get pathDistance() {
        return this.#foundPath.reduce((n, {distanceBetweenNode}) => n + distanceBetweenNode, 0);
    }

    get pathCountryCount() {
        return this.#foundPath.length;
    }


    constructor(foundPath, traversedCountries, fromCountryCode, toCountryCode) {
        this.#foundPath = foundPath;
        this.#traversedCountries = traversedCountries;
        this.#fromCountryCode = fromCountryCode;
        this.#toCountryCode = toCountryCode;
    }
}