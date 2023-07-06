import { signInWithGooglePopup, createUserDocumentFormAuth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button-component";
import FormInput from "../../components/form-input/form-input.component";
import { useState } from "react";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            var res = await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email!');
                    break;
                case 'auth/user-not-found':
                    alert('user not found for this email!');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    const handleInputChanges = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFormAuth(user);
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    return (
        <div className="sign-in-container">
            <h1>Sign in page</h1>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonStyleType='google' onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}
export default SignInForm;