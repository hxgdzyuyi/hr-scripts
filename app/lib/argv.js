import yargs from 'yargs'
import pkg from '../../package.json'

export default yargs
  .version(pkg.version)
  .usage('Usage: hr-scripts -r [owner/repo]')
  .option('repo', {
    alias: [
      'r',
    ],
    description: 'Query metionableUsers from Github\'s repository (owner/repo).',
    type: 'string',
    demand: true,
  })
  .option('token', {
    alias: [
      'a',
    ],
    description: 'Personal access toekn (See more: https://github.com/settings/tokens)',
    type: 'string',
    demand: true,
  })
  .option('output', {
    alias: [
      'o',
    ],
    description: 'Personal access toekn (See more: https://github.com/settings/tokens)',
    type: 'string',
  })
  .option('progress', {
    description: 'Show progress',
    alias: [
      'p'
    ],
    type: 'boolean',
  })
  .alias('h', 'help')
  .help('h', 'Show help.')
  .argv
