(function() {
  var UMENG_ID = "1281407196", API_TOKEN = "3fa0b208c94d5a";

  function loadStats() {
    console.log("✅ 中国用户，已加载友盟统计");
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://s4.cnzz.com/z_stat.php?id=" + UMENG_ID + "&web_id=" + UMENG_ID;
    document.body.appendChild(s);
  }

  function checkCountry(country) {
    if (country === "CN") loadStats();
    else console.log("🚫 国外访客，已屏蔽友盟统计");
  }

  var country = localStorage.getItem("userCountry");
  if (country) return checkCountry(country);

  fetch("https://ipinfo.io/json?token=" + API_TOKEN)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("userCountry", data.country);
      checkCountry(data.country);
    })
    .catch(() => console.log("❌ IP 查询失败，默认屏蔽统计"));
})();
