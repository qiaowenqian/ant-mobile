!(function(c, i, e, b) {
  var h = i.createElement("script");
  var f = i.getElementsByTagName("script")[0];
  h.type = "text/javascript";
  h.crossorigin = true;
  h.onload = function() {
    c[b] || (c[b] = new c.wpkReporter({ bid: "dta_2_4298" }));
    c[b].installAll();
  };
  f.parentNode.insertBefore(h, f);
  h.src = e;
})(
  window,
  document,
  "https://g.alicdn.com/woodpeckerx/jssdk??wpkReporter.js",
  "__wpk"
);
