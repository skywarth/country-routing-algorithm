console.log(countriesDataset);


//let countriesGraph = createGraph({multigraph:true});




async function insertCountriesToGraph(){
    //TODO: global vars suck, use parameter hobo
    countriesDataset.forEach(function(country){
        countriesGraph.addNode(country.cca3,country);
    })

    countriesGraph.addLink('TUR','GRE',{'aa':'bb'});
    countriesGraph.addLink('TUR','GRE',{'zz':'yy'});

    console.log(countriesGraph.getLink('TUR','GRE'));
    console.log(countriesGraph.getLink('GRE','TUR'));

    debugger

    countriesDataset.forEach(function(country){
        countriesGraph.getLink(country.cca3,xxxxx);
    })


    countriesGraph.forEachNode(function(node){
        console.log(node);
    })



  /*  countriesGraph.addLink('TUR','GRE',{'aa':'bb'});
    countriesGraph.addLink('TUR','GRE',{'zz':'yy'});
*/


    countriesGraph.forEachLinkedNode('TUR',function(linkedNode, link){
        console.log('--');
        console.log("Connected node: ", linkedNode.id, link.data);
        console.dir(link); // link object itself
    })

    //createUniqueLink
    //it's defined through options


    //TODO border links here

}
//insertCountriesToGraph();





function testDuplicateProperty(arr,propName){
    //this proves we cannot use 'area' as unique identifier
    //cca3 or similar one is better, probably.
    let normalized=arr.map(x=>x[propName]);
    let isDuplicate=normalized.some(function(item,index){
        return normalized.indexOf(item) !== index
    });
    return isDuplicate;
}

let a=cytoscape({
    container: document.getElementById("cy"),

    boxSelectionEnabled: false,
    autounselectify: true,



    style: [
        {
            selector: "node",
            style: {
                content: "data(id)",
                "text-opacity": 0.5,
                "text-valign": "center",
                "text-halign": "right",
                "background-color": "#11479e"
            }
        },

        {
            selector: "edge",
            style: {
                "curve-style": "bezier",
                width: 4,
                "target-arrow-shape": "triangle",
                "line-color": "#9dbaea",
                "target-arrow-color": "#9dbaea"
            }
        }
    ],

    elements: {
        nodes: [
            { data: { id: "n0" } },
            { data: { id: "n1" } },
            { data: { id: "n2" } },
            { data: { id: "n3" } },
            { data: { id: "n4" } },
            { data: { id: "n5" } },
            { data: { id: "n6" } },
            { data: { id: "n7" } },
            { data: { id: "n8" } },
            { data: { id: "n9" } },
            { data: { id: "n10" } },
            { data: { id: "n11" } },
            { data: { id: "n12" } },
            { data: { id: "n13" } },
            { data: { id: "n14" } },
            { data: { id: "n15" } },
            { data: { id: "n16" } }
        ],
        edges: [
            { data: { source: "n0", target: "n1" } },
            { data: { source: "n1", target: "n2" } },
            { data: { source: "n1", target: "n3" } },
            { data: { source: "n4", target: "n5" } },
            { data: { source: "n4", target: "n6" } },
            { data: { source: "n6", target: "n7" } },
            { data: { source: "n6", target: "n8" } },
            { data: { source: "n8", target: "n9" } },
            { data: { source: "n8", target: "n10" } },
            { data: { source: "n11", target: "n12" } },
            { data: { source: "n12", target: "n13" } },
            { data: { source: "n13", target: "n14" } },
            { data: { source: "n13", target: "n15" } }
        ]
    }
});
