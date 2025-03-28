"use client";

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditableField from './EditableField';
import { calculateFinancialSummary } from '@/utils/calculations';

const FinancialDashboard = () => {
  // Initial state data
  const [finances, setFinances] = useState({
    companyName: "Flexible Functions AI",
    asOfDate: "March 22, 2025",
    investments: [
      { id: uuidv4(), name: "Cash Investment (Suwik)", amount: 150000 },
      { id: uuidv4(), name: "Goodwill Investment (Silver)", amount: 150000 }
    ],
    expenses: [
      { id: uuidv4(), name: "Claude Pro", amount: 77000 },
      { id: uuidv4(), name: "Google Workspace", amount: 60000 },
      { id: uuidv4(), name: "Domain (flexiblefunctions.com)", amount: 67000, isAsset: true, prepaid: true }
    ],
    assets: [],
    notes: [
      { id: uuidv4(), title: "Business Operations", content: "Flexible Functions AI is a startup AI company that has recently been established." },
      { id: uuidv4(), title: "Basis of Preparation", content: "These financial statements have been prepared on a cash basis rather than accrual basis due to the early stage of the business." },
      { id: uuidv4(), title: "Goodwill", content: "The UGX 150,000 goodwill contribution from Silver Rubanza represents intangible value contributed to the business. This follows the accounting principle demonstrated in William Ackman's lemonade stand example." },
      { id: uuidv4(), title: "Prepaid Expenses", content: "The domain registration has been recorded as a prepaid asset as it has a 1-year useful life." },
      { id: uuidv4(), title: "Revenue", content: "The company has not yet generated revenue as it is in the startup phase." }
    ]
  });

  // Calculate summary values
  const summary = calculateFinancialSummary(finances);

  // Handlers for editing
  const updateCompanyInfo = (field, value) => {
    setFinances(prev => ({ ...prev, [field]: value }));
  };

  const updateInvestment = (id, field, value) => {
    setFinances(prev => ({
      ...prev,
      investments: prev.investments.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addInvestment = () => {
    setFinances(prev => ({
      ...prev,
      investments: [...prev.investments, { id: uuidv4(), name: "New Investment", amount: 0 }]
    }));
  };

  const removeInvestment = (id) => {
    setFinances(prev => ({
      ...prev,
      investments: prev.investments.filter(item => item.id !== id)
    }));
  };

  const updateExpense = (id, field, value) => {
    setFinances(prev => ({
      ...prev,
      expenses: prev.expenses.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addExpense = () => {
    setFinances(prev => ({
      ...prev,
      expenses: [...prev.expenses, { id: uuidv4(), name: "New Expense", amount: 0, isAsset: false, prepaid: false }]
    }));
  };

  const removeExpense = (id) => {
    setFinances(prev => ({
      ...prev,
      expenses: prev.expenses.filter(item => item.id !== id)
    }));
  };

  const updateNote = (id, field, value) => {
    setFinances(prev => ({
      ...prev,
      notes: prev.notes.map((note) => 
        note.id === id ? { ...note, [field]: value } : note
      )
    }));
  };

  const addNote = () => {
    setFinances(prev => ({
      ...prev,
      notes: [...prev.notes, { id: uuidv4(), title: "New Note", content: "Enter note content here" }]
    }));
  };

  const removeNote = (id) => {
    setFinances(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== id)
    }));
  };

  const toggleExpenseProperty = (id, property) => {
    setFinances(prev => ({
      ...prev,
      expenses: prev.expenses.map(expense => 
        expense.id === id ? { ...expense, [property]: !expense[property] } : expense
      )
    }));
  };

  // Save to localStorage (optional)
  useEffect(() => {
    localStorage.setItem('financialData', JSON.stringify(finances));
  }, [finances]);

  // Load from localStorage on mount (optional)
  useEffect(() => {
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
      try {
        setFinances(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved financial data", e);
      }
    }
  }, []);

  return (
    <div className="bg-gray-50 p-6 min-h-screen font-sans relative">
      {/* Control Panel */}
      <div className="fixed top-4 right-4 flex space-x-2 print:hidden">
        <button 
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Header */}
      <div className="mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-2">
          <EditableField 
            value={finances.companyName} 
            onChange={(value) => updateCompanyInfo('companyName', value)}
            className="text-center text-white"
          />
        </h1>
        <h2 className="text-xl">Financial Statements - 
          <EditableField 
            value={finances.asOfDate} 
            onChange={(value) => updateCompanyInfo('asOfDate', value)}
            className="text-center text-white inline ml-1"
          />
        </h2>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Investments</p>
            <p className="text-2xl font-bold text-blue-700">UGX {summary.totalInvestments.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Current Cash</p>
            <p className="text-2xl font-bold text-green-700">UGX {summary.cash.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-700">UGX {summary.totalExpenses.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Balance Sheet */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Balance Sheet</h2>
          <h3 className="text-sm text-gray-500 mb-4">As of {finances.asOfDate}</h3>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-blue-800">Assets</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-700">Current Assets:</div>
              <div className="text-right"></div>
              
              <div className="text-gray-700 pl-4">Cash</div>
              <div className="text-right">UGX {summary.cash.toLocaleString()}</div>
              
              <div className="text-gray-700">Non-Current Assets:</div>
              <div className="text-right"></div>
              
              {finances.expenses
                .filter(expense => expense.isAsset && expense.prepaid)
                .map(asset => (
                  <React.Fragment key={asset.id}>
                    <div className="text-gray-700 pl-4">
                      <EditableField 
                        value={asset.name} 
                        onChange={(value) => updateExpense(asset.id, 'name', value)}
                        className="inline-block"
                      /> (prepaid)
                    </div>
                    <div className="text-right">
                      UGX <EditableField 
                        value={asset.amount} 
                        onChange={(value) => updateExpense(asset.id, 'amount', value)}
                        type="number"
                        className="inline-block text-right"
                      />
                    </div>
                  </React.Fragment>
                ))
              }
              
              <div className="text-gray-700 pl-4">Goodwill</div>
              <div className="text-right">UGX {summary.goodwill.toLocaleString()}</div>
              
              <div className="font-bold text-blue-800 border-t pt-2">Total Assets</div>
              <div className="text-right font-bold border-t pt-2">UGX {summary.totalAssets.toLocaleString()}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2 text-blue-800">Liabilities & Equity</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-700">Current Liabilities:</div>
              <div className="text-right"></div>
              
              <div className="text-gray-700 pl-4">Accounts Payable</div>
              <div className="text-right">UGX 0</div>
              
              <div className="text-gray-700">Equity:</div>
              <div className="text-right"></div>
              
              <div className="text-gray-700 pl-4">Contributed Capital</div>
              <div className="text-right">UGX {summary.contributedCapital.toLocaleString()}</div>
              
              <div className="text-gray-700 pl-4">Contributed Goodwill</div>
              <div className="text-right">UGX {summary.contributedGoodwill.toLocaleString()}</div>
              
              <div className="text-gray-700 pl-4">Retained Earnings</div>
              <div className="text-right">UGX {summary.retainedEarnings.toLocaleString()}</div>
              
              <div className="font-bold text-blue-800 border-t pt-2">Total Liabilities & Equity</div>
              <div className="text-right font-bold border-t pt-2">UGX {summary.totalLiabilitiesEquity.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Income & Cash Flow */}
        <div className="grid grid-cols-1 gap-6">
          {/* Income Statement */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Income Statement</h2>
            <h3 className="text-sm text-gray-500 mb-4">For the period ending {finances.asOfDate}</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-700 font-bold">Revenue</div>
              <div className="text-right">UGX 0</div>
              
              <div className="text-gray-700 font-bold mt-2">Expenses:</div>
              <div className="text-right"></div>
              
              {finances.expenses
                .filter(expense => !expense.isAsset)
                .map(expense => (
                  <React.Fragment key={expense.id}>
                    <div className="text-gray-700 pl-4 flex items-center">
                      <button 
                        onClick={() => removeExpense(expense.id)}
                        className="text-red-500 mr-2 text-xs hover:text-red-700"
                        title="Remove expense"
                      >
                        ×
                      </button>
                      <EditableField 
                        value={expense.name} 
                        onChange={(value) => updateExpense(expense.id, 'name', value)}
                      />
                      <button 
                        onClick={() => toggleExpenseProperty(expense.id, 'isAsset')}
                        className="ml-2 text-xs px-1 bg-blue-100 rounded hover:bg-blue-200"
                        title="Toggle as asset"
                      >
                        →Asset
                      </button>
                    </div>
                    <div className="text-right">
                      UGX <EditableField 
                        value={expense.amount} 
                        onChange={(value) => updateExpense(expense.id, 'amount', value)}
                        type="number"
                        className="inline-block text-right"
                      />
                    </div>
                  </React.Fragment>
                ))
              }
              
              <div className="col-span-2 pl-4 text-blue-600 text-sm cursor-pointer hover:text-blue-800" onClick={addExpense}>
                + Add Expense
              </div>
              
              <div className="text-gray-700 font-bold border-t pt-2">Total Expenses</div>
              <div className="text-right font-bold border-t pt-2">UGX {summary.operatingExpenses.toLocaleString()}</div>
              
              <div className="text-red-700 font-bold border-t pt-2">Net Income (Loss)</div>
              <div className="text-right font-bold border-t pt-2 text-red-700">(UGX {summary.operatingExpenses.toLocaleString()})</div>
            </div>
          </div>

          {/* Cash Flow Statement */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Cash Flow Statement</h2>
            <h3 className="text-sm text-gray-500 mb-4">For the period ending {finances.asOfDate}</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-700 font-bold">Operating Activities:</div>
              <div className="text-right"></div>
              
              <div className="text-gray-700 pl-4">Net Income (Loss)</div>
              <div className="text-right">(UGX {summary.operatingExpenses.toLocaleString()})</div>
              
              <div className="text-gray-700 font-bold mt-2">Investing Activities:</div>
              <div className="text-right"></div>
              
              {finances.expenses
                .filter(expense => expense.isAsset)
                .map(expense => (
                  <React.Fragment key={expense.id}>
                    <div className="text-gray-700 pl-4">Purchase of {expense.name}</div>
                    <div className="text-right">(UGX {expense.amount.toLocaleString()})</div>
                  </React.Fragment>
                ))
              }
              
              <div className="text-gray-700 font-bold mt-2">Financing Activities:</div>
              <div className="text-right"></div>
              
              {finances.investments.map(investment => (
                <React.Fragment key={investment.id}>
                  <div className="text-gray-700 pl-4 flex items-center">
                    <button 
                      onClick={() => removeInvestment(investment.id)}
                      className="text-red-500 mr-2 text-xs hover:text-red-700"
                      title="Remove investment"
                    >
                      ×
                    </button>
                    <EditableField 
                      value={investment.name} 
                      onChange={(value) => updateInvestment(investment.id, 'name', value)}
                    />
                  </div>
                  <div className="text-right">
                    UGX <EditableField 
                      value={investment.amount} 
                      onChange={(value) => updateInvestment(investment.id, 'amount', value)}
                      type="number"
                      className="inline-block text-right"
                    />
                  </div>
                </React.Fragment>
              ))}
              
              <div className="col-span-2 pl-4 text-blue-600 text-sm cursor-pointer hover:text-blue-800" onClick={addInvestment}>
                + Add Investment
              </div>
              
              <div className="text-blue-700 font-bold border-t pt-2">Net Change in Cash</div>
              <div className="text-right font-bold border-t pt-2 text-blue-700">UGX {summary.cash.toLocaleString()}</div>
              
              <div className="text-gray-700">Beginning Cash Balance</div>
              <div className="text-right">UGX 0</div>
              
              <div className="text-green-700 font-bold border-t pt-2">Ending Cash Balance</div>
              <div className="text-right font-bold border-t pt-2 text-green-700">UGX {summary.cash.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Notes to Financial Statements</h2>
        
        <div className="space-y-4">
          {finances.notes.map((note, index) => (
            <div key={note.id}>
              <div className="flex items-center">
                <button 
                  onClick={() => removeNote(note.id)}
                  className="text-red-500 mr-2 text-xs hover:text-red-700"
                  title="Remove note"
                >
                  ×
                </button>
                <h3 className="font-bold text-gray-700">
                  {index + 1}. <EditableField 
                    value={note.title} 
                    onChange={(value) => updateNote(note.id, 'title', value)}
                    className="inline-block"
                  />
                </h3>
              </div>
              <p className="text-gray-600">
                <EditableField 
                  value={note.content} 
                  onChange={(value) => updateNote(note.id, 'content', value)}
                />
              </p>
            </div>
          ))}
          
          <div className="pl-4 text-blue-600 text-sm cursor-pointer hover:text-blue-800" onClick={addNote}>
            + Add Note
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Prepared for {finances.companyName} - {finances.asOfDate}</p>
      </div>

      {/* Asset Management Panel */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow print:hidden">
        <h3 className="font-bold mb-2">Manage Assets</h3>
        <div className="space-y-2">
          {finances.expenses.map(expense => (
            <div key={expense.id} className="flex items-center justify-between p-2 bg-white rounded">
              <div>
                <span className="font-medium">{expense.name}</span>
                <span className="ml-2 text-gray-500">UGX {expense.amount.toLocaleString()}</span>
              </div>
              <div className="space-x-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={expense.isAsset}
                    onChange={() => toggleExpenseProperty(expense.id, 'isAsset')}
                    className="mr-1"
                  />
                  <span>Asset</span>
                </label>
                {expense.isAsset && (
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={expense.prepaid}
                      onChange={() => toggleExpenseProperty(expense.id, 'prepaid')}
                      className="mr-1"
                    />
                    <span>Prepaid</span>
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;