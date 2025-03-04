import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"

export default function AttendancePage() {
  // Sample attendance data
  const attendanceData = [
    { date: "2023-09-01", status: "Present" },
    { date: "2023-09-02", status: "Present" },
    { date: "2023-09-03", status: "Absent" },
    { date: "2023-09-04", status: "Present" },
    { date: "2023-09-05", status: "Present" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">View and manage your attendance records.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your attendance statistics for the current month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold">90%</div>
                <div className="text-xs text-muted-foreground">Attendance Rate</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">27</div>
                <div className="text-xs text-muted-foreground">Days Present</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">Days Absent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
            <CardDescription>View your attendance on the calendar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your attendance records for the past few days.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.date}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "Present" ? "success" : "destructive"}>{record.status}</Badge>  
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Details
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

