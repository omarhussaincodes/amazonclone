/* eslint-disable import/no-anonymous-default-export */
import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// Secure a connection to Firebase from backend
const serviceAccount = require("../../permissions.json");

const app =
    !admin.apps.length ?
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        }) :
        admin.app()


// firestore database - fullfill order 
const fullFillOrder = async (session) => {

    return app.firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`Order added to database for ${session.id}`)
        })
        .catch((e) => {
            console.log(`Error adding orders to database for ${session.id}`)
        })
}

// Establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        // Verify webhook signature and extract the event.
        // See https://stripe.com/docs/webhooks/signatures for more information.
        let event;
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log('WEBHOOK ERROR!!', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the checkout session completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log(session);
            // fullfill order
            return fullFillOrder(session)
                .then(() => res.status(200))
                .catch((e) => res.status(400).send(`Webhook error:${e.message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
};