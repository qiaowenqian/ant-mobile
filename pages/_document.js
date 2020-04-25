import Document, { Head, Main, NextScript } from "next/document";
export default class extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="format-detection" content="telephone=no, email=no" />
          <meta
            name="viewport"
            content="width=device-width,height=device-height, user-scalable=no,initial-scale=1, minimum-scale=1, maximum-scale=1,target-densitydpi=device-dpi"
          />
          {/* <link
            href="https://cdn.bootcss.com/antd-mobile/2.1.1/antd-mobile.min.css"
            rel="stylesheet"
          /> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/react-static/mobilevip/common.css?t=3.0.20"
          />
          <script src="https://g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js" />

          {/* <script src="//cdn.bootcss.com/eruda/1.2.4/eruda.min.js" /> */}
          {/* <script>eruda.init();</script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="file_img" />
        </body>
        <script
          defer
          src="/static/react-static/mobilevip/fonts/iconfont/iconfont.js?t=3.0.19"
        />

        {/* <script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js" /> */}
        {/* <script src="https://cdn.bootcss.com/fetch/2.0.2/fetch.min.js" /> */}

        {/* 阿里巴巴多色图标 */}
        <script
          defer
          src="https://at.alicdn.com/t/font_899240_wymoa0wxspa.js"
        />
        {/* <script defer src="/static/react-static/mobilevip/dingDapan/index.js" /> */}
      </html>
    );
  }
}
