Page({
  data: {
    // Main screen data
    balance: "15,320.00",
    progress: 65,
    quickAmounts: [500, 1000, 2000, 5000],
    selectedAmount: null,
    customAmount: "",
    customAmountFocus: false,
    phoneNumber: "254712345678",
    canWithdraw: false,
    
    // Confirmation screen data
    showConfirmation: false,
    withdrawalAmount: "",
    newBalance: "",
    isProcessing: false,
    
    // Success screen data
    showSuccess: false,
    transactionId: "",
    transactionTime: ""
  },

  navigateBack() {
    my.navigateBack();
  },

  selectAmount(e) {
    const amount = e.currentTarget.dataset.amount;
    this.setData({
      selectedAmount: amount,
      customAmount: "",
      customAmountFocus: false,
      canWithdraw: true
    });
  },

  handleCustomAmount(e) {
    const amount = e.detail.value;
    this.setData({
      customAmount: amount,
      selectedAmount: null,
      canWithdraw: amount > 0
    });
  },

  focusCustomAmount() {
    this.setData({ customAmountFocus: true });
  },

  blurCustomAmount() {
    this.setData({ customAmountFocus: false });
  },

  changeRecipient() {
    my.navigateTo({
      url: '/pages/recipient/recipient'
    });
  },

  showConfirmationScreen() {
    const amount = this.data.selectedAmount || this.data.customAmount;
    if (!amount || amount <= 0) return;
    
    const currentBalance = parseFloat(this.data.balance.replace(/,/g, ''));
    const withdrawalAmount = parseFloat(amount);
    const newBalance = currentBalance - withdrawalAmount;
    
    this.setData({
      showConfirmation: true,
      withdrawalAmount: withdrawalAmount.toFixed(2),
      newBalance: newBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    });
  },

  hideConfirmationScreen() {
    this.setData({ showConfirmation: false });
  },

  processWithdrawal() {
    this.setData({ isProcessing: true });
    
    // Simulate API call
    setTimeout(() => {
      // Generate random transaction ID
      const transactionId = Math.floor(100000 + Math.random() * 900000);
      
      // Get current time
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const transactionTime = `${hours}:${minutes}`;
      
      this.setData({
        isProcessing: false,
        showConfirmation: false,
        showSuccess: true,
        balance: this.data.newBalance,
        progress: Math.min(100, Math.round((parseFloat(this.data.newBalance.replace(/,/g, '')) / 25000 * 100)),
        transactionId: transactionId,
        transactionTime: transactionTime
      )});
    }, 2000);
  },

  finishWithdrawal() {
    my.navigateBack();
  }
});