
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Stethoscope, Github, Mail, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    // Simulate authentication process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Authentication Successful",
      description: `Welcome back, ${values.email.split('@')[0]}. Accessing your premium dashboard.`,
    });
    
    setIsLoading(false);
    router.push("/dashboard");
  }

  async function onRegister(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    // Simulate secure account creation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "MediGold Membership Confirmed",
      description: "Your premium health profile has been successfully created.",
    });

    setIsLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-4 gold-glow">
            <Stethoscope className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold gold-text font-headline">MediGold Private</h1>
          <p className="text-muted-foreground">The world's most advanced telemedicine portal</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 mb-8 rounded-xl h-12">
            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="glass border-primary/10 shadow-2xl">
              <CardHeader>
                <CardTitle>Member Sign In</CardTitle>
                <CardDescription>Enter your secure credentials to continue.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="name@medigold.vip" {...field} className="bg-background/50 border-primary/20 h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Password</FormLabel>
                            <Link href="#" className="text-xs text-primary hover:underline">Reset access?</Link>
                          </div>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-primary/20 h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full gold-gradient text-black font-bold h-12 rounded-xl text-lg group" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t border-primary/5 pt-6">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-primary/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                    <span className="bg-card px-3 text-muted-foreground">Secure Integration</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button variant="outline" className="border-primary/10 hover:bg-primary/5">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button variant="outline" className="border-primary/10 hover:bg-primary/5">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="glass border-primary/10 shadow-2xl">
              <CardHeader>
                <CardTitle>Create Premium Account</CardTitle>
                <CardDescription>Join our elite network of healthcare professionals.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} className="bg-background/50 border-primary/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} className="bg-background/50 border-primary/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} className="bg-background/50 border-primary/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Create Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-primary/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full gold-gradient text-black font-bold h-12 rounded-xl group" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
                        <>
                          Complete Registration
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex-col gap-4 border-t border-primary/5 pt-6 text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  HIPAA Compliant • 256-bit AES Encryption
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
