import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ComplaintsPage() {
  // Sample complaints data
  const complaints = [
    {
      id: "COMP-1234",
      subject: "Product Defect",
      status: "Open",
      date: "2023-04-15",
      priority: "High",
    },
    {
      id: "COMP-1235",
      subject: "Billing Issue",
      status: "In Progress",
      date: "2023-04-12",
      priority: "Medium",
    },
    {
      id: "COMP-1236",
      subject: "Delivery Delay",
      status: "Closed",
      date: "2023-04-10",
      priority: "Low",
    },
    {
      id: "COMP-1237",
      subject: "Customer Service",
      status: "Open",
      date: "2023-04-08",
      priority: "High",
    },
    {
      id: "COMP-1238",
      subject: "Website Error",
      status: "Closed",
      date: "2023-04-05",
      priority: "Medium",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Complaints</h1>
        <p className="text-muted-foreground">View and manage customer complaints.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit a Complaint</CardTitle>
            <CardDescription>Fill out the form to submit a new complaint.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter the subject of your complaint" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about your complaint"
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button className="w-full">Submit Complaint</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Complaint Statistics</CardTitle>
            <CardDescription>Overview of complaint status and resolution times.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Open</div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">In Progress</div>
                <div className="text-2xl font-bold">5</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Closed</div>
                <div className="text-2xl font-bold">27</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Avg. Resolution</div>
                <div className="text-2xl font-bold">3.2d</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
          <CardDescription>View and manage your recent complaints.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.id}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        complaint.status === "Open"
                          ? "default"
                          : complaint.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        complaint.priority === "High"
                          ? "border-red-500 text-red-500"
                          : complaint.priority === "Medium"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-green-500 text-green-500"
                      }
                    >
                      {complaint.priority}
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

