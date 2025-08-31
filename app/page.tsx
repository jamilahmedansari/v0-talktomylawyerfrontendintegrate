"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RetroGrid } from "@/components/ui/retro-grid"
import { ShinyButton } from "@/components/ui/shiny-button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { BlurFade } from "@/components/ui/blur-fade"
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity"
import {
  Scale,
  FileText,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    letterType: "",
    yourName: "",
    recipientName: "",
    situation: "",
  })

  const handleSelectLetterType = (letterType: string) => {
    // Store the selected letter type in localStorage for later use
    localStorage.setItem("selectedLetterType", letterType)
    router.push("/auth/signup")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data for later use after authentication
    localStorage.setItem("draftFormData", JSON.stringify(formData))
    router.push("/auth/signup")
  }

  const scrollToLetterTypes = () => {
    const letterTypesSection = document.getElementById("letter-types-section")
    letterTypesSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 slide-in-top">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 feature-slide-left">
            <Scale className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-semibold text-gray-900">talk-to-my-lawyer</span>
          </div>
          <div className="flex items-center gap-4 feature-slide-right">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-600 btn-magnetic">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <ShinyButton className="bg-teal-600 hover:bg-teal-700 text-white">Sign Up</ShinyButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <RetroGrid
          className="opacity-10 z-10"
          lightLineColor="rgb(20 184 166)"
          darkLineColor="rgb(20 184 166)"
          cellSize={80}
          angle={45}
        />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-20">
          <BlurFade delay={0.1}>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2 text-sm font-medium">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Quick, Cost-Effective, Stress-Free!
            </Badge>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Need a Lawyer's Voice Without the Legal Bill?
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-teal-600 font-medium">
              Get local attorneys to send your legal letter in 48 hours for $199.
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Get professional lawyer-drafted letters for tenant disputes, debt collection, HR issues, and more. Resolve
              conflicts quickly and affordably with the power of legal communication.
            </p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <ShimmerButton
                  className="px-8 py-4 text-lg font-medium"
                  background="linear-gradient(135deg, rgb(20 184 166), rgb(6 182 212))"
                  shimmerColor="#ffffff"
                >
                  ⚡ Get Started Now →
                </ShimmerButton>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-teal-200 text-teal-700 hover:bg-teal-50 bg-transparent btn-ripple"
                onClick={scrollToLetterTypes}
              >
                📄 View Letter Types
              </Button>
            </div>
          </BlurFade>

          {/* Key Benefits */}
          <BlurFade delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              {[
                { icon: CheckCircle, text: "No Fees" },
                { icon: CheckCircle, text: "24-48 Hour Delivery" },
                { icon: CheckCircle, text: "Lawyer Reviewed" },
              ].map((benefit, index) => (
                <div key={benefit.text} className="flex items-center gap-2 text-green-600">
                  <benefit.icon className="h-5 w-5" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-teal-900 text-white feature-reveal relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8">
            {[
              { number: "10,000+", label: "Letters Delivered" },
              { number: "95%", label: "Success Rate" },
              { number: "50+", label: "Licensed Attorneys" },
              { number: "24", label: "Hours Average Delivery" },
            ].map((stat, index) => (
              <BlurFade key={stat.label} delay={0.1 * index}>
                <div className="stat-bounce">
                  <div className="text-4xl font-bold text-teal-300 mb-2 stat-counter">{stat.number}</div>
                  <div className="text-teal-100">{stat.label}</div>
                </div>
              </BlurFade>
            ))}
          </div>

          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={20} className="py-4 text-teal-100">
              {[
                "⭐ Resolved my tenant dispute in 3 days! - Sarah M.",
                "⭐ Got my security deposit back thanks to their letter - John D.",
                "⭐ Professional service, fast delivery - Maria L.",
                "⭐ Saved me thousands in legal fees - Robert K.",
                "⭐ Excellent communication throughout - Lisa P.",
                "⭐ Highly recommend for any legal letters - David W.",
              ].map((testimonial, index) => (
                <span key={index} className="mx-8 whitespace-nowrap">
                  {testimonial}
                </span>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      </section>

      {/* Professional Service Section */}
      <section id="letter-types-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12 feature-slide-left">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4 card-tilt">Professional Service</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-reveal">Professional Legal Letters</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-slide-up">
            Choose from our comprehensive library of lawyer-drafted letter templates. Each letter is customized for your
            specific situation and reviewed by licensed attorneys.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FileText,
              iconColor: "text-blue-600",
              bgColor: "bg-blue-100",
              title: "Tenant Disputes",
              description: "Security deposits, lease violations, habitability issues, and more.",
              price: "$49",
              type: "tenant",
            },
            {
              icon: Users,
              iconColor: "text-green-600",
              bgColor: "bg-green-100",
              title: "HR & Employment",
              description: "Workplace issues, wrongful termination, wage disputes, and more.",
              price: "$99",
              type: "employment",
            },
            {
              icon: Clock,
              iconColor: "text-red-600",
              bgColor: "bg-red-100",
              title: "Debt Collection",
              description: "Business recovery from clients, customers, or vendors.",
              price: "$39",
              type: "debt",
            },
          ].map((card, index) => (
            <Card
              key={card.type}
              className={`border-2 hover:border-teal-200 transition-colors ${
                index === 0 ? "card-lift" : index === 1 ? "card-tilt" : "card-glow"
              } grid-item-${index + 1}`}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mb-4 float`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="text-2xl font-bold text-teal-600 mb-2 metric-pop">Starting at {card.price}</div>
                <ShinyButton
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => handleSelectLetterType(card.type)}
                >
                  Select This Type →
                </ShinyButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center feature-slide-right">
          <h2 className="text-3xl font-bold text-teal-600 mb-4 text-reveal">How It Works</h2>
          <p className="text-gray-600 mb-12 text-slide-up">A 5-step process to get your legal letter</p>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Client Intake Form",
                description: "Fill out our comprehensive form with your case details",
              },
              {
                step: 2,
                title: "Hire & Assign Attorney",
                description: "We assign a licensed attorney to your case",
              },
              {
                step: 3,
                title: "First Draft Review",
                description: "Attorney creates the first draft of your letter",
              },
              {
                step: 4,
                title: "Client Review & Final Approval",
                description: "You review and approve the final version",
              },
              {
                step: 5,
                title: "Delivery and Follow-up",
                description: "We deliver your letter and provide follow-up support",
              },
            ].map((item, index) => (
              <Card key={item.step} className={`max-w-2xl mx-auto card-glow grid-item-${index + 1}`}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg metric-pop">
                    {item.step}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-teal-600 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Request Service Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-2xl mx-auto feature-reveal">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4 bounce-in">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">No Charge • No Obligation</span>
            </div>
            <h2 className="text-3xl font-bold text-teal-600 mb-4 text-reveal">Request Service Now</h2>
            <p className="text-gray-700 mb-2 font-semibold text-slide-up">You pay nothing for this request!</p>
            <p className="text-gray-600 text-slide-up" style={{ animationDelay: "0.2s" }}>
              There's no charge and no obligation. Let's see if we can help. Complete the form below to request a local
              law firm to draft and deliver your letter. We'll handle the rest.
            </p>
          </div>

          <Card className="border-2 border-blue-200 card-lift">
            <CardContent className="p-6">
              <div className="mb-6 feature-slide-left">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-600">Key Features</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 grid-item-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Write and preview your letter directly on the landing page</span>
                  </div>
                  <div className="flex items-center gap-2 grid-item-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>
                      Choose to pay to start the printing process or directly send the letter to the recipient using our
                      services
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 feature-slide-right">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 pulse-soft">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-red-800 mb-1">DISCLAIMER: We receive hundreds of requests.</div>
                    <p className="text-red-700">
                      If you are serious and ready to move forward immediately, please complete the form below and pay
                      very careful attention to the instructions provided on the following page.
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-4 form-slide-in" onSubmit={handleFormSubmit}>
                <div className="grid-item-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Letter Type *</label>
                  <Select
                    value={formData.letterType}
                    onValueChange={(value) => setFormData({ ...formData, letterType: value })}
                  >
                    <SelectTrigger className="form-focus-lift">
                      <SelectValue placeholder="Select letter type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant Disputes</SelectItem>
                      <SelectItem value="employment">HR & Employment</SelectItem>
                      <SelectItem value="debt">Debt Collection</SelectItem>
                      <SelectItem value="contract">Contract Disputes</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid-item-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <Input
                    placeholder="Your full name"
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    className="form-focus-lift"
                    required
                  />
                </div>

                <div className="grid-item-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name *</label>
                  <Input
                    placeholder="Recipient's name"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="form-focus-lift"
                    required
                  />
                </div>

                <div className="grid-item-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Situation *</label>
                  <Textarea
                    placeholder="Briefly describe what happened and what you want to achieve..."
                    rows={4}
                    value={formData.situation}
                    onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                    className="form-focus-lift"
                    required
                  />
                </div>

                <RainbowButton type="submit" variant="outline" className="w-full py-3 text-lg font-medium grid-item-5">
                  📄 Continue to Sign Up →
                </RainbowButton>

                <p className="text-center text-sm text-gray-600 grid-item-6">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-teal-600 hover:underline btn-ripple">
                    Log in here
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center feature-slide-left">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl font-bold text-teal-600 mb-4 text-reveal">Celebrating Success</h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-gray-600 mb-12 text-slide-up">
              Serving Thousands of clients since 2018! This is a straightforward choice. Here's why:
            </p>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                value: "$199",
                title: "Pricing",
                description: "Per Letter with a 48-hour turnaround and attorney review.",
              },
              {
                icon: TrendingUp,
                title: "Trust",
                description:
                  "Trusted by thousands and featured in numerous media outlets (Entrepreneur, Medium, Handbook, BizPrime).",
              },
              {
                icon: Star,
                title: "Testimonials",
                description: "Real results from satisfied clients across the country.",
              },
            ].map((item, index) => (
              <BlurFade key={item.title} delay={0.1 * index}>
                <Card className="text-center card-glow">
                  <CardContent className="p-6">
                    {item.value ? (
                      <div className="text-4xl font-bold text-blue-600 mb-2 stat-counter">{item.value}</div>
                    ) : (
                      <item.icon className="h-12 w-12 text-green-600 mx-auto mb-4 float" />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>

          <div className="space-y-6">
            {[
              {
                text: "Talk-to-my-lawyer made it so easy! I sent a $15,000 demand letter and got a $3,000 response in just three days. Highly recommend!",
                author: "Jane D.",
              },
              {
                text: "Amazing service from Talk-to-my-lawyer! They handled my contract dispute letter, and I saw results within a week. Great team!",
                author: "Mike T.",
              },
            ].map((testimonial, index) => (
              <BlurFade key={testimonial.author} delay={0.1 * index}>
                <Card className="max-w-2xl mx-auto card-glow">
                  <CardContent className="p-6 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 pulse-soft"></div>
                      <div>
                        <p className="text-gray-700 italic mb-2">"{testimonial.text}"</p>
                        <p className="text-blue-600 font-medium">- {testimonial.author}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <BlurFade delay={0.1}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Scale className="h-8 w-8 text-teal-400" />
                  <span className="text-xl font-semibold">talk-to-my-lawyer</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Professional legal letter services connecting you with licensed attorneys nationwide. Get the legal
                  voice you need without the expensive legal fees.
                </p>
                <div className="flex items-center gap-4">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-slate-300">Licensed & Insured</span>
                </div>
              </div>
            </BlurFade>

            {/* Services */}
            <BlurFade delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-400">Services</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <Link href="/generate" className="hover:text-teal-400 transition-colors">
                      Tenant Disputes
                    </Link>
                  </li>
                  <li>
                    <Link href="/generate" className="hover:text-teal-400 transition-colors">
                      Employment Issues
                    </Link>
                  </li>
                  <li>
                    <Link href="/generate" className="hover:text-teal-400 transition-colors">
                      Debt Collection
                    </Link>
                  </li>
                  <li>
                    <Link href="/generate" className="hover:text-teal-400 transition-colors">
                      Contract Disputes
                    </Link>
                  </li>
                  <li>
                    <Link href="/generate" className="hover:text-teal-400 transition-colors">
                      Cease & Desist
                    </Link>
                  </li>
                  <li>
                    <Link href="/generate" className="hover:text-teal-400 transition-colors">
                      Demand Letters
                    </Link>
                  </li>
                </ul>
              </div>
            </BlurFade>

            {/* Company */}
            <BlurFade delay={0.3}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-400">Company</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <Link href="/about" className="hover:text-teal-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-teal-400 transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-teal-400 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/account" className="hover:text-teal-400 transition-colors">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-teal-400 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </BlurFade>

            {/* Contact */}
            <BlurFade delay={0.4}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-400">Contact</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-teal-400" />
                    <span>support@talktomylawyer.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-teal-400" />
                    <span>1-800-LAWYER-1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-teal-400" />
                    <span>Available Nationwide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-teal-400" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Trust Indicators */}
          <BlurFade delay={0.5}>
            <div className="border-t border-slate-700 pt-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm text-slate-300">A+ BBB Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-slate-300">48hr Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-slate-300">100% Secure</span>
                  </div>
                </div>
                <div className="text-sm text-slate-400">Featured in: Entrepreneur • Medium • BizPrime</div>
              </div>
            </div>
          </BlurFade>

          {/* Bottom Bar */}
          <BlurFade delay={0.6}>
            <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-400">© 2024 talk-to-my-lawyer. All rights reserved.</div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-teal-400 transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="hover:text-teal-400 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </footer>
    </div>
  )
}
