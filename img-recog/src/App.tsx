import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { stringify } from 'querystring';

import * as React from 'react';
import Select from 'react-select';

import './App.css';



const options = [
  { value: 'auckland nz', label: 'Auckland' },
  { value: 'hamilton nz', label: 'Hamilton' },
  { value: 'wellington nz', label: 'Wellington' },
  { value: 'christchurch nz', label: 'ChristChurch' },
  { value: 'queenstown nz', label: 'Queenstown' }
];

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiSelect: {
      // Name of the rule
      root: {
        // Some CSS
        width: '60%',
        marginTop: '20px',

      },
    },
    MuiButton:{
      root:{
        width: '100%',
        marginTop: '10px',
        backgroundColor:'#ffc4fc',
        alignSelf: 'centered'
        
      }
    }
  },
});

export default class App extends React.Component{
  
    public state = {
      results:{
        city:'',
        condition:'',
        temp:'',
        wind:'',
      },
      selectedOption:null,
      data:null,
      showResults:false,
    };

  public handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
  }

  public upload = ()=> {
    const query = stringify(this.state.selectedOption);
    if(!(query==='')){
    fetch('http://api.apixu.com/v1/current.json?key=429bf4f88d29411ba4985844180809&days=7&q='+query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ results:{
          city: data.location.name+" :",
          condition: data.current.condition.text,
          temp: "Temperature : "+data.current.temp_c+ " C",
          wind: "Wind Speed : "+data.current.wind_kph+ " kph",
      }})
     
    });

    
    }else{
      window.alert("Please select the city");
    }
  }
  
  
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="container-fluid" id="body">
          <br/>
          <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}
          id="select"/>
          <Button onClick={this.upload} id="button">Find</Button>
          <br/>

          <br/>
          <h1></h1>
          <br/>
          <table id="simple-board">
               <tbody>
                 <tr>
                   <td>{this.state.results.city}</td>
                   <td>{this.state.results.condition}</td>
                   <td>{this.state.results.temp}</td>
                   <td>{this.state.results.wind}</td>
                 </tr>
               </tbody>
             </table>
        </div>
    </MuiThemeProvider>
     
    );
  }
}
