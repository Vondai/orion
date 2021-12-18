import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./User.css";
import { useAuth } from '../../contexts/AuthContext';
import ErrorBox from '../Notifications/ErrorBox'

function SignUp () {

    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpSubmitHandler(e) {
        e.preventDefault();

        let { username, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

        if (!username || !password) {
            return setError('Please enter an username and/or password.');
        }
        if (username.length < 4) {
            return setError('Username must be atleast four characters.');
        }
        if (password.length < 6) {
            return setError('Password must be atleast six characters.')
        }
        if (password !== repeatPassword) {
            return setError('Passwords do not match.');
        }

        try {
            setError('');
            setLoading(true);
            let result = await signUp(username, password);
            setLoading(false);
            if (result.status === 'Error') {
                return setError(result.message);
            }
            navigate('/login');

        } catch (error) {
            setError("Failed to create an account.");
            setLoading(false);
        }
    }

    return(
        <section className='account-section'>
        <p className='account-title'>Sign up to Orion</p>
        {error && <ErrorBox message={error} />}
        <form className='account-form' onSubmit={signUpSubmitHandler}>
            <fieldset className='account-form-credentials'>
                <label htmlFor='username'>Username</label>
                <input id='username' placeholder='ex.John' type='text' name='username'/>
            </fieldset>
            <fieldset className='account-form-credentials'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password'/>
            </fieldset>
            <fieldset className='account-form-credentials'>
                <label htmlFor='repeat-password'>Repeat Password</label>
                <input id='repeat-password' type='password' name="repeatPassword"/>
            </fieldset>
            <section>
                <p className='account-redirect'>Already a member? <Link to='/login'><span className='account-redirect-hightlight'>Log in</span></Link></p>
            </section>
            <button className='account-form-cta' type='submit' disabled={loading}>Sign Up</button>
        </form>
        </section>
    );
}

export default SignUp;