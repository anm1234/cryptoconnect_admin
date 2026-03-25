class Locations {
  constructor(login, signup, users, transactions, holldings) {
    this.loginUrl = login;
    this.signupUrl = signup;
    this.users = users;
    this.transactions = transactions;
    this.holdings = holldings
  }
}

const login = "http://localhost:3000/login";
const signup = "http://localhost:3000/signup";
const users = "http://localhost:3000/users";
const transactions = "http://localhost:3000/transactions";
const holdings = "http://localhost:3000/holdings"; // ← fixed typo

const details = new Locations(login, signup, users, transactions, holdings);

export default details;