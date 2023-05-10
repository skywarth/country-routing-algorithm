# Country Routing Algorithm 

>AKA: *POOR MAN's ROUTING Algorithm*. Because you can't really afford APIs

NPM package: https://www.npmjs.com/package/country-routing-algorithm


Not much of a README right now, just fiddle with `page-scripts.js` and see the result on your console.

## TODO List
- [ ] Afghanistan to Antarctica edge case. Algorithm should prune down the path if it cycles back to one of the origin country's neighbors
- [X] ~~calculate the total distance to be traversed:~~
  - [X] ~~Yeah we return the path/route but the distance ? It's the whole point of this~~
- [X] ~~Handle max moves exceeded~~
  - [X] ~~It should pick among traversed countries which is the closest to the final destination. Then return a routing to that closest country~~
  - Btw there is possibly something wrong with the traversed countries array. When i was experimenting with something else, i noticed both duplicate and different distance values. **Not sure if this issue still persists.**
- visualize
  - the graph
  - world map
- Tests
  - [X] ~~Initial, basic tests~~
  - Advanced tests about total distance
- [ ] Class and instance based solution for RoutingResult#foundPath entries



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
