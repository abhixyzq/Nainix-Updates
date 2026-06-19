export const metadata = {
  title: 'Privacy Policy | Nainix Updates',
  description: 'Privacy Policy for Nainix Updates.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <div className="rounded-3xl shadow-neu-flat p-8 md:p-16">
        <h1 className="text-4xl font-extrabold text-neu-text-heading mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <div className="w-16 h-2 bg-neu-accent rounded-full mb-10 shadow-neu-flat-sm"></div>
        
        <div className="space-y-8 text-neu-text font-medium leading-relaxed">
          <section className="shadow-neu-pressed rounded-2xl p-6 md:p-8">
            <p>
              At <strong>Nainix Updates</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Nainix Updates and how we use it.
            </p>
            <p className="mt-4">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Log Files</h2>
            <p>
              Nainix Updates follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Cookies and Web Beacons</h2>
            <p>
              Like any other website, Nainix Updates uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
          </section>

          <section className="shadow-neu-pressed rounded-2xl p-6 md:p-8 bg-neu-accent/5">
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-neu-accent font-bold hover:underline">https://policies.google.com/technologies/ads</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neu-text-heading mb-4">Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
