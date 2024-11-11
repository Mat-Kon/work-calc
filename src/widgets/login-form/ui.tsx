export const LoginForm: React.FC = () => {
  return (
    <form action="">
      <h2>Login</h2>
      <fieldset>
        <input type="text" placeholder="exemple@mail.net" />
        <input type="password" placeholder="password" />
        <label htmlFor="openPas">
          open password
          <input type="checkbox" id="openPas" />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};
