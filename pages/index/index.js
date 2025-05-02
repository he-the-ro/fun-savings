Page({
  navigateToActions: function() {
    my.navigateTo({
      url: '/pages/action/index'
    });
  },
  data: {
    currentYear: new Date().getFullYear(),
    coins: []
  },

  onLoad() {
    // Generate falling coins data
    const coins = [];
    for (let i = 0; i < 15; i++) {
      coins.push({
        left: Math.random() * 100,       
        size: Math.random() * 20 + 15,     
        duration: Math.random() * 10 + 10,  
        delay: Math.random() * 10         
      });
    }
    
    this.setData({
      coins
    });
  },
  
  onProceed() {
    my.showLoading({
      content: 'Loading...',
    });
    
    setTimeout(() => {
      my.hideLoading();
      
      my.navigateTo({
        url: '/pages/dashboard/dashboard',
        success: () => {
          console.log('Navigation successful');
        },
        fail: (error) => {
          my.showToast({
            type: 'exception',
            content: 'Failed to load the app. Please try again.',
            duration: 2000
          });
          console.error('Navigation failed:', error);
        }
      });
    }, 800);
  }
});