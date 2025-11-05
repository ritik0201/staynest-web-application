import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 pt-20 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
      <div className="prose lg:prose-xl max-w-4xl mx-auto p-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">Last updated: November 05, 2025</p>

        <h2 className="text-2xl font-semibold mt-6">1. Agreement to Terms</h2>
        <p>
          By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms, do not use the services.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Service Description</h2>
        <p>
          StayNest provides an online platform that connects room owners with individuals seeking to book accommodations. We are not an owner of properties, and we do not manage the properties listed on our site.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. User Accounts</h2>
        <p>
          You must register for an account to access certain features of the site. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Bookings and Financial Terms</h2>
        <p>
          As a user, you agree to pay all fees and charges associated with your booking. All payments are processed through our third-party payment processor, Razorpay. StayNest is not responsible for any issues arising from payment processing.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, in no event shall StayNest, its affiliates, agents, directors, or employees, be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, this service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          StayNest Support<br />
          Email: staynest0@gmail.com
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

