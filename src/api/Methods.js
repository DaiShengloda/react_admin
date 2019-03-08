const methods = {
    isSameDay: function(d1, d2) {
      return d1.toLocaleDateString() === d2.toLocaleDateString();
    },
    isSameYear: function(d1, d2) {
      return d1.getFullYear() === d2.getFullYear();
    },
    formatNumber: function(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
  /**
  * 根据时间自适应显示的方式
  * 同一天只显示小时:分钟
  * 同一年显示 月-日 小时:分钟
  * 不同年显示 年-月-日 时:分
  * @param value 时间戳或者 标准格式时间(yyyy-MM-dd HH:mm) 
  */
  formatTimeLocal:function(value){
    var timestamp = parseInt(value);
    if (isNaN(timestamp)) {
      timestamp = value.replace(/-/g, '/');
    }
    let date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let today = new Date();

    let timeF = [hour, minute].map(this.formatNumber).join(":");
    if (this.isSameDay(date, today)) {
      return timeF;
    }
    if (this.isSameYear(date, today)) {
      return [month, day].map(this.formatNumber).join("-") + '  ' + timeF;
    }
    return [year, month, day].map(this.formatNumber).join("-");
  },
}

export default methods