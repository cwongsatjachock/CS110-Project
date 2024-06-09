import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { app } from './firebase';
import Button from './Button';
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";

const OAuth = ({ setUsername, setEmail }) => {
    const auth = getAuth(app);
    const modalContext = useContext(AuthModalContext);
    const userContext = useContext(UserContext);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken(); // Get the ID token

            // Send the ID token to the backend
            const response = await fetch('http://localhost:4000/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Add this line
                body: JSON.stringify({ idToken }),
            });

            if (response.ok) {
                console.log('Successfully authenticated with backend');


                setUsername(result.user.displayName);
                setEmail(result.user.email);
                userContext.setUser({ username: result.user.displayName });
                modalContext.setShow(false);
            } else {
                const errorMessage = await response.text();
                console.log('Failed to authenticate with backend:', errorMessage);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className="flex justify-center mb-4">
            <Button
                onClick={handleGoogleClick}
                className="bg-reddit_red text-white font-bold py-2 px-4 rounded"
            >
                Sign in with Google
            </Button>
        </div>
    )
}

export default OAuth;
