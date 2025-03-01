"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon, UserIcon, EyeIcon, MailIcon, ClockIcon, ShieldIcon } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import toast from "react-hot-toast";

// Mock data for staff approval requests
const mockRequests = [
  {
    id: "req-001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "warden",
    department: "Student Affairs",
    staffId: "WDN-2023-001",
    hostel: "Boys Hostel A",
    requestDate: "2023-05-12T10:30:00",
    status: "pending"
  },
  {
    id: "req-002",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    role: "admin",
    department: "IT Department",
    staffId: "ADM-2023-014",
    requestDate: "2023-05-11T14:45:00",
    status: "pending"
  },
  {
    id: "req-003",
    name: "Michael Davis",
    email: "michael.davis@example.com",
    role: "warden",
    department: "Student Affairs",
    staffId: "WDN-2023-002",
    hostel: "Girls Hostel A",
    requestDate: "2023-05-10T09:15:00",
    status: "approved"
  },
  {
    id: "req-004",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "admin",
    department: "Administration",
    staffId: "ADM-2023-015",
    requestDate: "2023-05-09T11:20:00",
    status: "rejected"
  }
];

export default function StaffApproval() {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApprove = (id: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
    setDialogOpen(false);
    toast("Request Approved");
  };

  const handleReject = (id: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
    setDialogOpen(false);
    toast("Request Rejected");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const pendingRequests = requests.filter(req => req.status === "pending");
  const approvedRequests = requests.filter(req => req.status === "approved");
  const rejectedRequests = requests.filter(req => req.status === "rejected");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Staff Account Approvals</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage staff registration requests
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{pendingRequests.length} Pending</span>
        </Badge>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="pending">
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedRequests.length})
          </TabsTrigger>
        </TabsList>

        {["pending", "approved", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {status.charAt(0).toUpperCase() + status.slice(1)} Requests
                </CardTitle>
                <CardDescription>
                  {status === "pending"
                    ? "Review and take action on these staff registration requests"
                    : status === "approved"
                    ? "Previously approved staff accounts"
                    : "Previously rejected staff account requests"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests
                      .filter(req => req.status === status)
                      .map(request => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.staffId}</TableCell>
                          <TableCell>{request.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {request.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.department}</TableCell>
                          <TableCell>{formatDate(request.requestDate)}</TableCell>
                          <TableCell className="text-right">
                            <Dialog open={dialogOpen && selectedRequest?.id === request.id} onOpenChange={(open) => {
                              if (!open) setSelectedRequest(null);
                              setDialogOpen(open);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  <EyeIcon className="h-4 w-4 mr-1" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Staff Account Request</DialogTitle>
                                  <DialogDescription>
                                    Review details for {request.name}'s request
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {selectedRequest && (
                                  <div className="space-y-4 py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="bg-primary/10 p-2 rounded-full">
                                        <UserIcon className="h-6 w-6 text-primary" />
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">{selectedRequest.name}</h4>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <MailIcon className="h-3 w-3 mr-1" />
                                          {selectedRequest.email}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3 text-sm border rounded-lg p-4">
                                      <div>
                                        <p className="text-muted-foreground">Role</p>
                                        <p className="font-medium capitalize">{selectedRequest.role}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Staff ID</p>
                                        <p className="font-medium">{selectedRequest.staffId}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Department</p>
                                        <p className="font-medium">{selectedRequest.department}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Request Date</p>
                                        <p className="font-medium">{formatDate(selectedRequest.requestDate)}</p>
                                      </div>
                                      {selectedRequest.hostel && (
                                        <div className="col-span-2">
                                          <p className="text-muted-foreground">Assigned Hostel</p>
                                          <p className="font-medium">{selectedRequest.hostel}</p>
                                        </div>
                                      )}
                                    </div>

                                    {status === "pending" && (
                                      <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                                        <div className="font-medium flex items-center">
                                          <ShieldIcon className="h-4 w-4 mr-1 text-amber-500" />
                                          Action Required
                                        </div>
                                        <p className="text-amber-700 mt-1">
                                          Please review this request carefully before approving or rejecting.
                                        </p>
                                      </div>
                                    )}
                                    
                                    {status === "approved" && (
                                      <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm">
                                        <div className="font-medium flex items-center">
                                          <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
                                          Approved
                                        </div>
                                        <p className="text-green-700 mt-1">
                                          This request was approved and the account was created.
                                        </p>
                                      </div>
                                    )}
                                    
                                    {status === "rejected" && (
                                      <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
                                        <div className="font-medium flex items-center">
                                          <XIcon className="h-4 w-4 mr-1 text-red-500" />
                                          Rejected
                                        </div>
                                        <p className="text-red-700 mt-1">
                                          This request was rejected and no account was created.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <DialogFooter className="sm:justify-between">
                                  {status === "pending" ? (
                                    <>
                                      <Button
                                        variant="destructive"
                                        onClick={() => selectedRequest && handleReject(selectedRequest.id)}
                                      >
                                        <XIcon className="h-4 w-4 mr-1" />
                                        Reject
                                      </Button>
                                      <Button
                                        onClick={() => selectedRequest && handleApprove(selectedRequest.id)}
                                      >
                                        <CheckIcon className="h-4 w-4 mr-1" />
                                        Approve & Create Account
                                      </Button>
                                    </>
                                  ) : (
                                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                      Close
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                    {requests.filter(req => req.status === status).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No {status} requests found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
