import Footer from '@/components/footer';
import React from 'react';

export const metadata = {
  title: 'StayNest - Refund & Cancellation Policy',
  description: 'Understand the StayNest refund and cancellation policy. Learn about cancellation windows, refund eligibility, and how to cancel your booking.',
  openGraph: {
    title: 'StayNest - Refund & Cancellation Policy',
    description: 'Understand the StayNest refund and cancellation policy. Learn about cancellation windows, refund eligibility, and how to cancel your booking.',
  },
};

const RefundCancellationPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 pt-20 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund & Cancellation Policy</h1>
      <div className="prose lg:prose-xl max-w-4xl mx-auto  p-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">Last updated: November 05, 2025</p>

        <h2 className="text-2xl font-semibold mt-6">1. Cancellation Policy</h2>
        <p>
          Users can cancel their booking through their dashboard. The ability to cancel and the associated fees depend on the timing of the cancellation relative to the check-in date.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Full Refund:</strong> Cancellations made more than 7 days before the check-in date are eligible for a full refund of the booking amount, minus any non-refundable service fees.
          </li>
          <li>
            <strong>Partial Refund:</strong> Cancellations made between 3 and 7 days before the check-in date are eligible for a 50% refund.
          </li>
          <li>
            <strong>No Refund:</strong> Cancellations made less than 3 days before the check-in date are not eligible for a refund.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">2. Refund Process</h2>
        <p>
          Refunds will be processed to the original method of payment within 7-10 business days after the cancellation has been approved. You will be notified via email once the refund has been initiated.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. How to Cancel</h2>
        <p>
          To cancel a booking, please log in to your StayNest account, navigate to the &apos;My Bookings&apos; section, and select the booking you wish to cancel. Follow the on-screen instructions to proceed with the cancellation.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Contact Us</h2>
        <p>
          If you have any questions about our Refund and Cancellation Policy, please contact us:
        </p>
        <p>
          StayNest Support<br />
          Email: staynest0@gmail.com
        </p>
      </div>
      < Footer />
    </div>
  );
};

export default RefundCancellationPolicyPage;
