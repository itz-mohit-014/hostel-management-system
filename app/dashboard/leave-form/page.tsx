import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function LeaveFormPage() {
  // Sample leave applications
  const leaveApplications = [
    { id: "LEAVE-001", from: "2023-09-10", to: "2023-09-12", reason: "Family function", status: "Approved" },
    { id: "LEAVE-002", from: "2023-09-15", to: "2023-09-16", reason: "Medical appointment", status: "Pending" },
    { id: "LEAVE-003", from: "2023-09-20", to: "2023-09-22", reason: "Personal reasons", status: "Rejected" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leave Application</h1>
        <p className="text-muted-foreground">Submit and manage your leave applications.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Leave Application</CardTitle>
          <CardDescription>Fill out the form to submit a new leave application.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from-date">From Date</Label>
                <Input id="from-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-date">To Date</Label>
                <Input id="to-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea id="reason" placeholder="Provide details about your leave request" />
            </div>
            <Button>Submit Leave Application</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leave Application History</CardTitle>
          <CardDescription>Your recent leave applications and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.id}</TableCell>
                  <TableCell>{application.from}</TableCell>
                  <TableCell>{application.to}</TableCell>
                  <TableCell>{application.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.status === "Approved"
                          ? "success"
                          : application.status === "Rejected"
                            ? "destructive"
                            : "warning"
                      }
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="bg-">
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

