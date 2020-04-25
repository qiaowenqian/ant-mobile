import React, { Component } from 'react'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import NProgress from 'nprogress'
import Router from 'next/router'
NProgress.configure({
  template: "<div class='more more-login'  >  <div role='bar' style='display: none'></div><div class='bounce1'  ></div><div class='bounce2'></div><div class='bounce3'></div></div>"
});
//window.sessionStorage
Router.onRouteChangeStart = (url) => { url!=Router.router.asPath?NProgress.start():''}
//Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () =>NProgress.done()

export default class Layout extends Component {
  render () {
    const { language, children } = this.props
    const locale = language ? (language.substr(0, 2) === 'en' ? enUS : undefined) : undefined
    
    return (
      <LocaleProvider locale={locale}>
        {children}
      </LocaleProvider>
    )
  }
}
