import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_300bdc3a8708cce59cc8e51779b3c6d8e142f54afbc19b236a3c57d66606d74b";

export default async function handler(req,res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === 'paid';
        if (orderId && paid) {
          await Order.findByIdAndUpdate(orderId,{paid:true,})
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok');
}

export const config = {
    api:{bodyParser:false}
}

//fame-wins-heaven-ardent

// id : acct_1POlerE3h98fbxVY 