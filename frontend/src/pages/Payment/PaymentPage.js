import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import { useLoading } from '../../hooks/useLoading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
// import Map from '../../components/Map/Map';
// import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';



export default function PaymentPage() {
  const [order, setOrder] = useState();

  const navigate = useNavigate();
  const [{ isPending }] = [false];
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });


  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);


  const { clearCart } = useCart();

  if (!order) return;

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_2SuRloEn2Xmn8F",
      amount: data.amount,
      currency: data.currency,
      name: order.items[0].food.name,
      // description: data.items[0].food.description,
      image: order.items[0].food.imageUrl,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/api/orders/verify";
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          const verificationData = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          };
          const { data } = await Axios.post(verifyUrl, verificationData);
          console.log(data);
          if(data.success===true){
            const { data } = await Axios.put("/api/orders/pay",{razorpay_payment_id});
            console.log(data);
            clearCart();
            toast.success('Payment Saved Successfully', 'Success');
            navigate('/track/' + data.order_id);
          }
        } catch (err) {
          console.log("Verification error:", err);
        }
      }
    };
    const razorpay1 = new window.Razorpay(options);
    razorpay1.open();
  };

  async function placeOrderHandler(){
    try{
      const {data}=await Axios.post('http://localhost:5000/api/orders/orders', 
        {
          amount: order.totalPrice,
        });
        console.log(data);
        initPayment(data.data);
      }
      catch(error){
        console.log(error);
      }
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        {/* <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div> */}

        <div className={classes.buttons_container}>
        <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </div>
        </div>
      </div>
    </>
  );
}
