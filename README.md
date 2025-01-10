# Olympic Games Starter

Olympic Games Starter is an application that displays data of the previous Olympic Games.

## How to install

Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How it works

### Component

There is only one component une on all pages, it's the `HeaderComponent`.

### Pages

There is the home page, named as `DashboardComponent`. This page shows a pie chart of the total number of medals per country.  
There is also the details page, named as `DetailsComponent`. This page shows multiple data for the country selected, such as a line chart of the number of medals won per year.  
The data received from the service is formated in each page to config the charts, then it's sent to the views.

### Data

All the data is located in the file `olympic.json`.

### Models

The data is represented by the models `Olympic` and `Participation`.

### Service

There is only one service used to retrieve the data from the json file with an HTTP request.  
Then the data is sent to the components.

### Dependencies

`chart.js` is for creating the charts  
`tailwind` and `daisyui` are for the styling

## Additional information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.