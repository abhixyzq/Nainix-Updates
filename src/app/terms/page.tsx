export const metadata = {
  title: 'Terms and Conditions | Nainix Updates',
  description: 'Terms and Conditions for Nainix Updates.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <div className="rounded-3xl shadow-neu-flat p-8 md:p-16">
        <h1 className="text-4xl font-extrabold text-neu-text-heading mb-6 tracking-tight">
          Terms and Conditions
        </h1>
        <div className="w-16 h-2 bg-neu-accent rounded-full mb-10 shadow-neu-flat-sm"></div>
        
        <div className="space-y-8 text-neu-text font-medium leading-relaxed">
          <section className="shadow-neu-pressed rounded-2xl p-6 md:p-8">
            <p>
              Welcome to Nainix Updates! These terms and conditions outline the rules and regulations for the use of our Website, located at update.nainix.me.
            </p>
            <p className="mt-4">
              By accessing this website we assume you accept these terms and conditions. Do not continue to use Nainix Updates if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">License</h2>
            <p>
              Unless otherwise stated, Nainix Updates and/or its licensors own the intellectual property rights for all material on Nainix Updates. All intellectual property rights are reserved. You may access this from Nainix Updates for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Republish material from Nainix Updates without proper attribution</li>
              <li>Sell, rent or sub-license material from Nainix Updates</li>
              <li>Reproduce, duplicate or copy material from Nainix Updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">User Content</h2>
            <p>
              Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Nainix Updates does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Nainix Updates, its agents and/or affiliates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Reservation of Rights</h2>
            <p>
              We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
