const PrivacyPolicyPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-4 text-foreground">
      <div className="w-full max-w-4xl rounded-lg p-6">
        <h1 className="mb-6 text-center text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-center leading-relaxed text-foreground">
          At <span className="font-semibold">[Your Store Name]</span>, we are
          committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, and protect your personal information when you use
          our website and services.
        </p>

        <div className="mt-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              We may collect personal information such as your name, email
              address, shipping address, and payment details when you make a
              purchase on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              2. How We Use Your Information
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              We use your personal information to process orders, manage your
              account, and provide you with customer support. We may also use
              your information to send you promotional offers and updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              3. Sharing Your Information
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              We do not sell or share your personal information with third
              parties, except as necessary to fulfill your orders (e.g., with
              shipping companies) or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              4. Data Security
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              We take appropriate measures to protect your personal information
              against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the internet
              is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              5. Your Rights
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              You have the right to access, update, or delete your personal
              information. If you would like to exercise any of these rights,
              please contact us at{" "}
              <span className="font-semibold">[Your Contact Information]</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              6. Changes to this Policy
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and the updated policy will take
              effect immediately.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
