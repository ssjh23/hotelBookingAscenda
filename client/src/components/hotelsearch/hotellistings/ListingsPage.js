import FetchHotel from "./FetchHotel"
import '../hotels.css';

const ListingsPage = () => {
  return (
    <section className='containerBackground'>
      <h1 id='containerHeader' style={{textAlign:'center'}}>List of Hotels</h1>
      <FetchHotel />
    </section>
  )
}

export default ListingsPage