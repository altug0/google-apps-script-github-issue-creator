class FetchedForm {
  constructor(event,env){
    this.env = env;
    this.items = event.response.getItemResponses();
    this.contact = event.response.getRespondentEmail();
  }

  getRepo(){
    const repoEquivalant = JSON.parse(this.env['repoEquivalant']);
    return repoEquivalant[`${this.items[parseInt(this.env['repoOrderInForm'])]
          .getResponse()}`];
  }

  getContent(){
    return this.items[parseInt(this.env['contentOrderInForm'])].getResponse();
  }

  getContact(){
    return this.contact;
  }
}
