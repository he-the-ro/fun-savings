Page({
  data: {
    currentSavings: "5,245.00",
    savingsGoal: "15,000.00",
    progressPercent: 35,
    saveAmount: "",
    recentTransactions: [
      { amount: "1,000.00", date: "Today" },
      { amount: "500.00", date: "Yesterday" },
      { amount: "2,000.00", date: "May 15" }
    ]
  },

  navigateBack() {
    my.navigateBack();
  },

  handleAmountChange(e) {
    // Remove any non-numeric characters
    const value = e.detail.value.replace(/[^0-9]/g, '');
    this.setData({ saveAmount: value });
  },

  setQuickAmount(e) {
    const amount = e.currentTarget.dataset.amount;
    this.setData({ saveAmount: amount });
  },

  handleSave() {
    const { saveAmount, currentSavings, savingsGoal } = this.data;
    
    if (!saveAmount || saveAmount <= 0) {
      my.showToast({ type: 'fail', content: 'Please enter valid amount' });
      return;
    }

    my.showLoading({ content: 'Saving...' });

    // Convert formatted strings to numbers
    const current = parseFloat(currentSavings.replace(/,/g, ''));
    const amount = parseFloat(saveAmount);
    const goal = parseFloat(savingsGoal.replace(/,/g, ''));

    // Calculate new values
    const newCurrent = current + amount;
    const newPercent = Math.min(100, Math.round((newCurrent / goal) * 100));

    // Format numbers with commas
    const formatNumber = num => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setTimeout(() => {
      this.setData({
        currentSavings: formatNumber(newCurrent),
        progressPercent: newPercent,
        saveAmount: "",
        recentTransactions: [
          { amount: formatNumber(amount), date: 'Today' },
          ...this.data.recentTransactions.slice(0, 4)
        ]
      });

      my.hideLoading();
      my.showToast({ type: 'success', content: `Saved KSH ${formatNumber(amount)}` });
    }, 1000);
  }
});