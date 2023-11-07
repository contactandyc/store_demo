// pages/carts/[merchant_id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import CartProductCard from '../../components/CartProductCard';
import SummaryGroup from '../../components/SummaryGroup';
import SummaryLine from '../../components/SummaryLine';
import { FormState } from '../../interfaces/Interfaces';

const MerchantCartPage = ({ merchantName }) => {
  const { carts } = useCart();
  const router = useRouter();
  const { merchant_id } = router.query;

  const merchantId = Array.isArray(merchant_id) ? merchant_id[0] : merchant_id;

  const merchantCart = carts[merchantId] || [];

  // Calculate the total cost of the specific merchant's cart
  const subtotal = merchantCart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleSubmit = async (formState: FormState) => {
    console.log(formState)
    // Add your validation logic here
    if (!formState.lastName) {
      // Handle the error case
      return;
    }
    // Here you might send the formState to a server
    // After which you navigate to the next page
    await router.push(`/merchants/${merchant_id}`);
  };

  const tax = 0.075 * subtotal;
  const shippingCost = 0;
  const zipCode = 43076;
  const total = subtotal + tax + shippingCost;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Shopping Cart for {merchantName}</h2>
      <SummaryGroup className={'max-w-4xl'}>
        <SummaryLine
          label={<span>Subtotal</span>}
          value={<span>${subtotal.toFixed(2)}</span>}
        />
        <SummaryLine
          label={<span>Shipping</span>}
          value={<span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>}
        />
        <SummaryLine
          label={<span>Tax</span>}
          value={<span>${tax.toFixed(2)}</span>}
          className={"py-1 border-b "}
        />
        <SummaryLine
          label={<span className="text-lg font-bold">Total</span>}
          value={<span className="text-lg font-bold">${total.toFixed(2)}</span>}
        />
      </SummaryGroup>
      <div className="cart-items">
        {merchantCart.length > 0 ? (
          merchantCart.map((item) => (
            <CartProductCard
              key={item.id}
              merchantId={merchantId}
              product={item}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { merchant_id } = context.params;
  const response = await fetch(`http://localhost:3001/api/merchants/${merchant_id}`);
  const merchant = await response.json();

  return { props: { merchantName: merchant.name } };
};

export default MerchantCartPage;
