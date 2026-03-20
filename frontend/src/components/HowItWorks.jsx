import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-900 mb-4">
            How NearbyHero Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting help or becoming a hero in your community is simple and straightforward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Request Side */}
          <div>
            {[ 
              {
                step: "1",
                title: "Create Your Request",
                desc: "Post what you need help with - from grocery shopping to tech support. Set urgency and location."
              },
              {
                step: "2",
                title: "Connect with Heroes",
                desc: "Nearby helpers see your request and offer assistance. Review profiles and ratings."
              },
              {
                step: "3",
                title: "Get Help & Say Thanks",
                desc: "Coordinate through secure chat, get help, and leave a rating to build trust."
              }
            ].map((item, index) => (
              <div key={index} className="bg-red-50 rounded-2xl p-8 mb-8">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Helper Side */}
          <div>
            {[ 
              {
                step: "1",
                title: "Browse Local Requests",
                desc: "See what people in your neighborhood need help with."
              },
              {
                step: "2",
                title: "Offer Your Help",
                desc: "Select requests matching your skills and availability."
              },
              {
                step: "3",
                title: "Be a Hero",
                desc: "Complete tasks and build your reputation as a trusted helper."
              }
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-8 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
