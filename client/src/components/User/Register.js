import { Link } from 'react-router-dom';
function Register () {

    return(
        <section className='account-section'>
        <p className='account-title'>Sign up to Orion</p>
        <form className='account-form'>
            <fieldset className='account-form-credentials'>
                <label htmlFor='username'>Username</label>
                <input id='username' placeholder='ex.John' type='text'></input>
            </fieldset>
            <fieldset className='account-form-credentials'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password'></input>
            </fieldset>
            <fieldset className='account-form-credentials'>
                <label htmlFor='repeat-password'>Repeat Password</label>
                <input id='repeat-password' type='password'></input>
            </fieldset>
            <section>
                <p className='account-redirect'>Already a member? <Link to='/login'><span className='account-redirect-hightlight'>Log in</span></Link></p>
            </section>
            <button className='account-form-cta' type='submit'>Sign Up</button>
        </form>
        </section>
    );
}

export default Register;