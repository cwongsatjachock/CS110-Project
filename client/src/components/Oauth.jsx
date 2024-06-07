import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase';


const Oauth = () => {


    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"});
        try{
            const result = await signInWithPopup(auth, provider);
            var userEmail = result.user.email;
            console.log(userEmail); //now email is isolated
        }
        catch(error){
            console.log(error);
        }
      }


  return (
    <button onClick = {handleGoogleClick}>Sign in with Google</button>
  )
}


export default Oauth