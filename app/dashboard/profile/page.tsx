import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>View and update your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <Button variant="outline" className="w-full">
              Change Avatar
            </Button>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your account information and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

