// app/components/Team.tsx
import React from 'react';

const Team: React.FC = () => {
  return (
    <section className="p-4 bg-white text-black">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-2">Our Team</h2>
        <p className="text-lg">
          Our team is composed of dedicated individuals with diverse expertise and backgrounds. We are committed to our mission of supporting black-owned businesses and fostering community development. For further inquiries or collaboration opportunities, please contact us.
        </p>
      </div>
    </section>
  );
};

export default Team;
