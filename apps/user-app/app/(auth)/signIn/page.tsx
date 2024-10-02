"use client"

import React from 'react';
import { signIn } from 'next-auth/react';
import SignIn from "@components/auth/SignIn";

const SignInPage = () => {

return <div>
    <SignIn></SignIn>
  </div>
};

export default SignInPage;
