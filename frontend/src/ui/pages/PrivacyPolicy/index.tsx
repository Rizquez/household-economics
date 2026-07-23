import Button from "@/ui/components/Button";
import { paths } from "@/ui/routes/paths";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const CONTACT_EMAIL = "pedro.rizquez.94@hotmail.com";

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
            Last updated: July 2026
          </p>
        </div>

        <Button
          onClick={() => navigate(-1)}
          variant="background"
          className="flex h-12 w-12 items-center justify-center transition-colors hover:text-primary"
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} className="text-2xl" />
        </Button>
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
            processing of your data, you can contact the project administrator
            at <span className="font-semibold">{CONTACT_EMAIL}</span>.
          </p>

          <h2 className="text-lg font-semibold pt-8">2. Account information</h2>

          <p>
            The application uses Clerk for sign-in and account authentication;
            the app stores the account information needed to identify the user
            inside the application: clerk user id, email address, name, access
            status and the family associated with the account when access has
            been granted.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            3. Financial and family information
          </h2>

          <p>The app allows authorized users to enter and manage:</p>

          <ul className="list-disc pl-6">
            <li>Family name and family currency preference.</li>
            <li>Family member names, email addresses and roles.</li>
            <li>Family invitations sent to an email address.</li>
            <li>
              Income records, including name, date, amount, category and
              optional notes.
            </li>
            <li>
              Expense records, including name, date, amount, category, optional
              notes and itemized products when entered.
            </li>
            <li>Financial categories.</li>
            <li>Annual budget amounts by month and category.</li>
            <li>Monthly savings and investment allocations.</li>
          </ul>

          <h2 className="text-lg font-semibold pt-8">
            4. How the information is used
          </h2>

          <p>This information is used to:</p>

          <ul className="list-disc pl-6">
            <li>Authenticate users and control access to the private area.</li>
            <li>Manage family membership and invitations.</li>
            <li>Record, update, display and delete financial entries.</li>
            <li>
              Prepare budgets, monthly tracking views, dashboard summaries and
              savings or investment views.
            </li>
            <li>
              Apply the selected family currency when showing financial
              information.
            </li>
          </ul>

          <p>
            The financial information entered in the app is used to provide the
            household financial management features of the application; it is
            not sold to third parties and is not used for advertising or
            profiling.
          </p>

          <h2 className="text-lg font-semibold pt-8">5. Family sharing</h2>

          <ul className="list-disc pl-6">
            <li>Financial information belongs to a family group.</li>
            <li>
              Authorized members of the same family can access the information
              associated with that family.
            </li>
            <li>
              The family owner can invite new members and remove existing
              members.
            </li>
          </ul>

          <h2 className="text-lg font-semibold pt-8">6. External providers</h2>

          <p>
            The project currently includes the following external providers:
          </p>

          <h3 className="font-semibold pt-2">Clerk</h3>
          <p>
            Clerk is used for authentication and user identity; the backend also
            checks Clerk tokens and loads Clerk user information needed to
            create or identify the app user.
          </p>
          <a
            href="https://clerk.com/legal/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span>Clerk Privacy Policy</span>
            <FontAwesomeIcon icon={paths.privacypolicy.icon} />
          </a>

          <h3 className="font-semibold pt-2">Render</h3>
          <p>
            The backend includes a Render production environment configuration;
            when this environment is used, Render provides the backend runtime.
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

          <h3 className="font-semibold pt-2">EmailJS</h3>
          <p>
            EmailJS is used by the backend to send access request emails and
            family invitation emails.
          </p>
          <a
            href="https://www.emailjs.com/legal/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span>EmailJS Privacy Policy</span>
            <FontAwesomeIcon icon={paths.privacypolicy.icon} />
          </a>

          <h3 className="font-semibold pt-2">Google Fonts</h3>
          <p>The frontend loads the Inter font from Google Fonts.</p>
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
            7. Security and retention
          </h2>

          <p>
            Access to the private area requires authentication and approved
            access; the application uses the current user&apos;s family to load
            and manage family financial information.
          </p>

          <p>
            No automatic deletion period is defined in the application; data may
            remain stored while it is needed to provide the app features, unless
            it is changed or removed through the available app functions or a
            request to the administrator is reviewed and handled.
          </p>

          <h2 className="text-lg font-semibold pt-8">8. User rights</h2>

          <p>
            You can contact the project administrator to ask about the data
            associated with your account or family, or to request that it be
            reviewed, corrected, or deleted where the current application and
            legal obligations allow it.
          </p>

          <h2 className="text-lg font-semibold pt-8">
            9. Changes to this policy
          </h2>

          <p>
            This policy may be updated when the application changes, the date at
            the top of this page indicates when it was last updated.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
