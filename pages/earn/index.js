Page({
  data: {
    earningsBalance: "2,450.00",
    recentEarnings: [
      { activity: "Daily Quiz", amount: "150.00", date: "Today, 10:45 AM" },
      { activity: "Spin Wheel", amount: "50.00", date: "Yesterday, 4:30 PM" },
      { activity: "Scratch Card", amount: "200.00", date: "May 15, 2023" },
      { activity: "Lucky Dip", amount: "20.00", date: "May 14, 2023" }
    ],
    activeDraws: [],
    showEntryConfirm: false,
    selectedDrawId: '',
    selectedDrawName: ''
  },

  navigateToWithdraw() {
    my.navigateTo({ url: '/pages/withdrawal/withdrawal' });
  },

  viewFullHistory() {
    my.navigateTo({ url: '/pages/earn/history' });
  },

  confirmEntry(e) {
    const drawId = e.currentTarget.dataset.id;
    const drawNames = {
      scratch: "Scratch & Win",
      spin: "Spin Wheel",
      quiz: "Daily Quiz",
      dip: "Lucky Dip"
    };
    this.setData({
      selectedDrawId: drawId,
      selectedDrawName: drawNames[drawId],
      showEntryConfirm: true
    });
  },

  cancelEntry() {
    this.setData({
      showEntryConfirm: false,
      selectedDrawId: '',
      selectedDrawName: ''
    });
  },

  acceptEntry() {
    const drawId = this.data.selectedDrawId;

    if (!this.data.activeDraws.includes(drawId)) {
      this.setData({
        activeDraws: [...this.data.activeDraws, drawId]
      });
    }

    this.setData({ showEntryConfirm: false });

    const drawRoutes = {
      scratch: '/pages/earn/scratch-card',
      spin: '/pages/earn/spin-wheel',
      quiz: '/pages/earn/daily-quiz',
      dip: '/pages/earn/lucky-dip'
    };

    my.navigateTo({
      url: drawRoutes[drawId]
    });
  }
});
