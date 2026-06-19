export const metadata = {
  title: 'Disclaimer | Nainix Updates',
  description: 'Disclaimer for Nainix Updates.',
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <div className="rounded-3xl shadow-neu-flat p-8 md:p-16">
        <h1 className="text-4xl font-extrabold text-neu-text-heading mb-6 tracking-tight">
          Disclaimer
        </h1>
        <div className="w-16 h-2 bg-neu-accent rounded-full mb-10 shadow-neu-flat-sm"></div>
        
        <div className="space-y-8 text-neu-text font-medium leading-relaxed">
          <section className="shadow-neu-pressed rounded-2xl p-6 md:p-8 bg-red-500/5 border border-red-500/10">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Not a Government Entity</h2>
            <p>
              <strong>Nainix Updates (nainix.me) is an independent, privately-owned website and is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with any Government organization, agency, or department.</strong>
            </p>
            <p className="mt-4">
              All the information provided on this website is collected from various official websites, news portals, and employment newspapers solely for educational and informational purposes to help students and job seekers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Accuracy of Information</h2>
            <p>
              While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </p>
            <p className="mt-4">
              We highly recommend our users to always verify the information from the official websites of the respective organizations before making any decisions or taking any actions based on the information provided on our portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">External Links Disclaimer</h2>
            <p>
              Through this website, you are able to link to other websites which are not under the control of Nainix Updates. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Consent</h2>
            <p>
              By using our website, you hereby consent to our disclaimer and agree to its terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
