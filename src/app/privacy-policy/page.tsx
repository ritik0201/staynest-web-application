import Footer from '@/components/footer';
import React from 'react';

export const metadata = {
  title: 'StayNest - Privacy Policy',
  description: 'Read the StayNest privacy policy to understand how we collect, use, and protect your personal information. Learn about your data rights and our security measures.',
  openGraph: {
    title: 'StayNest - Privacy Policy',
    description: 'Read the StayNest privacy policy to understand how we collect, use, and protect your personal information. Learn about your data rights and our security measures.',
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 pt-20 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="prose lg:prose-xl max-w-4xl mx-auto p-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">Last updated: November 05, 2025</p>

        <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
        <p>
          Welcome to StayNest. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
          </li>
          <li>
            <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you book a room. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Razorpay.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Create and manage your account.</li>
          <li>Process your payments and refunds.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
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

export default PrivacyPolicyPage;
