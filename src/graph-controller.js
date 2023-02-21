

import Utils from "./utils.js"

export default class GraphController{

    #countriesDataset;
    #graphInstance;

    get countriesDataset() {
        return this.#countriesDataset;
    }


    get graphInstance() {
        return this.#graphInstance;
    }

    constructor(countriesDataset,graphInstance) {
        this.#countriesDataset=countriesDataset;
        this.#graphInstance=graphInstance;

        return this;
    }

    async insertCountriesToGraph(){
        this.graphInstance.clear();
        this.countriesDataset.forEach((country)=>{
            this.graphInstance.addNode(country.cca3,country);
        });

        const graphControllerInstance=this;

        this.countriesDataset.forEach(function(country){
            country.borders.forEach(function(borderCountryCode){
                if(!graphControllerInstance.graphInstance.hasEdge(country.cca3,borderCountryCode)){
                    //add border as an edge if not declared previously (undirected)
                    let borderingCountryNode=graphControllerInstance.graphInstance.getNodeAttributes(borderCountryCode);
                    let sphericalDistanceBetween=Utils.distanceInKmBetweenEarthCoordinates(
                        country.latlng[0],
                        country.latlng[1],
                        borderingCountryNode.latlng[0],
                        borderingCountryNode.latlng[1]
                    );
                    graphControllerInstance.graphInstance.addEdge(country.cca3,borderCountryCode,{
                        'distance':sphericalDistanceBetween
                    })
                }
            })
        })

        return this.graphInstance;

    }
}


