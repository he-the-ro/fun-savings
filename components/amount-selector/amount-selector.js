Component({
  props: {
    title: 'Select Amount',
    quickAmounts: [100, 500, 1000],
    selectedAmount: null,
    customAmount: '',
    onAmountChange: () => {}
  },
  methods: {
    handleAmountSelect(e) {
      const amount = e.currentTarget.dataset.amount;
      this.setData({
        selectedAmount: amount,
        customAmount: ''
      });
      this.props.onAmountChange(amount);
    },
    handleCustomInput(e) {
      const amount = e.detail.value;
      this.setData({
        customAmount: amount,
        selectedAmount: null
      });
      this.props.onAmountChange(amount);
    }
  }
});