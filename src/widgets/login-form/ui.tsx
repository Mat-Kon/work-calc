import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';
import { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [isOpenPas, setOpenPas] = useState(false);

  const handleChecked = () => {
    setOpenPas((prev) => !prev);
  };

  return (
    <form action="" className={st.login_form}>
      <h2>Login</h2>

      <fieldset>
        <TextInput placeholder="exemple@mail.net" autoComplete="email" name="email" />

        <input
          type={`${isOpenPas ? 'text' : 'password'}`}
          placeholder="password"
          autoComplete="current-password"
          name="password"
        />

        <label htmlFor="openPas" className={`${st.open_pas} ${isOpenPas && st.active}`}>
          open password
          <input type="checkbox" id="openPas" className={st.checkbox} onChange={handleChecked} />
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};
