import { UserPlus, Users, Calendar, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative">
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Find Your Perfect Mentor Match
          </h1>
          <p className="text-xl text-blue-700 mb-8">
            Connect with experienced mentors in your field and accelerate your
            career growth
          </p>
        </section>

        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Why Choose MentorMatch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<UserPlus className="h-10 w-10 text-blue-600" />}
              title="Personalized Matching"
              description="Our  algorithm ensures you're paired with the perfect mentor for your goals."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-600" />}
              title="Diverse Network"
              description="Access a wide range of mentors from various industries and backgrounds."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-blue-600" />}
              title="Flexible Scheduling"
              description="Book sessions that fit your schedule with our easy-to-use calendar system."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-blue-600" />}
              title="Ongoing Support"
              description="Enjoy continuous communication and support throughout your mentorship journey."
            />
          </div>
        </section>
        <section className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Ready to Start Your Mentorship Journey?
          </h2>
          <p className="text-xl text-blue-700 mb-8">
            Join MentorMatch today and take the first step towards your
            professional growth
          </p>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: String;
  description: String;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  );
}
