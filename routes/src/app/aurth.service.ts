
export class AuthService{
    loggedIn = false;

    // returns logged in status, but waits for 800 miliseconds to mimic server reach out and retrieving info action
    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 800);
            }

        );

        return promise;
    }

    logIn(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }
}