

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
    constructor(message,traversedCountries) {
        super(message);
        this.name = 'MaxAllowedMovesAchieved';
        this._traversedCountries=traversedCountries;
    }

    _traversedCountries;

    get traversedCountries(){
        return this._traversedCountries;
    }
}

export {NoOtherBorderException, MaxAllowedMovesAchieved}