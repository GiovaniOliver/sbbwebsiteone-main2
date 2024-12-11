// app/components/ContactUs.tsx
import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <section className="p-4 bg-white text-black">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="text-lg">
          We are always open to further information, partnership opportunities, or general inquiries. Please feel free to reach out to us at [your email address] or follow us on our social media platforms.
        </p>
      </div>
    </section>
  );
};

export default ContactUs;
