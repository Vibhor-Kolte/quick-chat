"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { signIn } from "next-auth/react";

const handleGoogleLogin = async () => {
  signIn("google", {
    redirect: true,
    callbackUrl: "/dashboard",
  });
};

function LoginModal() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Get Started</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Welcome to Quick-Chat!</DialogTitle>
            <DialogDescription>
                Quick-Chat is Awesome!
            </DialogDescription>
            </DialogHeader> 
            <Button variant={'outline'} onClick={handleGoogleLogin}>
                <Image src='/images/google.png' alt='Google Icon' className='mr-4' width={24} height={24} />
                Continue with Google
            </Button>
        </DialogContent>
    </Dialog>

  )
}

export default LoginModal;
