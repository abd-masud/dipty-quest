import Link from "next/link";

export const RefundPolicyInfo = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 md:py-10 py-5">
      <div>
        <p className="mb-5">
          Before using the{" "}
          <Link
            className="text-[#0079C1] hover:text-[#FAB616] transition duration-300"
            href="/"
          >
            diptyquest.com
          </Link>{" "}
          (&quot;website,&quot; &quot;support&quot;), kindly carefully review
          this refund policy (&quot;refund policy&quot;).
        </p>
        <p className="mb-5">
          Payment gateways using SSL encryption handle all purchases of
          intangible items, PDF downloads, resource material, and package
          transactions. Use of all kinds of credit cards and debit cards across
          multiple countries and your information is not retained throughout
          this procedure; these payment gateways are safe and secure.
        </p>
        <p className="mb-5">
          Your purchase is a digital good or package, so it is considered
          &quot;used&quot; following the transaction; all transactions made on{" "}
          <Link
            className="text-[#0079C1] hover:text-[#FAB616] transition duration-300"
            href="/"
          >
            diptyquest.com
          </Link>{" "}
          are non-refundable or exchangeable. The items and packages offered
          here are intangible, hence there is a strong no-refund policy.
        </p>
        <p className="mb-5">
          Dipty Quest upholds the right to change any information—including but
          not limited to pricing, technical specifications, conditions of
          purchase, and product or service offers—without prior notice.
        </p>
      </div>
    </main>
  );
};
