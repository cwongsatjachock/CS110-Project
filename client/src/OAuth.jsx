import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from './firebase';
import Button from './Button'; 

const OAuth = () => {
    const auth = getAuth(app);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const result = await signInWithPopup(auth, provider);
            var userEmail = result.user.email;
            console.log(userEmail); //now email is isolated
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center mb-4"> 
            <Button onClick={handleGoogleClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign in with Google
            </Button>
        </div>
    )
}

export default OAuth;
