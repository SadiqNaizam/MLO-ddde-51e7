import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronsRight, CreditCard, Lock } from 'lucide-react';

// Schema for Shipping Information
const shippingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  stateProvince: z.string().min(2, { message: "State/Province is required." }),
  postalCode: z.string().min(3, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Please select a country." }),
});
type ShippingFormValues = z.infer<typeof shippingFormSchema>;

// Schema for Payment Information
const paymentFormSchema = z.object({
  paymentMethod: z.enum(["creditCard", "payPal"], {
    required_error: "You need to select a payment method.",
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "creditCard") {
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardNumber"], message: "Card number must be 16 digits." });
    }
    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["expiryDate"], message: "Expiry date must be in MM/YY format." });
    }
    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cvv"], message: "CVV must be 3 or 4 digits." });
    }
  }
});
type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "JP", label: "Japan" },
  { value: "AU", label: "Australia" },
];

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Store form data between steps
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormValues | null>(null);


  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      fullName: "", addressLine1: "", addressLine2: "", city: "", stateProvince: "", postalCode: "", country: "",
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "creditCard", cardNumber: "", expiryDate: "", cvv: "",
    },
  });

  const onSubmitShipping = (data: ShippingFormValues) => {
    console.log("Shipping Data:", data);
    setShippingData(data);
    setCurrentStep(2);
  };

  const onSubmitPayment = (data: PaymentFormValues) => {
    console.log("Payment Data:", data);
    setPaymentData(data);
    setCurrentStep(3);
  };

  const handleConfirmOrder = () => {
    console.log("Order Confirmed! Shipping:", shippingData, "Payment:", paymentData);
    toast.success("Your order has been placed successfully!", {
      description: "You will receive an email confirmation shortly.",
      duration: 5000,
    });
    // Navigate to homepage after confirmation
    setTimeout(() => navigate('/'), 2000); // Redirect after showing toast
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Placeholder order summary
  const orderSummary = {
    items: [
      { id: "1", name: "Custom Tailored Silk Blouse", price: 350, quantity: 1, fabric: "Italian Silk", color: "Champagne" },
      { id: "2", name: "Bespoke Wool Trousers", price: 450, quantity: 1, fabric: "Merino Wool", color: "Charcoal Grey" },
    ],
    subtotal: 800,
    shipping: 25,
    tax: 64,
    get total() { return this.subtotal + this.shipping + this.tax; }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800">
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-10 md:py-16">
        <Card className="max-w-3xl mx-auto shadow-2xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700">
          <CardHeader className="bg-gray-50 dark:bg-gray-700/50 p-6 border-b dark:border-gray-700">
            <CardTitle className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 tracking-tight">
              Secure Checkout
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400 mt-1.5">
              Complete your luxurious custom order in {totalSteps} simple steps.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-10">
            <Progress value={(currentStep / totalSteps) * 100} className="w-full mb-8 md:mb-10 h-2.5" />

            {currentStep === 1 && (
              <Form {...shippingForm}>
                <form onSubmit={shippingForm.handleSubmit(onSubmitShipping)} className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">1. Shipping Details</h3>
                  <FormField control={shippingForm.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={shippingForm.control} name="addressLine1" render={({ field }) => (
                    <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input placeholder="Street address, P.O. box" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={shippingForm.control} name="addressLine2" render={({ field }) => (
                    <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input placeholder="Apartment, suite, unit, building, floor, etc." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={shippingForm.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., New York" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={shippingForm.control} name="stateProvince" render={({ field }) => (
                      <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="e.g., NY" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={shippingForm.control} name="postalCode" render={({ field }) => (
                      <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="e.g., 10001" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={shippingForm.control} name="country" render={({ field }) => (
                      <FormItem><FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                          <SelectContent>{countries.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                        </Select><FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </form>
              </Form>
            )}

            {currentStep === 2 && (
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">2. Payment Method</h3>
                  <FormField control={paymentForm.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Select Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[:checked]:border-primary dark:has-[:checked]:border-primary">
                            <FormControl><RadioGroupItem value="creditCard" /></FormControl>
                            <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <FormLabel className="font-normal">Credit Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[:checked]:border-primary dark:has-[:checked]:border-primary">
                            <FormControl><RadioGroupItem value="payPal" /></FormControl>
                            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal Logo" className="h-5"/>
                            <FormLabel className="font-normal">PayPal</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl><FormMessage />
                    </FormItem>
                  )} />
                  {paymentForm.watch("paymentMethod") === "creditCard" && (
                    <div className="space-y-6 pt-4 border-t dark:border-gray-700">
                       <FormField control={paymentForm.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input type="text" placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-2 gap-6">
                        <FormField control={paymentForm.control} name="expiryDate" render={({ field }) => (
                          <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input type="text" placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={paymentForm.control} name="cvv" render={({ field }) => (
                          <FormItem><FormLabel>CVV</FormLabel><FormControl><Input type="text" placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                       <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Lock className="h-3 w-3 mr-1.5" /> Secure SSL Encrypted Payment
                      </div>
                    </div>
                  )}
                  {paymentForm.watch("paymentMethod") === "payPal" && (
                    <div className="pt-4 border-t dark:border-gray-700 text-center">
                      <p className="text-sm text-gray-700 dark:text-gray-300">You will be redirected to PayPal to complete your payment securely.</p>
                      <Button type="button" variant="outline" className="mt-4" onClick={() => toast.info("PayPal integration placeholder", {description: "In a real app, this would redirect to PayPal."})}>
                        Proceed with PayPal
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">3. Review Your Order</h3>
                <Card className="bg-gray-50 dark:bg-gray-700/30 border dark:border-gray-700">
                  <CardContent className="p-6 space-y-4">
                    {orderSummary.items.map(item => (
                      <div key={item.id} className="flex justify-between items-start pb-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 last:pb-0">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">{item.name} (x{item.quantity})</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Fabric: {item.fabric}, Color: {item.color}</p>
                        </div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="pt-4 space-y-1">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>${orderSummary.subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Shipping</span><span>${orderSummary.shipping.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Tax (Est.)</span><span>${orderSummary.tax.toFixed(2)}</span></div>
                      <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100 pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                        <span>Total</span>
                        <span>${orderSummary.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {shippingData && (
                    <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Shipping to:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.addressLine1}{shippingData.addressLine2 ? `, ${shippingData.addressLine2}` : ""}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{shippingData.city}, {shippingData.stateProvince} {shippingData.postalCode}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{countries.find(c => c.value === shippingData.country)?.label}</p>
                    </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t dark:border-gray-700 flex justify-between items-center">
            <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1} className="hover:border-primary/70 dark:hover:border-primary/70">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep === 1 && (
              <Button onClick={shippingForm.handleSubmit(onSubmitShipping)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Next: Payment <ChevronsRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === 2 && (
               <Button onClick={paymentForm.handleSubmit(onSubmitPayment)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Next: Review Order <ChevronsRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === 3 && (
              <Button onClick={handleConfirmOrder} className="bg-green-600 hover:bg-green-700 text-white">
                Confirm & Pay ${orderSummary.total.toFixed(2)}
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
      <MainFooter />
    </div>
  );
};

export default CheckoutPage;