// Module imports
import buildCSP from 'content-security-policy-builder'
import React from 'react'
import uuid from 'uuid/v4'





// Module imports
import NextDocument, {
  Head,
  Main,
  NextScript,
} from 'next/document'





// Local constants
const cspHeaderKeys = [
  'Content-Security-Policy',
  'X-Content-Security-Policy',
  'X-WebKit-CSP',
]





class Document extends NextDocument {
  static async getInitialProps (ctx) {
    const allowances = {
      'data:': ['font'],
      "'unsafe-eval'": false,
      "'unsafe-inline'": ['style'],
      "'self'": true,
      "'strict-dynamic'": ['script'],
    }
    const initialProps = await NextDocument.getInitialProps(ctx)
    const isDev = ctx.isServer
    const nonce = uuid()
    const whitelist = {
      connect: [
        "'self'",
        'https://securetoken.googleapis.com',
        'https://www.googleapis.com',
        'https://api.themoviedb.org',
        'wss://*.firebaseio.com',
      ],
      default: [
        'https://trezy-core.firebaseapp.com',
        'https://*.firebaseio.com',
      ],
      font: 'https://fonts.gstatic.com',
      img: [
        "'self'",
        'https://image.tmdb.org',
      ],
      style: [
        "'self'",
        'https://fonts.googleapis.com',
      ],
      // media: [],
      // object: [],
      // script: [],
    }

    let baseUri = null

    if (!baseUri) {
      baseUri = ["'none'"]
    }

    if (!Array.isArray(baseUri)) {
      baseUri = [baseUri]
    }

    const cspDirectives = {
      baseUri,
      connectSrc: [
        ...(isDev ? ['webpack://*'] : []),
      ],
      scriptSrc: [
        `'nonce-${nonce}'`,
        ...(isDev ? ["'unsafe-eval'"] : []),
      ],
    }

    Object.entries(whitelist).forEach(([srcType, sources]) => {
      const initialSources = cspDirectives[`${srcType}Src`] || []
      const normalizedSources = Array.isArray(sources) ? sources : [sources]

      cspDirectives[`${srcType}Src`] = [
        ...initialSources,
        ...normalizedSources,
      ]
    })

    Object.entries(allowances).forEach(([allowance, value]) => {
      if ((typeof value === 'boolean') && value) {
        cspDirectives.defaultSrc.unshift(allowance)
      } else if (Array.isArray(value)) {
        value.forEach(srcType => {
          if (!cspDirectives[`${srcType}Src`]) {
            cspDirectives[`${srcType}Src`] = []
          }

          cspDirectives[`${srcType}Src`].unshift(allowance)
        })
      }
    })

    const policyString = buildCSP({ directives: cspDirectives })
    cspHeaderKeys.forEach(key => ctx.res.setHeader(key, policyString))

    return { ...initialProps, nonce }
  }

  render () {
    const { nonce } = this.props

    return (
      <html lang="en">
        <Head nonce={nonce}>
          <meta name="viewport" content="initial-scale=1.0, viewport-fit=cover, width=device-width" />

          <meta name="application-name" content="Trezy.com" />
          <meta name="theme-color" content="#d65050" />

          <meta name="apple-mobile-web-app-title" content="Trezy.com" />

          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#d65050" />
          <meta name="msapplication-TileImage" content="/static/favicon/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/static/favicon/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/static/favicon/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/static/favicon/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/static/favicon/mstile-310x310.png" />

          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/favicon/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/favicon/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/favicon/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/favicon/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/static/favicon/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/favicon/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/static/favicon/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon/apple-touch-icon-152x152.png" />

          <link rel="icon" type="image/png" href="/static/favicon/favicon-196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-128.png" sizes="128x128" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />

          <link rel="webmention" href="https://webmention.io/trezy.com/webmention" />
          <link rel="pingback" href="https://webmention.io/trezy.com/xmlrpc" />
        </Head>

        <body>
          <Main className="next-wrapper" />

          <NextScript nonce={nonce} />
        </body>
      </html>
    )
  }
}





export default Document
