module.exports = {
  methods: {
    /* 设置cookie */
    setCookie (name, value, expires){
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + (expires * 60 * 60 * 1000));
      document.cookie = name + "=" + escape(value) +
      ((expires == null) ? "" : ";expires=" + exdate.toGMTString());
    },
    /* 获取cookie */
    getCookie (name){
      var start, end;
      if (document.cookie.length > 0) {
          start = document.cookie.indexOf(name + "=");
          if (start !== -1) {
              start = start + name.length + 1;
              end = document.cookie.indexOf(";", start);
              if (end === -1) end = document.cookie.length;
              return unescape(document.cookie.substring(start, end));
          }
      }
      return null;
    },
    /* 删除cookie */
    delCookie (name){
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null){
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      }
    }
  }
};
