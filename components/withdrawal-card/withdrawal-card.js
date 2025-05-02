Component({
  props: {
    availableBalance: '0.00',
    targetName: 'M-Pesa',
    isValidAmount: false,
    onWithdraw: () => {}
  },
  methods: {
    handleWithdraw() {
      this.props.onWithdraw();
    }
  }
});