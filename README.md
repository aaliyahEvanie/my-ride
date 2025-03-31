# MyRide


## Development server

Run `ng serve` for a dev server. 
Navigate to `http://localhost:4200/`

## Assignment Details
#madesimple and #makeithappen.
Use the open API: https://bikeindex.org/documentation/api_v3

### Acceptance Criteria
- Bike Search and Bike Details view
- Search by a given city name GET /v3/search
- Navigate to detail view to see more information GET /v3/bikes/{id}
- Display information 

### Tech stack 
Angular 18 
Typescript 
Primeng component library 
Google places API ~ for accurate city search results 

### Implemented Features
1.  Search by city name with stolenness=proximity and distance=0. Limiting results to city only
2. Error handling message service to display when a call fails
3. Display the a lit of results from the search
    - Title 
    - Thumb image 
    - Description
    - View More Button
4. Detail view
    - images
    - basic information 
    - if stolen a brief detail and description of it


### Areas for improvements
1. Allow user to search with the additional parameters
2. Remove the messages
3. Show a default list based on your IP
4. When navigating back to the home page have the previous search results persisted and when the user starts typing for a new search clear out the previous results 
5. Add a skeleton loader 
6. Improve the styling to use the design token system from primeng
7. Environment build out service for google maps api
8. Persist data  ~ signal state management
9. Responsive design 
10. Clean up state management
11. Pagination?
12. Testing on components and logic level

