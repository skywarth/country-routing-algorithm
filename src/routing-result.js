
//export {RoutingResult as default};

export default class RoutingResult{
    _foundPath=[];
    _traversedCountries=[];
    _isClosest=false;

    _fromCountryCode='';
    _toCountryCode='';
    _pruningCount=0;


    incrementPruningCount(){
        return this._pruningCount++;
    }

    get pruningCount() {
        return this._pruningCount;
    }

    get isClosest() {
        return this._isClosest;
    }

    set isClosest(value) {
        this._isClosest = value;
    }

    get traversedCountries() {
        return this._traversedCountries;
    }

    get fromCountryCode() {
        return this._fromCountryCode;
    }

    get toCountryCode() {
        return this._toCountryCode;
    }

    getFoundPath() {
        //TODO: foundPath elements should be a class instance!
        return this._foundPath;
    }

    isFoundPathEqual(foundPath){
        //TODO: needs unit test
        return this.getFoundPath().every(function (traverseCountryNode,index){
            return traverseCountryNode.isSameCountryNode(foundPath[index]);
        });
    }

    prependToFoundPath(foundPathEntry){
        //TODO: this is not used sufficiently, use it wherever you can
        this._foundPath=[foundPathEntry,...this._foundPath];
    }

    appendToFoundPath(foundPathEntry){
        this._foundPath.push(foundPathEntry);
    }

    get pathDistance() {
        return this._foundPath.reduce((n, {distanceBetweenNode}) => n + distanceBetweenNode, 0);
    }

    get pathCountryCount() {
        return this._foundPath.length;
    }


    constructor(foundPath, traversedCountries, fromCountryCode, toCountryCode, pruningCount=0) {
        this._foundPath = foundPath;
        this._traversedCountries = traversedCountries;
        this._fromCountryCode = fromCountryCode;
        this._toCountryCode = toCountryCode;
        this._pruningCount=pruningCount;
    }


    isRedundancyPresent(graphInstance){
        //TODO: I don't like the fact this takes graphInstance param. We need to address it.

        let isAnySameInstanceFound = this.getFoundPath().some((instance1, index1) => {
            return this.getFoundPath().some((instance2, index2) => {
                if ((index2 <= index1) || Math.abs(index1-index2)===1) return false;

                return (
                    //graphInstance.someEdge(instance1.countryCode,instance2.countryCode,()=>{return true})
                    graphInstance.someEdge(instance1.countryCode,instance2.countryCode,()=>{return true})
                )
            });
        });

        return isAnySameInstanceFound;
    };
}