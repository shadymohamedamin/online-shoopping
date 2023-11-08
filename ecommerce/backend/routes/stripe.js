/*const Joi=require("joi");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const generateToken = require("../utiles/genAuthToken");
const User=require('../models/user');

require("dotenv").config();
const Stripe=require("stripe");
const stripe=Stripe(process.env.STRIPE_KEY);
//const stripe = require('stripe')('sk_test_MMNDWMvpQe1ES6MzEzMDGu5a00gaF0XBFa')

router.post('/create-checkout-session', async (req, res) => {
    const customer=await stripe.customers.create({
        metadata:{
            userId:req.body.userId,
            cart:JSON.stringify(req.body.cartItems)
        }
    })
    const line_items=req.body.cartItems.map((item)=>{
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images:[item.sr],
                    description:item.desc,
                    metadata:{
                        id:item.id,
                    },
                },
                unit_amount: item.price*100,
            },
            quantity: item.quantity,
        }
    })
    console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
        enabled: true,
      },
    customer:customer.id,  
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({url:session.url});
});





// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;// = "whsec_4257d96b9c6ed7c0d738443b7d9e31b5f548abe061daf182349ab1aadd944b90";
//whsec_4257d96b9c6ed7c0d738443b7d9e31b5f548abe061daf182349ab1aadd944b90
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;
  if(endpointSecret)
  {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("shady");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data=event.data.object;
    eventType=event.type;
  }
  else 
  {
    data=req.body.data.object;
    eventType=req.body.type;
  }
  

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log(data);
        
      })
      .catch((err) => console.log(err.message));
    }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});



module.exports=router;*/




















const express = require("express");
const Stripe = require("stripe");
const  Order  = require("../models/order");
const jwt=require("jsonwebtoken");
const Product = require("../models/product");
const sendEmail = require("../utiles/sendEmail");
const nodemailer=require('nodemailer');



require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.use(function(req, res, next) {
  //console.log(req.headers);
  
  if(req.headers.authorization)
  {
      //console.log(typeof(req.headers.authorization.substring(7,11)))
      if(req.headers.authorization.substring(7,11)!='null')
      {
          //console.log("USer");
          token=req.headers.authorization.split(' ')[1].replace('Bearer ', '');
          const secret=process.env.JWT_SECRET_KEY;

          obj=jwt.verify(token,secret);
          //console.log("token: ",token);
          //console.log(obj)
          //if(obj.isAdmin==false){return res.status(403).json({ error: 'the admin only who can control in this route' });}
      }
      else return res.status(403).json({ error: 'you should login first' });//console.log("No User");
  }
  next();
});  

var tempArr=[];
router.post("/create-checkout-session", async (req, res) => {
  //console.log("shady: ",req.body);
  tempArr=req.body.cartItems;
  console.log("stripe");
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      //cart: JSON.stringify(req.body.cartItems),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.sr],//item.sr.url
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items, 
    mode: "payment", 
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

// Create order function

const createOrder = async (customer, data,lineItems) => {
  /*const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.quantity,
    };
  });*/
  
  for(var product of tempArr)
  {
    console.log("product.quantity:=>",product.quantity);
    
    const oldProduct=await Product.findById(product.id);
    console.log("oldProduct:=>",oldProduct);
    const obj={
      name:oldProduct.name,
      sr:oldProduct.sr,
      desc:oldProduct.desc,
      price:oldProduct.price,
      brand:oldProduct.brand,
      createdAt:oldProduct.createdAt,
      updatedAt:oldProduct.updatedAt,
      product_quantity:oldProduct.product_quantity-product.quantity,
      sold:oldProduct.sold+product.quantity
    }
    const newProduct=await Product.findByIdAndUpdate(product.id,{$set:obj})
    console.log("newProduct",newProduct);
  }
  //var idArr=[];for(var i=0;i<temp.length;i++){idArr.push(temp[i].id);}
  //const newProducts=await Product.updateMany({_id:{$in:idArr}},{$dec,}) 
  console.log("temp",tempArr);
  console.log("customer: ",customer); 
  console.log("data: ",data);
  console.log("line items",lineItems);
      
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products:tempArr,//lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();

    const to_to=savedOrder.shipping.email;//'shadimabdrawy1999@gmail.com';
    const subject='Order Details';
    var body=`<!DOCTYPE html>
      <html>
      <head>
        <title>Email from Shopping Online</title>
        <style>
          p {
            color:blue;
            font-size:20px;
            font-weight:700;
          }
          h1{
            display:flex;
            justify-content:center;
            align-items:center;
          }
          img{
              padding-right:2rem;
          }
          span{
            padding-right:1rem;
            padding-left:0.5rem;
          }
        </style>
      </head>
      <body>
        <h1>Order Details</h1>
        <p>ordered products</p>
        <table>
        <tr>
        <th>photo</th>
        <th>name</th>
        <th>quantity</th>
        <th>price</th>
        <tr/>
        `;
        for(var i=0;i<savedOrder.products.length;i++)
        {
          body+=`
          <tr>
            <td><img src=${savedOrder.products[i].sr} style="padding-right:2rem;" width='50' height='50'></img></td>
            <td><span>${savedOrder.products[i].name}</span></td>
            <td><span>${savedOrder.products[i].quantity}</span></td>
            <td><span>${savedOrder.products[i].price*savedOrder.products[i].quantity}</span></td>
          </tr>`
        }    
        
        
      body+=`</table><p>Total: ${savedOrder.total/100}</p>
      </body>
      </html>`;


      

      sendEmail(to_to,subject,body);
    console.log("Processed Order:", savedOrder);
    //email
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            //console.log(customer);
            //console.log(data);
            // CREATE ORDER
            stripe.checkout.sessions.listLineItems(
              data.id,//'cs_test_a1iXUBUL4SEm6oktBXpguG83kzvPnzYpUR5ESOOUqkcMeKBOe0aO5C8O2U',
              {},
              function(err, lineItems) {
                //console.log("line_Items: ", lineItems);
                // asynchronously called
                createOrder(customer, data,lineItems);
              }
            );
            
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

module.exports = router;