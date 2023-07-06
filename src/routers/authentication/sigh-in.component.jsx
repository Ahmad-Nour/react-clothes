import SignUpForm from "../../components/sign-up-form/sing-up-form.component";
import { signInWithGooglePopup, createUserDocumentFormAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFormAuth(user);
    }
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign With Google popup</button>
            <SignUpForm />
        </div>
    );
}
export default SignIn;