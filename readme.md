# Country Routing Algorithm 

>AKA: *POOR MAN's ROUTING Algorithm*. Because you can't really afford APIs

NPM package: https://www.npmjs.com/package/country-routing-algorithm


Not much of a README right now, just fiddle with `page-scripts.js` and see the result on your console.

## TODO List
- [ ] Prevented/pruned redundancies count on `routingResult`
- [X] ~~Issues #8 and #9~~
- [X] ~~calculate the total distance to be traversed:~~
  - [X] ~~Yeah we return the path/route but the distance ? It's the whole point of this~~
- [X] ~~Handle max moves exceeded~~
  - [X] ~~It should pick among traversed countries which is the closest to the final destination. Then return a routing to that closest country~~
  - Btw there is possibly something wrong with the traversed countries array. When i was experimenting with something else, i noticed both duplicate and different distance values. **Not sure if this issue still persists.**
- [ ] visualize
  - the graph
  - [X] ~~[world map](https://skywarth.github.io/country-routing-algorithm-demo-vue/)~~
- Tests
  - [X] ~~Initial, basic tests~~
  - [ ] Advanced tests about total distance
  - [X] ~~Standard pruning~~
  - [X] ~~Pruning involving origin country (Like Finland->Germany test case)~~
  - [ ] FoundPath order (reversed) and countries should be identical when origin and destination countries switch (Issue #11). Prepare unit tests for this.
- [X] ~~Class and instance based solution for RoutingResult#foundPath entries~~
- [X] ~~Class and instance based solution for RoutingResult#traversedCountries~~
- [X] ~~Afghanistan to Antarctica edge case. Algorithm should prune down the path if it cycles back to one of the origin country's neighbors.~~ **[Pruning]**
- [X] ~~Afghanistan->Åland Islands. It should prune down the visit to China since it cycles back to Russia eventually. **[Pruning]**~~
- [ ] Coordinate Class
- [ ] Attribute expansion for CountryNode, abstraction for attributes
  - [ ] Coordinate attribute and accessor for CountryNode
- [ ] Rollback count for RoutingResult (I guess I was talking about the NoOtherBorderException ?)
- [ ] Abstraction for GraphController (to-be-renamed), in order to achieve independence of graph library.
- [ ] Deviance rate calculation through google maps api

## Resources:

### Data
- Countries db, including lat-long of center
- Pivot table for bordering countries

### Supplementary and library
- https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript
- https://github.com/felipernb/algorithms.js
- https://github.com/avoidwork/tiny-graph
- ~~Includes visualization: https://github.com/strathausen/dracula~~
- this is such an overkill: cytoscape.js
- ~~https://github.com/avoidwork/tiny-graph simple yet promising~~
- https://github.com/anvaka/ngraph.graph. Problem with undirected edges smh
- Graphology.js Let's stick to this for now, functions are a bit awful but...
- cytoscape didn't like it much

## Method:
- Undirected graph will be applied
  - Countries gonna be represented by nodes
  - Edges will represent distance between center lat-long of the countries at each end
- Distance calculation between countries will be made using country's center lat-long point and applying euclidean distance formula. 
- This algorithm will be used to find possible path(s) to destination country:

  - While current country and destination country does not share borders: 
    1. Among bordering countries of the current country: get the one with the smaller distance to the destination country. (Named C1)
    2. Move to that country, C1
    3. If no bordering country is present (excluding the visited ones), or no country is closer to the destination country: start reverting. Trace back steps and try different paths.


- Technical note: it returns isClosest:true if the target cannot be reached through land (e.g: Malta)

### Notes
- Distinction between `graphology` dependencies
  - Unit tests use node version of `graphology`, so you need to `npm install` to run unit tests
  - Meanwhile the `demo/index.html` and `page-script.js` use classic javascript file version of `graphology`. 

## Credits
### Resources and libraries
