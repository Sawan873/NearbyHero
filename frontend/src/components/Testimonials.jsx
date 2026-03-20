import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Requester",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
    text: "After my knee surgery, I couldn't drive to pick up my prescriptions. A neighbor responded within 20 minutes and had everything delivered to my door. This platform is a lifesaver!",
  },
  {
    name: "Michael R.",
    role: "Helper",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
    text: "I've helped over 40 neighbors in the past six months. It's incredibly rewarding to use my tech skills to help seniors set up their devices.",
  },
  {
    name: "Jennifer L.",
    role: "Both",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
    text: "Sometimes I need help, sometimes I help others. That's what community is about. I've made genuine friendships through NearbyHero.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Stories From Our Community
          </h2>
          <p className="text-lg text-gray-600">
            Real people making a real difference
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow-md
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-center mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md
                             transition duration-300 hover:scale-110"
                />
                <div className="ml-4">
                  <div className="font-semibold text-gray-900 text-lg">
                    {item.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {item.role}
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex mb-4 text-yellow-400 text-lg tracking-wider">
                ★★★★★
              </div>

              <p className="text-gray-700 leading-relaxed">
                {item.text}
              </p>

            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-24 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Join 12,000+ Community Members
          </h3>

          <p className="text-lg opacity-95 mb-8">
            Your neighborhood is waiting for you
          </p>

          <Link
            to="/register"
            className="bg-white text-red-600 font-semibold px-10 py-4 rounded-xl text-lg
                       hover:bg-gray-100 hover:scale-105 active:scale-95
                       transition-all duration-300 shadow-md hover:shadow-2xl inline-block"
          >
            Create Your Account
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
