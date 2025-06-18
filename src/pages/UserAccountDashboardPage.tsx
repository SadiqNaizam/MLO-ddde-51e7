import React from 'react';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Example of form imports if needed for complex forms
import { User, ShoppingCart, Ruler, Palette, Settings as SettingsIcon, Edit3, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // For potential internal links

// Sample Data
const userProfile = {
  name: "Alexandre Dubois",
  email: "alex.dubois@example.com",
  joinDate: "January 15, 2023",
  phone: "+33 6 12 34 56 78"
};

const orderHistory = [
  { id: "LXA-001-2024", date: "2024-07-15", items: "Custom Silk Blouse, Tailored Wool Trousers", total: "€1,250.00", status: "Delivered" },
  { id: "LXA-002-2024", date: "2024-06-28", items: "Bespoke Evening Gown", total: "€2,800.00", status: "Delivered" },
  { id: "LXA-003-2023", date: "2023-12-10", items: "Cashmere Overcoat", total: "€1,900.00", status: "Delivered" },
];

const currentOrders = [
  { id: "LXA-004-2024", date: "2024-08-05", items: "Linen Summer Suit", total: "€1,500.00", status: "In Production", estimatedDelivery: "2024-08-25" },
];

const savedMeasurements = {
  profileName: "Default Profile",
  lastUpdated: "2024-07-20",
  measurements: [
    { name: "Neck", value: "38 cm" },
    { name: "Chest", value: "96 cm" },
    { name: "Waist", value: "81 cm" },
    { name: "Hips", value: "100 cm" },
    { name: "Sleeve Length", value: "62 cm" },
    { name: "Inseam", value: "78 cm" },
    { name: "Shoulder Width", value: "45 cm" },
  ]
};

const savedDesigns = [
  { id: "SD001", name: "Velvet Smoking Jacket", dateSaved: "2024-05-10", imageUrl: "https://images.unsplash.com/photo-1593032465247-e38d8969f369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmVsdmV0JTIwamFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60", lastEdited: "2024-05-12" },
  { id: "SD002", name: "High-Waisted Palazzo Pants - Silk", dateSaved: "2024-06-22", imageUrl: "https://images.unsplash.com/photo-1604176359106-8a3d0485330c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsayUyMHBhbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60", lastEdited: "2024-06-23" },
];

const UserAccountDashboardPage: React.FC = () => {
  console.log('UserAccountDashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 dark:from-gray-900 dark:to-stone-800 text-gray-900 dark:text-gray-100">
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-200">My Account</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Welcome back, {userProfile.name}. Manage your profile, orders, and preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8 p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
            <TabsTrigger value="profile" className="flex items-center justify-center gap-2 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md rounded-md">
              <User size={18} /> Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center gap-2 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md rounded-md">
              <ShoppingCart size={18} /> Orders
            </TabsTrigger>
            <TabsTrigger value="measurements" className="flex items-center justify-center gap-2 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md rounded-md">
              <Ruler size={18} /> Measurements
            </TabsTrigger>
            <TabsTrigger value="saved-designs" className="flex items-center justify-center gap-2 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md rounded-md">
              <Palette size={18} /> Saved Designs
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center gap-2 py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md rounded-md">
              <SettingsIcon size={18} /> Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Personal Information</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">View and update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                    <Input id="name" type="text" defaultValue={userProfile.name} className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={userProfile.phone} className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                  </div>
                  <div>
                    <Label htmlFor="joinDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</Label>
                    <Input id="joinDate" type="text" defaultValue={userProfile.joinDate} readOnly className="mt-1 bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 cursor-not-allowed"/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password to change" className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-end">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Current Orders</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Track your ongoing orders.</CardDescription>
              </CardHeader>
              <CardContent>
                {currentOrders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-700 dark:text-gray-300">Order ID</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Items</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Total</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Est. Delivery</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">{order.id}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.date}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.items}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.total}</TableCell>
                          <TableCell><span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === "In Production" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-green-100 text-green-800"}`}>{order.status}</span></TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.estimatedDelivery}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="dark:border-gray-600 dark:hover:bg-gray-700">Track Order</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">You have no current orders.</p>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Order History</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Review your past purchases.</CardDescription>
              </CardHeader>
              <CardContent>
                 {orderHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-700 dark:text-gray-300">Order ID</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Items</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Total</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">{order.id}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.date}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.items}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{order.total}</TableCell>
                          <TableCell><span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800"}`}>{order.status}</span></TableCell>
                          <TableCell>
                            <Button variant="link" size="sm" className="text-primary hover:underline">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                 ) : (
                   <p className="text-gray-600 dark:text-gray-400 text-center py-4">You have no past orders.</p>
                 )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Measurements Tab */}
          <TabsContent value="measurements">
            <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Saved Measurements</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Manage your sizing profiles for a perfect fit. Last updated: {savedMeasurements.lastUpdated}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{savedMeasurements.profileName}</h3>
                  <Button variant="outline" size="sm" className="dark:border-gray-600 dark:hover:bg-gray-700">
                    <Edit3 size={14} className="mr-2"/> Edit Profile Name
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  {savedMeasurements.measurements.map((m) => (
                    <div key={m.name} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{m.name}:</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{m.value}</span>
                    </div>
                  ))}
                </div>
                 {/* This would link to a page or modal with AnimatedMeasurementInput */}
                 <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Need to update or add new measurements?</p>
                    <Link to="/product-customization-studio"> {/* Or a dedicated measurement page */}
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Ruler size={16} className="mr-2" /> Go to Measurement Studio
                        </Button>
                    </Link>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-end">
                <Button variant="outline" className="mr-2 dark:border-gray-600 dark:hover:bg-gray-700">Add New Profile</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Measurements</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Saved Designs Tab */}
          <TabsContent value="saved-designs">
            <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">My Saved Designs</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Revisit and continue customizing your saved creations.</CardDescription>
              </CardHeader>
              <CardContent>
                {savedDesigns.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedDesigns.map((design) => (
                      <Card key={design.id} className="overflow-hidden group bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-w-4 aspect-h-3">
                           <img src={design.imageUrl} alt={design.name} className="object-cover w-full h-full"/>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-primary">{design.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Saved: {design.dateSaved}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Last Edited: {design.lastEdited}</p>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline" className="w-full dark:border-gray-600 dark:hover:bg-gray-700" onClick={() => alert(`Editing ${design.name}`)}>
                              <Edit3 size={14} className="mr-1.5" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 dark:text-red-400 dark:hover:text-red-300" onClick={() => alert(`Deleting ${design.name}`)}>
                              <Trash2 size={14} className="mr-1.5" /> Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Palette size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">You haven't saved any designs yet.</p>
                    <Link to="/product-customization-studio">
                        <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Designing</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Account Settings</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Manage your communication preferences and account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Communication Preferences</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600">
                        <div>
                            <Label htmlFor="newsletter" className="font-medium text-gray-700 dark:text-gray-300">Luxe Atelier Newsletter</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates on new collections, exclusive offers, and style inspiration.</p>
                        </div>
                        {/* Shadcn Switch could be used here if available and wired up */}
                        <Button variant="outline" size="sm" className="dark:border-gray-600 dark:hover:bg-gray-700">Toggle</Button> 
                    </div>
                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600">
                        <div>
                            <Label htmlFor="orderUpdates" className="font-medium text-gray-700 dark:text-gray-300">Order &amp; Shipment Updates</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about your order status via email.</p>
                        </div>
                        <Button variant="outline" size="sm" className="dark:border-gray-600 dark:hover:bg-gray-700">Toggle</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Account Security</h3>
                     <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600">
                        <Label htmlFor="twoFactor" className="font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication (2FA)</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Enhance your account security by enabling 2FA.</p>
                        <Button variant="outline" className="dark:border-gray-600 dark:hover:bg-gray-700">Enable 2FA</Button>
                    </div>
                </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
                     <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-200 dark:border-red-700">
                        <Label htmlFor="deleteAccount" className="font-medium text-red-700 dark:text-red-300">Delete Account</Label>
                        <p className="text-xs text-red-600 dark:text-red-400 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                        <Button variant="destructive">Delete My Account</Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <MainFooter />
    </div>
  );
};

export default UserAccountDashboardPage;