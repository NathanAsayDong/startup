// dont need this anymore, delete on cleanup

class loginService {
    AuthenticationStatus = null;

    constructor() {
        this.AuthenticationStatus = 'unknown';
    }

    getAuthenticationStatus() {
        return this.AuthenticationStatus;
    }

    checkCacheForStatus() {
        const status = localStorage.getItem('AuthenticationStatusToken');
        //finish later
    }

    setAuthenticationStatus(status) {
        console.log('succesfully updated status in the service')
        this.AuthenticationStatus = status;
    }
}

const LoginService = new loginService();
export { LoginService };
