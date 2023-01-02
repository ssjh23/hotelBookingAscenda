import { Dropdown } from './dropdown'
import './roomguestcount.css';

export function RoomGuestCount(props){
    return(
        <div className='roomguestcount'>
            <div className='Rooms'>
                <Dropdown data={[1,2,3,4]} header="Rooms" submitData={(result)=>props.submitRooms(result)}/>
                
            </div>
            <div className='Adults'>
                <Dropdown data={[1,2,3,4]} header="Adults" submitData={(result)=>props.submitAdults(result)}/>
            </div>
            <div className='Children'>
                <Dropdown data={[0,1,2,3,4]} header="Children" submitData={(result)=>props.submitChildren(result)}/>
            </div>
        </div>

    )
}