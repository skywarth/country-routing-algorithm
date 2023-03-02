export const NullifierProxyHandler = {

    //beautiful, thanks for the inspiration: https://stackoverflow.com/a/36111385
    get(target, prop) {
        const orgTargetProp = target[prop];
        if (typeof orgTargetProp === "undefined") {
            return function (...args) {
                //get nullified lmao. Suppressed!
            }
        }else{
            if (typeof orgTargetProp === "function") {
                return function (...args) {
                    return orgTargetProp.apply(target, args);
                }
            }else{
                return orgTargetProp;
            }

        }
    }

};