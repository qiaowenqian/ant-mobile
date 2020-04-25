import React from 'react'

export default class Index extends React.Component {
  static async getInitialProps ({ res }) {
    res.setHeader('Location', '/mo_dingHome')
    res.statusCode = 302
    res.end()
  }
}
