// app/components/Introduction.tsx
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section className="p-4 bg-white text-black">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-2">Introduction</h2>
        <p className="text-lg">
          This is a social network DAO ecosystem dedicated to supporting black-owned businesses and fostering community development. Our mission is to create a dedicated space for black-owned businesses and communities to connect, grow, and thrive.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
