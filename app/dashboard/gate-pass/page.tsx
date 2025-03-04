import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function GatePassPage() {
  // Sample gate pass data
  const gatePasses = [
    { id: "GP-001", date: "2023-09-05", time: "14:00", reason: "Doctor's appointment", status: "Approved" },
    { id: "GP-002", date: "2023-09-07", time: "18:00", reason: "Family dinner", status: "Pending" },
    { id: "GP-003", date: "2023-09-10", time: "10:00", reason: "Shopping", status: "Rejected" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gate Pass</h1>
        <p className="text-muted-foreground">Request and manage your gate passes.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Request Gate Pass</CardTitle>
          <CardDescription>Fill out the form to request a new gate pass.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input id="reason" placeholder="Reason for gate pass" />
            </div>
            <Button>Submit Gate Pass Request</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Gate Pass History</CardTitle>
          <CardDescription>Your recent gate pass requests and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pass ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gatePasses.map((pass) => (
                <TableRow key={pass.id}>
                  <TableCell className="font-medium">{pass.id}</TableCell>
                  <TableCell>{pass.date}</TableCell>
                  <TableCell>{pass.time}</TableCell>
                  <TableCell>{pass.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pass.status === "Approved" ? "success" : pass.status === "Rejected" ? "destructive" : "warning"
                      }
                    >
                      {pass.status}
                    </Badge>
                  </TableCell>
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

