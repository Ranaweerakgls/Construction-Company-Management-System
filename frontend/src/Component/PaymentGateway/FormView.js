// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//import CheckoutForm from './CheckoutForm';

// Load your publishable key from Stripe
const stripePromise = loadStripe('pk_test_51R8NoCSBlInf359dsUzjsTVOx5Sk64cP9ioDVGIXtMmx5lCW6eTgGpLgEObCs5mpnsMPpxWowCZCXnwKdzZp7sCq00DXXsi0Wg'); 
//pk_test_51R8NoCSBlInf359dsUzjsTVOx5Sk64cP9ioDVGIXtMmx5lCW6eTgGpLgEObCs5mpnsMPpxWowCZCXnwKdzZp7sCq00DXXsi0Wg
 function FormView() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
}

export default FormView;
////sk_test_51R8NoCSBlInf359dPI3W3e8CBI04Ghwqs6dNzWaAZJFqtW8tazkKFAXVYjLDWvDYdM4goGijNdqRDKgKzcpp09Ou00tVxe7GfL
