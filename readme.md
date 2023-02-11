# Country Routing Algorithm 

>AKA: *POOR MAN's ROUTING Algorithm*. Because you can't really afford APIs

Not much of a README right now, just fiddle with `page-scripts.js` and see the result on your console.

## TODO List
- calculate the total distance to be traversed:
  - Yeah we return the path/route but the distance ? It's the whole point of this
- Handle max moves exceeded
  - It should pick among traversed countries which is the closest to the final destination. 
  - Then return a routing to that closest country
  - Btw there is possibly something wrong with the traversed countries array. When i was experimenting with something else, i noticed both duplicate and different distance values.
- visualize
  - the graph
  - world map



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

## Credits
### Resources and libraries
