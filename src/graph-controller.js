

import Utils from "./utils.js"
import {CountryNode} from "./entities/traverse-country-node/traverse-country-node.js";
import Coordinate from "./entities/Coordinate.js";

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
            const countryNode=new CountryNode(
                country.cca3,
                new Coordinate(country.latlng[0],country.latlng[1]),
                country.name.common,
                country.name.official,
                country.region,
                country.subregion,
                country.flag,
                country
                )
            this.graphInstance.addNode(country.cca3, {countryNode:countryNode});

        });

        const graphControllerInstance=this;

        this.countriesDataset.forEach(function(country){
            country.borders.forEach(function(borderCountryCode){
                if(!graphControllerInstance.graphInstance.hasEdge(country.cca3,borderCountryCode)){
                    //add border as an edge if not declared previously (undirected)
                    let borderingCountryNode=graphControllerInstance.graphInstance.getNodeAttributes(borderCountryCode).countryNode;

                    let sphericalDistanceBetween=Utils.distanceInKmBetweenEarthCoordinates(
                        country.latlng[0],
                        country.latlng[1],
                        borderingCountryNode.centerCoordinate.latitude,
                        borderingCountryNode.centerCoordinate.longitude
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


