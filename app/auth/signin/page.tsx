"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { getSession, signIn } from "next-auth/react";
import { loginValidation } from '@/common/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface IFormValue{
  email:string,
  password:string
}

export default function Login() {
  const {register, handleSubmit} = useForm<IFormValue>()
  const router = useRouter()


  const submitHandler = async(data:IFormValue)=>{
    console.log(data)
    const id = toast.loading('...Loggin in')
    const parseData = loginValidation.safeParse(data)

    if(!parseData.success){
      toast.error("Invalid credentials",{
        id:id
      })
      return;
    }

try {
      const result = await signIn("credentials", {
        redirect: false,
        email:data.email,
        password:data.password
      });
      if(result?.ok){
        toast.success("Logged in Successfully",{
          id:id
        })
      
      }
      router.push('/dashboard')
      
} catch (error) {
    const err = (error as Error).message
    toast.error(err, {
      id:id
    })
}
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted" />
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div className="space-y-2">
              <Input
              {...register("email") }
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input
              {...register("password")}
                id="password"
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="text-center text-sm">
            Don't have an account? &npsp;
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}