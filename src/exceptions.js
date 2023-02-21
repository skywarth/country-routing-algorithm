

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

export {NoOtherBorderException, MaxAllowedMovesAchieved}