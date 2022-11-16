
class Github{
  constructor(env){
    this.env = env;
  }

  setIssueBody(issueId, contact, content){
    return JSON.stringify({ 
        "title": `${issueId} - ${contact}`,
        "body": content,
        "labels": [`${this.env['githubLabelType']}`]
      })
  }

  setOption(issueId,contact,content){
    let issueBody = this.setIssueBody(issueId,contact,content);
    const githubAccessToken = this.env['githubAccessToken'];
    return {
      "method": "post",
      "contentType": "application/json",
      "payload": issueBody,
      "headers": {
        "authorization": `Bearer ${githubAccessToken}`
      }
    }
  }

  setServiceUrl(repo){
    return `${this.env['githubUrl']}/${this.env['githubAccount']}/${repo}/${this.env['githubService']}`
  }

  createIssue(repo,issueId,contact,content){
    let serviceUrl = this.setServiceUrl(repo);
    let options = this.setOption(issueId,contact,content)
    const response = UrlFetchApp.fetch(serviceUrl, options);
    return response
  }
}
