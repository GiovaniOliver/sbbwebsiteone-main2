/* eslint-disable @next/next/no-img-element */
import React from 'react';

const StudentSuccessStoriesSbbUni: React.FC = () => {
    // This is a placeholder data. You can replace this with actual data.
    const testimonials = [
        {
            name: 'Student 1',
            testimonial: 'The courses at SBB University have been instrumental in my personal and professional growth. The knowledge and skills I gained have opened up new opportunities for me.',
            image: '/path-to-image-1.jpg'
        },
        {
            name: 'Student 2',
            testimonial: 'SBB University has provided me with invaluable knowledge in the field of cryptocurrency. The courses are comprehensive and the instructors are extremely knowledgeable.',
            image: '/path-to-image-2.jpg'
        },
        {
            name: 'Student 3',
            testimonial: 'The community at SBB University is supportive and collaborative. The courses have not only provided me with knowledge but also a network of individuals passionate about supporting black-owned businesses.',
            image: '/path-to-image-3.jpg'
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Success Stories</h2>
                <div className="flex flex-wrap">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-full md:w-1/3 px-6 mb-8 md:mb-0">
                            <div className="bg-gray-100 p-6 rounded">
                                <img className="h-16 w-16 rounded-full mx-auto mb-4" src={testimonial.image} alt={testimonial.name} />
                                <h3 className="text-gray-800 text-2xl font-bold text-center">{testimonial.name}</h3>
                                <p className="text-gray-600 mt-4 text-center">{testimonial.testimonial}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentSuccessStoriesSbbUni;
