function censorCard(cardNumber) {
    let card = cardNumber.toString();
    let censoredCard = "";
    for (let i=0; i<cardNumber.length-4; i++) {
        censoredCard += "*"
    }
    return censoredCard + cardNumber.slice(cardNumber.length-4, cardNumber.length);
}

const Record = (props) => (
    <table className='table'>
        <tbody className='table-body'>
            <tr className='row-0'>
                <td><b>Hotel ID</b></td>
                <td>{props.record.hotelID.toUpperCase().trim()}</td>
            </tr>
            <tr className='row-0'>
                <td><b>Date of Stay</b></td>
                <td>{props.record.startDate.toString().substring(0,15).toUpperCase().trim()} to {props.record.endDate.toString().substring(0,15).toUpperCase().trim()} ({props.record.numberOfNights} DAYS)</td>
            </tr>
            <tr className='row-0'>
                <td><b>Number of Guests</b></td>
                <td>{props.record.numberOfGuests.toString().toUpperCase().trim()} PAX</td>
            </tr>
            <tr className='row-0'>
                <td><b>Room Type</b></td>
                <td>{props.record.roomType.toString().toUpperCase().trim()}</td>
            </tr>
            <tr className='row-0'>
                <td><b>Total Cost</b></td>
                <td>{props.record.currency.toString().toUpperCase().trim()} {props.record.cost.toString().toUpperCase().trim()}</td>
            </tr>
            <tr className='row-1'>
                <td><b>Name</b></td>
                <td>{props.record.firstName.toUpperCase().trim()} {props.record.lastName.toUpperCase().trim()}</td>
            </tr>
            <tr className='row-2'>
                <td><b>Email Address</b></td>
                <td>{props.record.emailAddress.toUpperCase().trim()}</td>
            </tr>
            <tr className='row-3'>
                <td><b>Phone Number</b></td>
                <td>{props.record.phoneNumber.trim()}</td>
            </tr>
            <tr className='row-4'>
                <td><b>Credit Card Number</b></td>
                <td>{censorCard(props.record.creditCardNumber)}</td>
            </tr>
            <tr className='row-5'>
                <td><b>Billing Address</b></td>
                <td>{props.record.streetNumber.trim()} {props.record.streetName.toUpperCase().trim()} {props.record.postalCode.trim()}</td>
            </tr>
        </tbody>
    </table>
);

export default Record;