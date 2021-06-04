/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-one-expression-per-line */
import './App.css';
import {
  IconBase, LoginButton, OutlinedButton, RegisterButton,
} from './components/Buttons';
import { FilledTextField, FormBase } from './components/Forms';

function App() {
  return (
    <div className="App">
      <FilledTextField label="password" />
      <FormBase />
      <OutlinedButton text="buttonbase" type="button" icon={<IconBase iconType="bookmark" />} />
      <LoginButton />
      <RegisterButton />
    </div>
  );
}

export default App;
