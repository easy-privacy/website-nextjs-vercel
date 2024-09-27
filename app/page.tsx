"use client";

import Link from "next/link"
import { ArrowRight, Binoculars, Bot, CheckCheck, Shield } from "lucide-react"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { industryMapping } from "./industryMapping";

export default function LandingPage() {

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();


  const handleGeneratePolicy = () => {
    if (!companyName || !industry) {
      setErrorMessage("Please enter company name and select an industry");
    } else {
      setErrorMessage(""); // Clear any existing error message
      // Redirect to the new page with the user input
      router.push(`/policy-generator?companyName=${encodeURIComponent(companyName)}&industry=${encodeURIComponent(industry)}`);
    }
  };
    
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200">
        <Link className="flex items-center justify-center" href="/">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-blue-600">Easy Privacy</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="#generator">
            Policy Generator
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/faqs">
            FAQs
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-800">
                  Simplify Your Privacy Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Your One-Stop Solution for Privacy Compliance. Get started in minutes. Dependable and hassle-free.
                </p>
              </div>
              <div className="space-x-4">
              <Link href="#generator" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                Learn More
              </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-blue-800">Why Choose Easy Privacy?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
                <Bot className="h-12 w-12 text-blue-600 mb-2" />
                <h3 className="text-xl font-bold text-gray-800">DPO Assistance</h3>
                <p className="text-gray-600 text-center">Generate your privacy policy in seconds and have a chatbot to answer all your questions related to DPDP Act</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
                <CheckCheck className="h-12 w-12 text-blue-600 mb-2" />
                <h3 className="text-xl font-bold text-gray-800">Consent and Right Management</h3>
                <p className="text-gray-600 text-center">Handle your consent layer and service your DSR requests + audit logs.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
                <Binoculars className="h-12 w-12 text-blue-600 mb-2" />
                <h3 className="text-xl font-bold text-gray-800">Data Discovery</h3>
                <p className="text-gray-600 text-center">Seamlessly see where is all your user data across structured and unstructured data + old and new data</p>
              </div>
            </div>
          </div>
        </section>
        <section id="generator" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-blue-800">Generate Your Privacy Policy</h2>
            <div className="mx-auto max-w-md space-y-4 bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</label>
                <input id="companyName" placeholder="Enter your company name" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium text-gray-700">Select an industry</label>
              <select 
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select industry</option>
                {Object.keys(industryMapping).map((displayName) => (
                  <option key={displayName} value={industryMapping[displayName]}>
                    {displayName}
                  </option>
                ))}
              </select>
            </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <button
                onClick={handleGeneratePolicy}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-green-700 transition-colors"
              >
                Generate Policy
              </button>
            </div>
          </div>
        </section>
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-blue-800">Frequently Asked Questions</h2>
            <div className="grid gap-8 mx-auto max-w-3xl">
              <div className="space-y-2 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800">What is the DPDP Act of India?</h3>
                <p className="text-gray-600">The DPDP (Data Protection and Privacy) Act of India is a comprehensive legislation aimed at safeguarding the privacy and personal data of individuals. It outlines the responsibilities of organizations in handling personal data and the rights of individuals in relation to their data.</p>
              </div>
              <div className="space-y-2 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800">How does your service help in complying with the DPDP Act?</h3>
                <p className="text-gray-600">Our service provides an end-to-end solution for compliance with the DPDP Act. From data discovery to action items, managing your consent layer to servicing DSR requests, custom policy generation to chat assist powered by AI, and much more. Core idea is to reduce the burden of compliance on your organization to a bare minimum.</p>
              </div>
              <div className="space-y-2 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800">How frequently is the information updated?</h3>
                <p className="text-gray-600">We continuously monitor updates to the DPDP Act and other relevant regulations. Our service ensures that your privacy policy and chatbot are always up-to-date with the latest legal requirements.</p>
              </div>
              <div id="contact" className="text-center">
                <Link
                  href="/faqs"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  See More FAQs
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-800">
                Ready to Secure Your Website&apos;s Privacy?
              </h2>
              <div id="contact" className="space-x-4">
                <Link href="mailto:easyprivacyindia@gmail.com" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  Email us at easyprivacyindia@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 border-t border-gray-200">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2024 Easy Privacy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}