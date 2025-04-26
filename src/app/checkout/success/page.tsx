
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-pink-100 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully and is being processed. You will receive a confirmation SMS and email shortly.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-1">Order Confirmation</h2>
          <p className="text-sm text-gray-500">Order #YCS-{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Order Status:</p>
            <p className="text-green-600 font-medium">Processing</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Estimated Delivery:</p>
            <p>
              {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          A receipt with all order details has been sent to your email address.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">What&apos;s Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2">Why this matters</h2>
            <p className="text-gray-600 text-sm">
              We&apos;ll send your order confirmation and updates to your email. Make sure to check your spam folder.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Track Your Delivery</h3>
            <p className="text-gray-600 text-sm">
              Our delivery team will call you before arriving. You can also check your order status in your account.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm">
              If you have any questions about your order, feel free to call our customer support team at 030-123-4567.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/" className="bg-pink-500 text-white font-medium py-3 px-6 rounded-md hover:bg-pink-600 transition-colors">
          Continue Shopping
        </Link>
        <Link href="/account" className="bg-white text-pink-500 border-2 border-pink-500 font-medium py-3 px-6 rounded-md hover:bg-pink-50 transition-colors">
          View My Orders
        </Link>
      </div>
    </div>
  );
}