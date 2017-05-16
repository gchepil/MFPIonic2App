class LoginChallengeHandler {
    challengehandler: WL.Client.SecurityCheckChallengeHandler;

  create(){
    console.log('requestFromCorrectLoginPasswordPair registered');
     this.challengehandler = WL.Client.createSecurityCheckChallengeHandler("requestFromCorrectLoginPasswordPair");
     this.challengehandler.handleChallenge = (message) => {
        const redirecttologin = new CustomEvent('redirecttologin');
        document.dispatchEvent(redirecttologin);
    }
    this.challengehandler.handleFailure = function(error) {

    if(error.failure && error.failure == "account blocked") {
        alert("No Remaining Attempts!");  
    } else {
        alert("Error! " + JSON.stringify(error));
    }
};
  }

  login(login, password){
    console.log("login procces");  
    this.challengehandler.submitChallengeAnswer({login, password});
  }

}
export default new LoginChallengeHandler();
