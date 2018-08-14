import { GraphQLClient } from 'graphql-request'
import fs from 'fs-extra'
import path from 'path'
import { template } from 'lodash'
import argv from './argv'

export default async function(graphqlTmpl, options) {
  const tmpl =
    template(
      fs.readFileSync(
        path.join(__dirname, `../graphql/${graphqlTmpl}.graphql`)
      ).toString()
    )

  const query = tmpl(options)

  const { token } = argv

  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })

  return client.request(query)
}
