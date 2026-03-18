class Locations{
    constructor(login,signup){
        this.loginUrl = login;
        this.signupUrl = signup;
    }



}

const login = "http://localhost:3000/login";
const signup = "http://localhost:3000/signup";


const details = new Locations(login,signup);



export default details;