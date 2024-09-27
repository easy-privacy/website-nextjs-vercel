"use client";

import { useSearchParams } from 'next/navigation';

export default function FinalPolicyPage() {
  const searchParams = useSearchParams();
  
  const companyName = searchParams.get('companyName');
  const industry = searchParams.get('industry');
  const emailId = searchParams.get('emailId');
  const dataEntries = JSON.parse(decodeURIComponent(searchParams.get('dataEntries') || '[]'));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg text-left">
        <h1 className="text-2xl font-bold mb-6 text-center">{companyName}'s Privacy Notice</h1>
        <p className="text-lg">
          <strong>{companyName}</strong> deeply values your right to privacy and is committed to protecting your personal data in accordance with applicable law. This Privacy Notice explains how <strong>{companyName}</strong> ("us", "we", or "our") collects, uses, discloses, transfers, and otherwise processes your personal data when you use our services or interact with us.
        </p>
        <p className="mt-4 text-lg">
          Personal data has the same meaning as that under applicable law and includes information that is about you, or can identify you directly, or in relation to such data (such as indirectly, in combination with other information).
        </p>

        <div className="mt-6">
          <h2 className="text-lg mb-4">We process your personal data for the following purposes:</h2>
          <ol className="list-decimal list-inside">
            {dataEntries.map((item: any, index: any) => (
              <li key={index} className="mb-2">
                <strong>{item.data}</strong> - {item.purpose}
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-semibold mb-4 mt-6">Lawful Basis</h3>
          <p className="mb-4">
            We only process your personal data pursuant to your free, specific, informed, unconditional, and unambiguous consent provided through an affirmative act on your part. In limited cases, we may process your personal data for certain legitimate uses in accordance with applicable law.
          </p>

          <h3 className="text-xl font-semibold mb-4">Disclosure</h3>
          <p className="mb-4">We may share your personal data with third parties where necessary for the purposes specified above in this Privacy Notice. These include the following:</p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Service Providers:</strong> To third-party service providers who assist in operating our business and providing the Service, such as hosting providers, payment processors, email service providers, and customer support services.</li>
            <li><strong>Data Processors:</strong> To third-party data processors who process personal data on our behalf in accordance with our instructions and applicable data protection laws.</li>
            <li><strong>Other Authorized Recipients:</strong> To any other third parties with whom we have obtained your consent or authorization to disclose your personal data for specific purposes.</li>
            <li><strong>Marketing and Advertising Partners:</strong> To third-party marketing and advertising partners who help us market and promote our products or services, including ad networks, marketing agencies, and social media platforms.</li>
            <li><strong>Analytics Partners:</strong> To third-party analytics providers who help us analyze how our Service is used and improve its performance, including web analytics tools and data analysis firms.</li>
            <li><strong>Professional Advisors:</strong> To third-party professional advisors such as lawyers, accountants, and consultants who provide us with legal, financial, or other professional services.</li>
            <li><strong>Financial Institutions:</strong> To third-party financial institutions or payment processors for financial transactions or related services, such as processing payments or fraud prevention.</li>
            <li><strong>Government Agencies:</strong> To government agencies or public authorities as required by law or as necessary for regulatory compliance, tax reporting, or public safety purposes.</li>
            <li><strong>Merger or Acquisition:</strong> To third parties in the event of a merger, acquisition, consolidation, restructuring, or sale of assets, in which case personal data may be transferred as part of the transaction.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Your Rights</h3>
          <p className="mb-6">You have the following rights in relation to your personal data in accordance with applicable law:</p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Right to access:</strong> You have the right to access (i) a summary of your personal data which is being processed by us and the processing activities undertaken by us with respect to such personal data (ii) the identities of businesses with whom your personal data has been shared, along with a description of personal data so shared as well as (iii) any other information related to your personal data and its processing as may be prescribed.</li>
            <li><strong>Right to correction:</strong> You have the right to correct any inaccurate or misleading personal data, complete any incomplete personal data, or update any personal data.</li>
            <li><strong>Right to erasure:</strong> You have a right to erase your personal data as well as prevent the continuing disclosure of such data, unless required to be retained under applicable law or pursuant to a purpose specified in this Privacy Notice.</li>
            <li><strong>Right to nominate:</strong> You have the right to nominate, in the event of your death or incapacity, a person who may exercise your rights under applicable law.</li>
            <li><strong>Right to grievance redressal:</strong> You have the right to have readily available means of grievance redressal in respect of any failure at our end to discharge our data protection responsibilities under applicable law. We will comply with any request for grievance redressal within timeframes prescribed by the Government.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Security</h3>
          <p className="mb-6">We will take appropriate technical and organisational measures to protect the security and confidentiality of retained personal data, including implementing safeguards to prevent unauthorized access, use, or disclosure. Such measures will be commensurate with the nature of our business as well as the personal data that we collect. We will also implement reasonable security safeguards to protect your personal data against a personal data breach. We will promptly notify you in the event of a personal data breach in accordance with applicable law.</p>

          <h3 className="text-xl font-semibold mb-4">Transfer</h3>
          <p className="mb-6">We will only transfer your personal data in accordance with applicable law, and where the recipient maintains the same or better level of protection as required under the Digital Personal Data Protection Act 2023.</p>

          <h3 className="text-xl font-semibold mb-4">Retention</h3>
          <p className="mb-6">We will only retain personal data for as long as necessary to fulfill the purposes for which it was collected as specified in this Privacy Notice, or as required by law. We will minimize the retention of personal data to the extent possible.</p>

          <h3 className="text-xl font-semibold mb-4">Updates</h3>
          <p className="mb-6">We reserve the right to update or change our Privacy Notice at any time, and you should check this Privacy Notice periodically. Your continued use of the Service after we post any modifications to the Privacy Notice on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Notice.</p>

          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-6">
            If you have any questions about this Privacy Notice, or if you seek to exercise any of your rights available under applicable law, such as your ability to withdraw your consent, as well as exercise your right to seek readily available grievance redressal, please contact us at <strong>{emailId}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
