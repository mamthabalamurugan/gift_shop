import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';
// import { sendEmailReceipt } from '../helpers/mail.helper.js';

const router = Router();
router.use(auth);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);


router.post("/orders", async(req, res) => {
  try{
    const instance=new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });

    const options={
      amount: parseInt(req.body.amount*100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong!"});
      }
      res.status(200).json({data:order});
    })
  }catch(error){
    console.log('Error in creating the razorpay order', error);
    res.status(500).json({message:"Server error!"});
  }
});

router.post('/verify', async(req, res)=>{
  try{
    const{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }=req.body;
    const sign=razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSign=crypto
    .createHmac("sha256",process.env.RAZOR_PAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex")
    if(razorpay_signature===expectedSign){
      return res.status(200).json(
        {
          success:true,
          order_id:razorpay_order_id,
        }
      );
    }else{
      console.log("Invalid signature");
      return res.status(400).json({message:"Invalid signature"});
    }
  }catch(error){
    console.log("Server error!");
    res.status(500).json({message:"Server error!"});
  }
});

router.put(
  '/pay',
  handler(async (req, res) => {
    const { razorpay_payment_id } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send('Order Not Found!');
      return;
    }

    order.paymentId = razorpay_payment_id; 
    order.status = OrderStatus.PAYED;
    await order.save();

    // sendEmailReceipt(order);
    res.send(order._id);
  })
);

router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      user: req.user.id,
    };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(UNAUTHORIZED);

    return res.send(order);
  })
);

router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send();
  })
);

router.get('/allstatus', (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.send(allStatus);
});

router.get(
  '/:status?',
  handler(async (req, res) => {
    const status = req.params.status;
    const user = await UserModel.findById(req.user.id);
    const filter = {};

    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;

    const orders = await OrderModel.find(filter).sort('-createdAt');
    res.send(orders);
  })
);

const getNewOrderForCurrentUser = async req =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  }).populate('user');
export default router;
