export const calculateFinancialSummary = (finances) => {
    const totalInvestments = finances.investments.reduce((sum, item) => sum + item.amount, 0);
    
    const operatingExpenses = finances.expenses
      .filter(expense => !expense.isAsset)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const assetExpenses = finances.expenses
      .filter(expense => expense.isAsset)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const totalExpenses = operatingExpenses + assetExpenses;
    
    const cash = finances.investments
      .filter(inv => inv.name.toLowerCase().includes("cash"))
      .reduce((sum, inv) => sum + inv.amount, 0) - totalExpenses;
  
    const goodwill = finances.investments
      .filter(inv => inv.name.toLowerCase().includes("goodwill"))
      .reduce((sum, inv) => sum + inv.amount, 0);
  
    const prepaidAssets = finances.expenses
      .filter(expense => expense.isAsset && expense.prepaid)
      .reduce((sum, expense) => sum + expense.amount, 0);
  
    const totalAssets = cash + goodwill + prepaidAssets;
    
    const contributedCapital = finances.investments
      .filter(inv => inv.name.toLowerCase().includes("cash"))
      .reduce((sum, inv) => sum + inv.amount, 0);
    
    const contributedGoodwill = finances.investments
      .filter(inv => inv.name.toLowerCase().includes("goodwill"))
      .reduce((sum, inv) => sum + inv.amount, 0);
    
    const retainedEarnings = totalAssets - contributedCapital - contributedGoodwill;
    
    const totalEquity = contributedCapital + contributedGoodwill + retainedEarnings;
    
    const totalLiabilitiesEquity = totalEquity; // No liabilities for now
    
    return {
      totalInvestments,
      operatingExpenses,
      assetExpenses,
      totalExpenses,
      cash,
      goodwill,
      prepaidAssets,
      totalAssets,
      contributedCapital,
      contributedGoodwill,
      retainedEarnings,
      totalEquity,
      totalLiabilitiesEquity
    };
  };