const FacultyInstructorsSbbUni: React.FC = () => {
    return (
<div className="bg-white shadow overflow-hidden sm:rounded-lg">
  <div className="px-4 py-5 sm:px-6">
    <h2 className="text-lg leading-6 font-medium text-gray-900">
      Faculty and Instructors
    </h2>
    <p className="mt-1 max-w-2xl text-sm text-gray-500">
      Meet our team of experienced educators.
    </p>
  </div>
  <div className="border-t border-gray-200">
    <dl>
      {/* Repeat this section for each instructor */}
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Instructor Name
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          Brief profile or biography of the instructor, highlighting their expertise and qualifications in their respective fields.
        </dd>
      </div>
      {/* End repeat */}
    </dl>
  </div>
</div>
    );
};

export default FacultyInstructorsSbbUni;