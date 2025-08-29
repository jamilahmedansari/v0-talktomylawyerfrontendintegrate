"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, FileText, Users, CheckCircle, Star, TrendingUp, Clock } from "lucide-react"
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
              <Button className="bg-teal-600 hover:bg-teal-700 btn-ripple glow">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bounce-in">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2 text-sm font-medium card-glow">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 blink-dot"></span>
              Quick, Cost-Effective, Stress-Free!
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 leading-tight hero-fade-in">
            Need a Lawyer's Voice Without the Legal Bill?
          </h1>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-reveal"
            style={{ animationDelay: "0.2s" }}
          >
            Get local attorneys to send your legal letter in 48 hours for $199.
          </p>

          <p
            className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed text-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Get professional lawyer-drafted letters for tenant disputes, debt collection, HR issues, and more. Resolve
            conflicts quickly and affordably with the power of legal communication.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 px-8 py-4 text-lg font-medium btn-magnetic shimmer"
              >
                ⚡ Get Started Now →
              </Button>
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

          {/* Key Benefits */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            {[
              { icon: CheckCircle, text: "No Fees" },
              { icon: CheckCircle, text: "24-48 Hour Delivery" },
              { icon: CheckCircle, text: "Lawyer Reviewed" },
            ].map((benefit, index) => (
              <div key={benefit.text} className={`flex items-center gap-2 text-green-600 grid-item-${index + 1}`}>
                <benefit.icon className="h-5 w-5" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-teal-900 text-white feature-reveal">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Letters Delivered" },
              { number: "95%", label: "Success Rate" },
              { number: "50+", label: "Licensed Attorneys" },
              { number: "24", label: "Hours Average Delivery" },
            ].map((stat, index) => (
              <div key={stat.label} className={`stat-bounce grid-item-${index + 1}`}>
                <div className="text-4xl font-bold text-teal-300 mb-2 stat-counter">{stat.number}</div>
                <div className="text-teal-100">{stat.label}</div>
              </div>
            ))}
          </div>
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
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 btn-magnetic"
                  onClick={() => handleSelectLetterType(card.type)}
                >
                  Select This Type →
                </Button>
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

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 py-3 text-lg font-medium btn-magnetic shimmer grid-item-5"
                >
                  📄 Continue to Sign Up →
                </Button>

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
          <h2 className="text-3xl font-bold text-teal-600 mb-4 text-reveal">Celebrating Success</h2>
          <p className="text-gray-600 mb-12 text-slide-up">
            Serving Thousands of clients since 2018! This is a straightforward choice. Here's why:
          </p>

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
              <Card
                key={item.title}
                className={`text-center ${
                  index === 0 ? "card-tilt" : index === 1 ? "card-glow" : "card-lift"
                } grid-item-${index + 1}`}
              >
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
              <Card key={testimonial.author} className={`max-w-2xl mx-auto card-glow grid-item-${index + 1}`}>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
