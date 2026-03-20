import { Link } from "react-router-dom";

const categories = [
  { title: "Shopping & Errands", count: "342 active requests" },
  { title: "Tech Support", count: "187 active requests" },
  { title: "Home & Garden", count: "256 active requests" },
  { title: "Teaching & Tutoring", count: "124 active requests" },
  { title: "Transportation", count: "198 active requests" },
  { title: "Pet Care", count: "167 active requests" },
  { title: "Companionship", count: "89 active requests" },
  { title: "Other Services", count: "213 active requests" },
];

const Categories = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Ways to Help Your Neighbors
          </h2>
          <p className="text-lg text-gray-600">
            Whatever your skills, there's someone who needs your help
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to="/browse"
              className="bg-white rounded-2xl p-8 shadow-md
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-300
                         border border-gray-100
                         group"
            >
              <div className="w-14 h-14 bg-red-100 rounded-xl mb-6 
                              group-hover:bg-red-200
                              transition duration-300" />

              <h3 className="text-xl font-semibold text-gray-900 mb-3 
                             group-hover:text-red-600 transition duration-300">
                {cat.title}
              </h3>

              <p className="text-sm font-medium text-gray-600">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
