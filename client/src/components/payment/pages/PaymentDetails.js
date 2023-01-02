import { Component } from "react";
import DetailForms from "../payment_components/DetailForms";

class PaymentDetailsPage extends Component {

    render() {
        return (
            <div className="BookHotelPage">
                <DetailForms></DetailForms>
            </div>
        );
    }
}

export default PaymentDetailsPage;