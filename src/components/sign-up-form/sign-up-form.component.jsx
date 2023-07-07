import { useState, useContext } from 'react';
import { createUserByEmailAndPassword, createUserDocumentFormAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button-component';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const {setCurrentUser} =useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('the password do not match.');
            return;
        }
        if (password.length < 6) {
            alert('The password must has al least 6 characters.')
        }
        try {
            const { user } = await createUserByEmailAndPassword(email, password);
            user.displayName = displayName;
            await createUserDocumentFormAuth(user);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.');
            }
            console.log(error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleInputChanges = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email or password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type="text"
                    name='displayName'
                    value={displayName}
                    onChange={handleInputChanges}
                    required />
                <FormInput
                    label='Email'
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleInputChanges}
                    required />
                <FormInput
                    label='Password'
                    type="password"
                    name='password'
                    value={password}
                    onChange={handleInputChanges}
                    required />
                <FormInput
                    label='Confirm Password'
                    type="password"
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleInputChanges}
                    required />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;