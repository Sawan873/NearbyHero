import React from "react";

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <h2 className="text-5xl font-semibold text-gray-900 mb-6">
          Ready to Make a Difference?
        </h2>

        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Whether you need help or want to help others, your community is waiting.
          Join thousands of neighbors making their communities stronger every day.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-red-600 text-white font-semibold px-12 py-5 rounded-xl text-lg w-full sm:w-auto">
            Sign Up Free
          </button>

          <button className="bg-blue-500 text-white font-semibold px-12 py-5 rounded-xl text-lg w-full sm:w-auto">
            Browse Requests
          </button>
        </div>

        <p className="mt-8 text-gray-500">
          No credit card required • Free forever • Takes 2 minutes
        </p>

      </div>
    </section>
  );
};

export default CTA;
