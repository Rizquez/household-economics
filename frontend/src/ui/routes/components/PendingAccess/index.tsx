import { UserButton } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHouseLock } from "@fortawesome/free-solid-svg-icons";

const PendingAccess = () => (
  <div className="flex h-full items-center justify-center bg-background p-8">
    <section className="card flex w-full max-w-xl flex-col items-center gap-6 bg-surface p-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FontAwesomeIcon icon={faHouseLock} className="text-4xl" />
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
          Access pending
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-text-primary">
          Your registration is under review
        </h1>

        <p className="mt-3 text-text-secondary">
          Your account has been created successfully. Access to Household
          Economics is pending approval. You will receive a response soon.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-background px-5 py-4 text-sm text-text-secondary">
        <FontAwesomeIcon icon={faClock} className="text-primary" />
        <span>Waiting for administrator approval.</span>
      </div>

      <UserButton />
    </section>
  </div>
);

export default PendingAccess;
