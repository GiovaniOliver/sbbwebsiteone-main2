import React from 'react';

const CourseScheduleAndRegistrationSbbUni: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Course Schedule and Registration
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                        <div className="w-full font-bold text-xl text-gray-800 px-6">Upcoming Courses</div>
                        <p className="text-gray-800 text-base px-6 mb-5">
                            Check out our upcoming courses and their schedules. Make sure to register before the deadline!
                        </p>
                    </div>
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                        <div className="flex items-center justify-start">
                            <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseScheduleAndRegistrationSbbUni;
