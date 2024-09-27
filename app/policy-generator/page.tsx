"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initialData } from './initialData';
import { Plus, Shield, Trash2 } from "lucide-react";
import { industryMapping } from "../industryMapping";

export default function PolicyGeneratorPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [dataEntries, setDataEntries] = useState<{ data: string; purpose: string; }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const company = query.get('companyName');
    const selectedIndustry = query.get('industry');

    if (company) setCompanyName(company);
    if (selectedIndustry) {
      setIndustry(selectedIndustry);
      setDataEntries(initialData[selectedIndustry as keyof typeof initialData] || []);
    }
  }, []);

  const handleInputChange = (index: number, field: 'data' | 'purpose', value: string) => {
    const newDataEntries = [...dataEntries];
    newDataEntries[index][field] = value;
    setDataEntries(newDataEntries);
  };

  const handleAddRow = () => {
    setDataEntries([...dataEntries, { data: '', purpose: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    const newDataEntries = dataEntries.filter((_, i) => i !== index);
    setDataEntries(newDataEntries);
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndustryKey = e.target.value;
    setIndustry(selectedIndustryKey);
    setDataEntries(initialData[selectedIndustryKey as keyof typeof initialData] || []);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  const handleGeneratePolicy = () => {
    // Clear previous errors
    setErrorMessage("");
  
    // Validation checks
    if (!companyName) {
      setErrorMessage("Company name cannot be empty.");
      return;
    }
    if (!industry) {
      setErrorMessage("Please select an industry.");
      return;
    }

    if (!emailId) {
        setErrorMessage("Please provide an email address.");
        return;
    }

    if (!validateEmail(emailId)){
        setErrorMessage("Please provide a valid email address.");
        return;
    }
  
    for (let i = 0; i < dataEntries.length; i++) {
      if (!dataEntries[i].data) {
        setErrorMessage(`Row ${i + 1}: Data cannot be empty.`);
        return;
      }
      if (!dataEntries[i].purpose) {
        setErrorMessage(`Row ${i + 1}: Purpose cannot be empty.`);
        return;
      }
    }
  
    // Proceed with policy generation if no errors
    // console.log('Generate Policy Document', { companyName, industry, dataEntries });
    setErrorMessage(""); // Clear the error message after successful validation

    router.push(`/final-policy?companyName=${encodeURIComponent(companyName)}&industry=${encodeURIComponent(industry)}&emailId=${encodeURIComponent(emailId)}&dataEntries=${encodeURIComponent(JSON.stringify(dataEntries))}`);
};
  

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-200">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push('/')}
        >
        <Shield className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-blue-600">Easy Privacy</span>
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => router.push('/')} 
            className="text-blue-600 hover:text-blue-800"
          >
            Home
          </button>
          <button 
            onClick={() => router.push('/faqs')} 
            className="text-blue-600 hover:text-blue-800"
          >
            FAQs
          </button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 md:px-6 mx-auto py-12">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</label>
              <input 
                id="companyName" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium text-gray-700">Select an industry</label>
            <select 
                id="industry" 
                value={industry}
                onChange={handleIndustryChange}
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
            <div className="space-y-2">
              <label htmlFor="emailId" className="text-sm font-medium text-gray-700">Email ID</label>
              <input 
                id="emailId" 
                value={emailId} 
                onChange={(e) => setEmailId(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <table className="min-w-full mt-6 bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Data</th>
                  <th className="py-2 px-4 border-b">Purpose</th>
                  <th className="border-b" /> {/* Empty header to align with actions column */}
                </tr>
              </thead>
              <tbody>
                {dataEntries.map((entry, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <input 
                        type="text" 
                        value={entry.data} 
                        onChange={(e) => handleInputChange(index, 'data', e.target.value)} 
                        className="w-full px-2 border border-gray-300 rounded-md h-12" // Two-row height
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                    <textarea
                        value={entry.purpose}
                        onChange={(e) => handleInputChange(index, 'purpose', e.target.value)}
                        className="w-full px-2 border border-gray-300 rounded-md h-12 resize-none overflow-hidden" // Two-row height with text wrapping
                        rows={2} // Two-row height
                    />
                    </td>
                    <td className="py-1 px-1 border-b text-center">
                      <button 
                        onClick={() => handleDeleteRow(index)} 
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}>
                    <button 
                      onClick={handleAddRow} 
                      className="flex items-center text-blue-600 hover:text-blue-800 mt-4 ml-2 mb-4" // Bottom padding
                    >
                      <Plus className="mr-2" /> Add Row
                    </button>
                  </td>
                  <td></td> {/* Align with actions column */}
                </tr>
              </tbody>
            </table>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button 
              onClick={handleGeneratePolicy} 
              className="mt-6 px-6 py-2 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-green-700 transition-colors" // Slightly bigger button
            >
              Generate Policy Document
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
