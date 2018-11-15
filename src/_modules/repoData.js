const {takeLast, pick, multiline} = require('rambdax')
const { get } = require('axios')

async function repoData(input){
  try {
    const [owner, repo] = takeLast(2,input.split('/'))
    
    const url = multiline(`
      https://api.github.com
      repos
      ${owner}
      ${repo}?access_token=${process.env.GITHUB}  
    `, '/')
    const {status,data} = await get(url)
    if(status>200) return false
    
    return pick(
      'name,description,html_url,updated_at,stargazers_count,open_issues',
      data
    )
  } catch (error) {
    return false
  }
}


exports.repoData = repoData