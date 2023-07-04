

class AbstractCountryRoutingAlgorithmException extends Error {
    constructor(message) {
        super(message);
        //this.exceptionType='CountryRoutingException';
        this.name = 'AbstractCountryRoutingAlgorithmException - DO NOT USE IT';
    }
}


class AbstractRoutingException extends AbstractCountryRoutingAlgorithmException{

    #lastRoutingResult;
    #previous;

    constructor(message,lastRoutingResult,previous) {
        super(message);
        this.#lastRoutingResult=lastRoutingResult;
        this.#previous=previous;
        this.name = 'AbstractRoutingException - DO NOT USE IT';
    }

    get lastRoutingResult(){
        return this.#lastRoutingResult;
    }

    get previous(){
        return this.#previous;
    }

}


class NoOtherBorderException extends AbstractRoutingException {

    constructor(message,lastRoutingResult,previous) {
        super(message,lastRoutingResult,previous);
        this.name = 'MaxAllowedMovesAchieved';
    }


}

class MaxAllowedMovesAchieved extends AbstractRoutingException {
    constructor(message,lastRoutingResult,previous) {
        super(message,lastRoutingResult,previous);
        this.name = 'MaxAllowedMovesAchieved';
    }

}


class RedundantPathDetected extends AbstractRoutingException {
    constructor(message,lastRoutingResult,previous,countryNode) {
        super(message,lastRoutingResult,previous);
        this.name = 'RedundantPathDetected';
        this.#redundancyBeginningNode=countryNode;
    }


    #redundancyBeginningNode;//maybe goldenNeighbor;

    get redundancyBeginningNode() {
        return this.#redundancyBeginningNode;
    }
}

export {NoOtherBorderException, MaxAllowedMovesAchieved,RedundantPathDetected}