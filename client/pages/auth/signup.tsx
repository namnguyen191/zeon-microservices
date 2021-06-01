export type signupProps = {};

const signup: React.FC<signupProps> = (props) => {
  const {} = props;

  return (
    <form>
      <h1>Sign Up!</h1>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="text" id="email" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="email" className="form-control" />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
