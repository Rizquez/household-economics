import { paths } from "@/ui/routes/paths";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const PrivacyPolicy = () => {
  const linkClassName =
    "inline-flex w-fit items-center text-sm text-primary transition-colors hover:underline py-3";
  const navigate = useNavigate();

  return (
    <section className="card flex h-full flex-col overflow-hidden bg-surface p-20">
      <header className="flex items-start justify-between border-b border-background pb-2">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">
            {paths.privacypolicy.label}
          </h1>
          <p className="text-lg text-text-secondary pt-2">
            Last updated: June 2026
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-background hover:text-primary cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} className="text-2xl" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="flex flex-col gap-2 text-sm leading-6 text-text-primary">
          <h2 className="text-lg font-semibold">1. Site administrators</h2>

          <p>
            This app is managed by{" "}
            <span className="font-semibold">Pedro Rizquez</span> for personal
            and household financial management purposes.
          </p>

          <p>
            If you have any questions regarding this privacy policy or the
            processing of your data, you can contact the project managers
            through the channels provided in the app.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            2. Information collected
          </h2>

          <p>
            To use certain features of the app, you may need to create a user
            account.
          </p>

          <p>
            During the registration and authentication process, the following
            data may be collected:
          </p>

          <ul className="list-disc pl-6">
            <li>Username.</li>
            <li>Email address.</li>
            <li>Technical identifiers associated with authentication.</li>
            <li>
              Information necessary to verify your identity and allow secure
              access to the app.
            </li>
          </ul>

          <p>
            In addition, the app allows users to enter information related to
            managing their personal finances, including categories, budgets,
            income, expenses, savings goals, or other financial data voluntarily
            provided by the user.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            3. Purpose of data processing
          </h2>

          <p>The data collected is used exclusively to:</p>

          <ul className="list-disc pl-6">
            <li>Create and manage user accounts.</li>
            <li>
              Enable the initiation and maintenance of authenticated sessions.
            </li>
            <li>
              Verify credentials and ensure secure access to the application.
            </li>
            <li>
              Provide the technical features necessary for the proper
              functioning of the service.
            </li>
            <li>
              Manage, store, and display the financial information entered by
              each user.
            </li>
          </ul>

          <p>
            The financial information entered by the user is used solely to
            provide the financial management features offered by the application
            and is not used for commercial analysis, advertising, profiling, or
            disclosure to third parties.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            4. Third-party services
          </h2>

          <p>
            The application uses services provided by third parties for certain
            technical functions and infrastructure.
          </p>

          <h3 className="font-semibold pt-2">Auth0</h3>
          <p>
            The authentication and identity management process is handled by
            Auth0.
          </p>
          <p>
            When using the registration and login mechanisms, certain data may
            be processed by Auth0 in accordance with its own terms and privacy
            policies.
          </p>
          <a
            href="https://www.okta.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span>Auth0 Privacy Policy</span>
            <FontAwesomeIcon icon={paths.privacypolicy.icon} />
          </a>

          <h3 className="font-semibold pt-2">Render</h3>
          <p>The app&apos;s backend infrastructure is hosted by Render.</p>
          <p>
            Certain technical information related to the operation of the
            service, access logs, or infrastructure metrics may be processed by
            Render in accordance with its own policies.
          </p>
          <a
            href="https://render.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span>Render Privacy Policy</span>
            <FontAwesomeIcon icon={paths.privacypolicy.icon} />
          </a>

          <h3 className="font-semibold pt-2">Netlify</h3>
          <p>The application may be hosted and distributed via Netlify.</p>
          <p>
            As an infrastructure and web hosting provider, Netlify may process
            certain technical information necessary for the provision of the
            service, including IP addresses, access logs, browser information,
            and metrics related to the platform&apos;s performance and security.
          </p>
          <a
            href="https://www.netlify.com/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span>Netlify Privacy Policy</span>
            <FontAwesomeIcon icon={paths.privacypolicy.icon} />
          </a>

          <h3 className="font-semibold pt-2">Google fonts</h3>
          <p>The application uses fonts provided by Google Fonts.</p>
          <p>
            When loading these fonts, Google may receive technical information
            such as the IP address or data related to the resource request.
          </p>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span>Google Privacy Policy</span>
            <FontAwesomeIcon icon={paths.privacypolicy.icon} />
          </a>

          <h2 className="text-lg font-semibold pt-8">
            5. Responsibility for external services
          </h2>

          <p>
            The third-party services mentioned above operate under their own
            privacy policies and terms of use.
          </p>

          <p>
            The controller of this application does not control nor is it
            responsible for the data processing carried out directly by those
            providers outside the scope of the application&apos;s operation.
          </p>

          <p>
            We recommend consulting their respective privacy policies for
            detailed information on how they handle personal data.
          </p>

          <h2 className="text-lg font-semibold pt-8">6. Security</h2>

          <p>
            Reasonable measures are taken to protect the information managed by
            the application and to limit access solely to the processes
            necessary for its operation.
          </p>

          <p>
            However, no system connected to the Internet can guarantee absolute
            security.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            7. Links to external sites
          </h2>

          <p>The app may contain links to external websites.</p>

          <p>
            We assume no responsibility for the privacy practices, content, or
            services offered by such third-party sites.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            8. Changes to this policy
          </h2>

          <p>
            This policy may be updated periodically to reflect legal, technical,
            or functional changes to the app.
          </p>

          <p>
            We recommend that you check this page from time to time to stay
            informed about any changes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
