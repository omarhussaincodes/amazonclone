const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map(item => ({
        description: item.description,
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
                images: [item.image]
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        shipping_rates: ['shr_1LAYGGSA90ot3IDhSrRhiQEs'],
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    res.status(200).json({ id: session.id, url: session.url });
};