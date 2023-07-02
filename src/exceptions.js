

class AbstractCountryRoutingException extends Error {
    constructor(message) {
        super(message);
        this.exceptionType='CountryRoutingException';
        this.name = 'AbstractCountryRoutingException - DO NOT USE IT';
    }
}


class NoOtherBorderException extends AbstractCountryRoutingException {
    constructor(message) {
        super(message);
        this.name = 'NoOtherBorderException';
    }
}

class MaxAllowedMovesAchieved extends AbstractCountryRoutingException {
    constructor(message,lastRoutingResult,previous) {
        super(message);
        this.name = 'MaxAllowedMovesAchieved';
        this.#lastRoutingResult=lastRoutingResult;
        this.#previous=previous;
    }

    #lastRoutingResult;
    #previous;

    get lastRoutingResult(){
        return this.#lastRoutingResult;
    }

    get previous(){
        return this.#previous;
    }
}


class RedundantPathDetected extends AbstractCountryRoutingException {
    constructor(message,lastRoutingResult,previous,countryNode) {
        super(message);
        this.name = 'RedundantPathDetected';
        this.#lastRoutingResult=lastRoutingResult;
        this.#previous=previous;
        this.#redundancyBeginningNode=countryNode;
    }


    //TODO move these props to an extend class, it is duplicate !
    #lastRoutingResult;
    #previous;


    #redundancyBeginningNode;//maybe goldenNeighbor;

    get lastRoutingResult(){
        return this.#lastRoutingResult;
    }

    get previous(){
        return this.#previous;
    }


    get redundancyBeginningNode() {
        return this.#redundancyBeginningNode;
    }
}

export {NoOtherBorderException, MaxAllowedMovesAchieved,RedundantPathDetected}