function main(event) {

  //script envs
  const env = PropertiesService.getScriptProperties().getProperties();
  //utils to do other minor staff
  const utils = new Utils(env);
  //generate issue id for tracking
  const issueId = utils.generateRandomHash();
  //fetch the form object and return key value object
  const fetchedForm = new FetchedForm(event,env);
  //fetched varaibles
  let repo,content,contact;
  repo = fetchedForm.getRepo();
  content = fetchedForm.getContent();
  contact = fetchedForm.getContact();
  //create github object
  const github = new Github(env);
  //create issue
  let response = github.createIssue(repo,issueId,contact,content);
  //get http code respons
  let responseCode = response.getResponseCode();
  
  if( responseCode != 200 && responseCode != 201) return Logger.log(response.getContentText("UTF-8"));
  //send e-mail
  utils.sendMail(issueId,contact, content,repo)
}
