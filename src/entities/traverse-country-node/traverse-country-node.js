
//This class or it's derivatives can be used for traversedCountries, visitableNeighbor, foundPath.
import Utils from "../../utils.js";

export class CountryNode {
    _countryCode;


    _centerCoordinate;

    //Country attributes
    _commonName;
    _officialName;
    _flagUnicode=null;
    _attributes=null;



    constructor(
        countryCode,centerCoordinate ,
        commonName,officialName,
        region, subRegion,
        flagUnicode=null,
        attributes=null) {
        this._countryCode = countryCode;
        this._centerCoordinate = centerCoordinate;//Coordinate instance
        this._commonName=commonName;
        this._officialName=officialName;
        this._flagUnicode=flagUnicode;
        this._attributes=attributes;
        this._region = region;
        this._subRegion = subRegion;
    }

    get countryCode() {
        return this._countryCode;
    }

    get attributes() {
        return this._attributes;
    }


    get commonName() {
        return this._commonName;
    }

    get officialName() {
        return this._officialName;
    }

    get region() {
        return this._region;
    }

    get subRegion() {
        return this._subRegion;
    }

    get flagUnicode() {
        return this._flagUnicode;
    }

    get centerCoordinate() {
        return this._centerCoordinate;
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

    constructor(
        countryCode, centerCoordinate,
        commonName,officialName,
        region,subRegion,
        flagUnicode=null,
        attributes=null,
        distanceToFinalDestination, distanceBetweenNode) {
        super(countryCode,centerCoordinate,commonName,officialName,region,subRegion,flagUnicode,attributes);
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
