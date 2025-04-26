'use client';

// Declare Paystack on window global object
declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    }
  }
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { showToast } from '@/components/ui/ToastContainer';

// Type for checkout item
interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

// Regions of Ghana
const ghanaRegions = [
  "Ahafo Region",
  "Ashanti Region",
  "Bono East Region",
  "Bono Region",
  "Central Region",
  "Eastern Region",
  "Greater Accra Region",
  "North East Region",
  "Northern Region",
  "Oti Region",
  "Savannah Region",
  "Upper East Region",
  "Upper West Region",
  "Volta Region",
  "Western North Region",
  "Western Region"
];

// Initial form state
const initialFormState = {
  // Delivery information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  zipCode: '',
  country: 'Ghana',

  // Payment information
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',

  // Same as delivery checkbox
  sameAsDelivery: true,

  // Billing address (if different)
  billingAddress: '',
  billingCity: '',
  billingRegion: 'Greater Accra Region',
  billingZipCode: '',
  billingCountry: 'Ghana',
};

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);

  // Coupon state
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [freeDelivery, setFreeDelivery] = useState(false);

  // Fetch checkout items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem('checkoutItems');
    if (storedItems) {
      setCheckoutItems(JSON.parse(storedItems));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Coupon logic
  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const now = new Date();
    // Example coupon database with type safety
    const coupons: Record<string, { type: string; value?: number; expires: string }> = {
      'SAVE10': { type: 'percent', value: 10, expires: '2025-12-31' },
      'FREESHIP': { type: 'free_delivery', expires: '2025-12-31' },
      'EXPIRED50': { type: 'percent', value: 50, expires: '2024-01-01' },
    };
    
    // Type-safe check with explicit key checking
    if (!(code in coupons)) {
      showToast('Invalid coupon code.', 'error', 4000);
      setCoupon('');
      return;
    }
    
    const couponData = coupons[code];
    if (new Date(couponData.expires) < now) {
      showToast('This coupon has expired.', 'warning', 4000);
      setCoupon('');
      return;
    }
    setAppliedCoupon(code);
    if (couponData.type === 'percent' && couponData.value !== undefined) {
      setDiscount(couponData.value);
      setFreeDelivery(false);
      showToast(`Coupon applied! ${couponData.value}% off.`, 'success', 4000);
    } else if (couponData.type === 'free_delivery') {
      setFreeDelivery(true);
      setDiscount(0);
      showToast('Coupon applied! Free delivery.', 'success', 4000);
    }
    setCoupon('');
  };

  // Paystack payment handler
  const paystackKey = 'pk_test_556275e18bf268de70d619d9377bd7366278cc3e'; // TODO: Replace with your real Paystack public key

  // Dynamically load Paystack script if not present
  const loadPaystackScript = () => {
    if (document.getElementById('paystack-script')) return;
    const script = document.createElement('script');
    script.id = 'paystack-script';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadPaystackScript();
  }, []);

  const handlePaystackPayment = () => {
    if (!window.PaystackPop) {
      showToast('Payment system not loaded. Please try again.', 'error', 4000);
      return;
    }
    const email = formData.email || 'customer@example.com'; // fallback email
    const amountKobo = Math.round(total * 100); // Paystack expects amount in kobo/pesewas
    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email,
      amount: amountKobo,
      currency: 'GHS',
      callback: function(response: { reference: string }) {
        showToast('Payment successful! Reference: ' + response.reference, 'success', 5000);
        // Complete order (simulate)
        setTimeout(() => {
          localStorage.removeItem('checkoutItems');
          router.push('/checkout/success');
        }, 1000);
      },
      onClose: function() {
        showToast('Payment cancelled.', 'info', 4000);
      }
    });
    handler.openIframe();
  };

  // Submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // When on billing step, trigger Paystack payment
    if (currentStep === 2) {
      handlePaystackPayment();
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-6">Your checkout is empty</h1>
        <p className="mb-8">You have no items in your checkout. Start shopping to add items.</p>
        <Link href="/" className="inline-block bg-pink-500 text-white py-3 px-6 rounded-md font-medium hover:bg-pink-600 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculate order summary
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = freeDelivery ? 0 : 15.99;
  const tax = subtotal * 0.08; // 8% tax
  const discountAmount = discount > 0 ? subtotal * (discount / 100) : 0;
  const total = subtotal + deliveryFee + tax - discountAmount;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
        <Link href="/" className="text-pink-500 hover:text-pink-600">
          Continue Shopping
        </Link>
      </div>

      {/* Progress steps */}
      <div className="hidden sm:flex justify-center mb-12">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-24 h-1 ${currentStep >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                      Region *
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      {ghanaRegions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value="Ghana"
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Billing Information */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Billing Information</h2>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sameAsDelivery"
                      checked={formData.sameAsDelivery}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Same as delivery address</span>
                  </label>
                </div>

                {!formData.sameAsDelivery && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingRegion" className="block text-sm font-medium text-gray-700 mb-1">
                        Region *
                      </label>
                      <select
                        id="billingRegion"
                        name="billingRegion"
                        value={formData.billingRegion}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        {ghanaRegions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="billingZipCode"
                        name="billingZipCode"
                        value={formData.billingZipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="billingCountry"
                        name="billingCountry"
                        value="Ghana"
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border-2 border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div>{/* Empty div for alignment when there's no back button */}</div>
              )}
              <button
                type="submit"
                className={`px-6 py-3 rounded-md font-medium transition-colors shadow-md bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50`}
              >
                {currentStep < 2 ? (
                  <span className="flex items-center justify-center">
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Pay with MoMo
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Coupon input */}
            <div className="mb-4">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  disabled={!!appliedCoupon}
                  placeholder="Enter coupon code"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={!coupon || !!appliedCoupon}
                  className={`px-4 py-2 rounded-md font-medium ${(!coupon || !!appliedCoupon) ? 'bg-gray-300 text-gray-500' : 'bg-pink-500 text-white hover:bg-pink-600'}`}
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="mt-2 text-green-600 text-sm">Applied: {appliedCoupon}</div>
              )}
            </div>

            {/* Product details */}
            <div className="flex mb-6 pb-6 border-b border-gray-200">
              <div className="relative h-24 w-20 bg-gray-100 rounded overflow-hidden mr-4 shrink-0">
                <Image
                  src={checkoutItems[0].image}
                  alt={checkoutItems[0].name}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <h3 className="font-medium">{checkoutItems[0].name}</h3>
                <p className="text-sm text-gray-500">
                  Color: {checkoutItems[0].color} | Size: {checkoutItems[0].size}
                </p>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">Qty: {checkoutItems[0].quantity}</p>
                  <p className="font-medium">GH₵{checkoutItems[0].price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">GH₵{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Delivery</p>
                <p className="font-medium">GH₵{deliveryFee.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tax (8%)</p>
                <p className="font-medium">GH₵{tax.toFixed(2)}</p>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <p className="text-green-600">Discount ({discount}% off)</p>
                  <p className="font-medium text-green-600">-GH₵{discountAmount.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">GH₵{total.toFixed(2)}</p>
            </div>

            {/* Secure checkout message */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}