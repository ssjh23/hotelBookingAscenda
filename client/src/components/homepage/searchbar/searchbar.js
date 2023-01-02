import './searchbar.css'
import React from 'react'
import data from '../destinations.json'
import { useEffect, useState} from 'react'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized"

export function Searchbar(props){
   // Set useStates (Countries: List of countries from json, text: Text shown in textbox, suggestions: List rendered from autocomplete, active: When to show the suggestions bar)
   const [countries, setCountries] = useState([]);
   const [text, setText] = useState('');
   const [suggestions, setSuggestions] = useState([]);
   const [isActive, setIsActive] = useState(false);
 
   const cache = React.useRef(
     
     new CellMeasurerCache({
       defaultHeight: 100,
       fixedWidth: true
   }))  
 
   useEffect(() => {
     //Load Countries from destination.json into countries array.
     const loadCountries = () =>{
       let countries = []
       data.forEach((country) => {
         countries.push(country.term)
       })
       setCountries(countries);
     }
     loadCountries();
   }, [])

  //Removes List on click
  useEffect(() =>{
    const closeDropdown = e =>{
      if(e.path[0].className!== "suggestion col-md-12 justify-content-md-center" && e.path[0].tagName!== 'INPUT'){
        setSuggestions([]);
        setIsActive(false);
      }
      
    };
    document.addEventListener('click', closeDropdown);

    return() => document.removeEventListener('click', closeDropdown);
  })

  //Set Event Handler for clicking suggestion and filling in the box
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
    setIsActive(false);
    props.submitSearchBar(text);
  }
  //Set Event Handler when User types input
  const onChangeHandler = (text) => {
    let checkString = text.toLowerCase();
    let matches = []
    if (checkString.length > 1){
        matches = countries.filter(country => {
          if (country !== undefined){
            if (country.toLowerCase().includes(checkString)){
              return country
            }
          }
          
        })
        setSuggestions(matches);
        setIsActive(true);
    }
    else{
      setIsActive(false);
    }
    setText(text);
    props.submitSearchBar(text)

  }

 
   //JSX Render
   return (
     //Text box
     <div className='flexbox-searchbar'>
       <h4 className='searchbar-header'>Destination</h4>
       <input type="text" className="input-searchbar" id='searchbar' style={{marginTop: 10}} 
         onChange={e => onChangeHandler(e.target.value)}
         value={text}
       />
     {isActive && <div className='dropdown' style = {{width: "105%", height: "30vh "}}>
         <AutoSizer>
         {({width, height}) => (
             <List
             //List handler with Lazy loading to handle suggestions
             width={width}
             height={height}
             rowHeight={cache.current.rowHeight}
             deferredMeasurementCache={cache.current}
             rowCount={suggestions.length}
             rowRenderer={({ key, index, style, parent}) => {
               const country = suggestions[index]
               return (
                 <CellMeasurer 
                 key={key} 
                 cache={cache.current} 
                 parent={parent}
                 columnIndex={0} 
                 rowIndex={index}
                 >
                   <div style={style}
                     className="suggestion" id={country}
                     onClick={()=>onSuggestHandler(country)}
                     >{country}
                   </div>
                 </CellMeasurer>
               )
             }}
           />
         )}
         </AutoSizer>
     </div>}
 
   </div>
   );
 }