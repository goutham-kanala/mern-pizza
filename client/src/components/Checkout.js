import React from 'react'
import {useDispatch , useSelector} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import { useHistory } from 'react-router-dom';

export default function Checkout({subtotal}) {

    const orderstate = useSelector((state) => state.placeOrderReducer)
    const {loading , error , success} = orderstate
    const dispatch = useDispatch()
    const history = useHistory();
    function tokenHander(token)
    {
        console.log(token);
        console.log(subtotal)
        dispatch(placeOrder(token , subtotal))
        if (success) {
            history.push('http://localhost:3000/orders'); // Change '/orders' to your actual orders page path
          }

    }

    return (
        <div>
            
            {loading && (<Loading/>)}
            {error && (<Error error='Something went wrong'/>)}
            {success && (<Success success='Your Order Placed Successfully'/>)}

            <StripeCheckout
            amount={subtotal*100}
            shippingAddress
            token={tokenHander}
            stripeKey='pk_test_51NRMcrK9cZdExoXXSXL7jYIBEZ4oJQrZc2QaA5NZW98fILlrt2p8snlqPpC4OspsirEHg7agobmQHcfuNkUXnd7p00hMXlf4xj'
            // currency='USD'
            >

                  
                  <button className='btn'>Pay Now</button>

            </StripeCheckout>
            
        </div>
    )
}
