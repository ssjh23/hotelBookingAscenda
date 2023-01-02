import "./currency.css"
import { useState, useEffect } from "react"
import { BiCaretDown } from "react-icons/bi";

export function Currency(props){

    //Set useStates (isAvtive: When the textbox is selected to be open or not, selection: Dynamically determine the selections available from props)
    const [isActive, setIsActive] = useState(false)
    const [selection, setSelection] = useState('SGD');
    const header = props.header
    const data = props.data

    //Open or closes selections when button is pressed
    const onClickButtonHandler = () => {
        setIsActive(!isActive);
    }

    //Select choice, closes list when selected
    const onClickSelectionHandler = (choice) =>{
        setSelection(choice);
        setIsActive(false);
        //Return choice to form in parent component
        props.submitCurrency(choice);
    }

    //Selection list closes when click outside of selection field and button is detected
    useEffect(() =>{
        const closeDropdown = e =>{
            if(e.path[0].tagName!== "svg" && e.path[0].className !== "dropdown-btn"){
            setIsActive(false);
            }
            
        };
        document.addEventListener('click', closeDropdown);
    
        return() => document.removeEventListener('click', closeDropdown);
      })

    //JSX Render
    return(
        <div className="Currency">
            <div className='dropdown'>
                <h6>{header}</h6>
                <div className="dropdown-btn" onClick={onClickButtonHandler}>{selection} <BiCaretDown /></div>
                {isActive && (            
                <div className='dropdown-content'>
                    {data.map((item, index)=> <div key={index} className='dropdown-item' onClick={()=>onClickSelectionHandler(item)}>{item}</div>)}
                </div>)
                }
            </div>
        </div>
    )
}