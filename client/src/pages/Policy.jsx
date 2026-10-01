import React, { useEffect } from "react";
import policypage from "../css/Policy.module.css";
import { Helmet } from "react-helmet-async";

const Policy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

      {/* SEO Content for this Page  */}
      <Helmet>
        <title>
          Our Policy | IT Training & Certifications | Study Grinder
        </title>
        <meta
          name="description"
          content="Learn about our Privacy Policy, Terms & Conditions, refund policy, and other terms. This page addresses all your questions. Reach out to Study Grinder and begin your IT growth journey today!"
        />
        <link
          rel="canonical"
          href="https://www.studygrinder.com/policies"
        />
      </Helmet>


      <div className={policypage.container}>
        <div className={policypage.wrapper}>
          <h1
            className={policypage.heading}
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "bold",
              fontSize: "40px",
              color: "#2c2d30",
            }}
          >
            Armx-Indecodex - Privacy Policy
          </h1>
          <h2 className={policypage.heading}>RETURNS</h2>
          <p className={policypage.paragraph}>
            Study Grinder provides certificates for various courses,
            including PMP, Azure, and many more. These courses are designed to
            ensure that working professionals can attend and complete them
            within their contexts and limitations in time. The courses are
            interactive and rich with activities, discussions, and field visits.
            Participants are issued Certificates of Participation given
            attendance, participation, and completion of assignments. <br />{" "}
            <br /> Regarding our return policy, we offer a 7-day money-back
            guarantee. If you are not satisfied with the course, you can raise a
            refund request within 7 days of purchase. However, please note that
            the money-back guarantee is void if you have accessed more than 25%
            of the course content or attended online classes for more than one
            day. Additionally, if you download the E-Book for the course, the
            money-back guarantee will be void. Any refund request beyond 7 days
            of purchasing the course will not be accepted and no refund will be
            provided. Refunds will be processed within 10 working days after the
            refund request is approved.
          </p>
          <h2 className={policypage.heading}>Exchanges</h2>
          <p className={policypage.paragraph}>
            The fastest way to ensure you get what you want is to return the
            course you have, and once the return is accepted, make a separate
            purchase for the new item.
          </p>
          <h2 className={policypage.heading}>Refunds</h2>
          <p className={policypage.paragraph}>
            Once we receive and inspect your return, we will notify you
            regarding the status of your refund. If approved, your refund will
            be processed automatically on your original payment method within 10
            business days. Please note that it may take some time for your bank
            or credit card company to process and post the refund. If more than
            15 business days have passed since we approved your return, please
            contact us at register@studygrinder.com. For more information, visit
            <a href="https://www.studygrinder.com"> https://www.studygrinder.com</a>, where we offer a range of courses, including PMP,
            Azure, and many more, and provide certificates upon completion.
          </p>
        </div>
      </div>
    </>
  );
};

export default Policy;