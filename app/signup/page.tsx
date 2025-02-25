import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {  Building2 } from 'lucide-react'

export default async function SignUp() {

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted" />
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your information to create your account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Input
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
                id="password"
                placeholder="Create a password"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="confirm-password"
                placeholder="Confirm your password"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <Button className="w-full">
              Create Account
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}