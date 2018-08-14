import argv from '../lib/argv'
import utils from '../lib/utils'
import githubRequest from '../lib/github-request'

async function filterAllMentionableUsersInRepository(owner, name, callback) {
  let cursor = null
  let limit = 100
  let page = 1
  let result = []
  let hasMorePage = false

  const { progress } = argv

  do {
    if (progress) {
      utils.title(
        `开始请求页面${page}` +
        (totalCount ? `，总页数为 ${Math.ceil(totalCount/limit)}` : '')
      )
    }

    let {
      repository: {
        mentionableUsers: {
          edges,
          pageInfo: {
            endCursor,
            hasNextPage
          },
          totalCount,
        }
      }
    } = await githubRequest(
      'findMentionableUsersInRepository',
      {
        owner,
        name,
        first: limit,
        after: cursor
      }
    )

    cursor = endCursor
    hasMorePage = hasNextPage
    page++

    edges.forEach(({ node }) => {
      if (!callback(node)) {
        return
      }

      result.push(node)
    })

  } while (hasMorePage)

  return result
}

export default function() {
  const { repo } = argv || ''
  const [ owner, name ] = repo.split('/')

  if (!owner || !name) {
    throw new Error('[ower/name], example is "facebook/react"')
  }

  const rChinaOrFuzhou = /China|Fuzhou/i
  const { output } = argv

  filterAllMentionableUsersInRepository(
    owner,
    name,
    (node) => {
      return node.location && rChinaOrFuzhou.test(node.location)
    }
  ).then((heros) => {
    const { output } = argv
    utils.output(heros, output, [owner, name].join('_'))
  })
}
