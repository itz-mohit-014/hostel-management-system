import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RoomAllocationPage() {
  // Sample room data
  const rooms = [
    { number: "101", type: "Single", status: "Occupied", student: "John Doe" },
    { number: "102", type: "Double", status: "Available", student: "-" },
    { number: "103", type: "Single", status: "Available", student: "-" },
    { number: "104", type: "Double", status: "Occupied", student: "Jane Smith, Alice Johnson" },
    { number: "105", type: "Single", status: "Maintenance", student: "-" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Room Allocation</h1>
        <p className="text-muted-foreground">Manage and view room allocations for students.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Search</CardTitle>
            <CardDescription>Search for available rooms or by student name.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input id="search" placeholder="Enter room number or student name" />
              </div>
              <Button>Search</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common room allocation tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Allocate Room</Button>
            <Button className="w-full" variant="outline">
              View Room History
            </Button>
            <Button className="w-full" variant="outline">
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Room Allocation Overview</CardTitle>
          <CardDescription>Current status of room allocations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Allocated To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.number}>
                  <TableCell className="font-medium">{room.number}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.status}</TableCell>
                  <TableCell>{room.student}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

