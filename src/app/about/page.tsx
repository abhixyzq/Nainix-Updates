import { BookOpen, Target, Users } from 'lucide-react';

export const metadata = {
  title: 'About Us | Nainix Updates',
  description: 'Learn more about Nainix Updates, your trusted portal for the latest government jobs, admit cards, and exam results.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      <div className="rounded-3xl shadow-neu-flat p-8 md:p-16 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neu-text-heading mb-6 tracking-tight">
          About <span className="text-neu-accent">Nainix Updates</span>
        </h1>
        <div className="w-20 h-2 bg-neu-accent rounded-full mb-8 shadow-neu-flat-sm"></div>
        
        <div className="prose max-w-none text-neu-text font-medium leading-relaxed">
          <p className="text-lg mb-6">
            Welcome to <strong>Nainix Updates</strong>, your number one source for all things related to Indian education, government jobs, admit cards, and exam results. We're dedicated to giving you the very best and fastest updates, with a focus on dependability, user experience, and accuracy.
          </p>
          <p className="text-lg mb-6">
            Founded with the mission to simplify the job-hunting and exam preparation journey for millions of Indian students, Nainix Updates has come a long way from its beginnings. We understand the frustration of navigating through cluttered, ad-heavy, and confusing websites just to find a simple exam date or admit card link.
          </p>
          <p className="text-lg">
            That's why we created this premium, fast, and easy-to-use portal. We hope you enjoy our platform as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-3xl shadow-neu-flat p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 shadow-neu-pressed rounded-full flex items-center justify-center text-blue-500 mb-6">
            <Target className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-neu-text-heading mb-4">Our Mission</h3>
          <p className="text-neu-text font-medium">To provide the fastest, most accurate, and easily accessible education and job updates to every student in India.</p>
        </div>

        <div className="rounded-3xl shadow-neu-flat p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 shadow-neu-pressed rounded-full flex items-center justify-center text-amber-500 mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-neu-text-heading mb-4">Our Vision</h3>
          <p className="text-neu-text font-medium">To become India's most trusted and technologically advanced portal for government sector opportunities.</p>
        </div>

        <div className="rounded-3xl shadow-neu-flat p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 shadow-neu-pressed rounded-full flex items-center justify-center text-green-500 mb-6">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-neu-text-heading mb-4">Community First</h3>
          <p className="text-neu-text font-medium">Built by students, for students. We prioritize your time and user experience above everything else.</p>
        </div>
      </div>
    </div>
  );
}
