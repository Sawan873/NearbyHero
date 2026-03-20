import React from "react";

const features = [
  {
    title: "Verified Profiles",
    desc: "All users verify their identity and contact information for added security.",
  },
  {
    title: "Ratings & Reviews",
    desc: "Transparent feedback system helps you choose trusted community members.",
  },
  {
    title: "Secure Messaging",
    desc: "All communications happen through our secure in-app chat system.",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always available to resolve any issues.",
  },
];

const TrustSafety = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-4">
            Built on Trust & Safety
          </h2>
          <p className="text-xl text-gray-600">
            Your security and peace of mind are our top priorities
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-sm">
              
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full" />

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSafety;
