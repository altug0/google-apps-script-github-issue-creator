class Utils {
    constructor(env){
      this.env = env
    }
    
    generateRandomHash() {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < this.env['githubIssueIdLenght']; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  
    setEmailTemplate(issueId,contact,content, repo){
      let template = HtmlService.createTemplateFromFile('template')
      template.issueId = issueId
      template.contact = contact
      template.content = content
      template.repo = repo
      return template.evaluate().getContent()
    }
  
    setOptions(issueId, contact, content, repo){
      let template = this.setEmailTemplate(issueId,contact,content, repo);
      return {
        'htmlBody' : template.toString()
      }
    }
  
    sendMail(issueId, contact, content, repo){
      let options = this.setOptions(issueId, contact, content, repo)
      MailApp.sendEmail(contact.trim(), `Issue Created - ${issueId}`,'', options);
    }
  }
  
  
  
  