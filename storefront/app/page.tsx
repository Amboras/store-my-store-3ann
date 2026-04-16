'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Cpu,
  Wifi,
  BatteryCharging,
  Zap,
  Star,
  Lock,
  ChevronRight,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { HERO_PLACEHOLDER, LIFESTYLE_PLACEHOLDER } from '@/lib/utils/placeholder-images'

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[hsl(220_25%_8%)] text-white">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        {/* Blue radial glow */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />

        <div className="container-custom relative grid lg:grid-cols-2 gap-10 items-center py-24 lg:py-36">
          {/* Copy */}
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
              <Zap className="h-3 w-3" />
              Next-Gen Technology
            </div>
            <h1 className="text-display font-heading font-bold text-balance leading-[1.05]">
              Power Your
              <span className="block text-blue-400">Future World</span>
            </h1>
            <p className="text-base text-slate-400 max-w-md leading-relaxed">
              Premium tech gear engineered for peak performance. From cutting-edge gadgets to
              essential accessories — built for those who demand more.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Shop All Gear
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>

            {/* Micro-stats */}
            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-xs text-slate-500 mt-0.5">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">4.9</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">2Y</p>
                <p className="text-xs text-slate-500 mt-0.5">Warranty</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/10 glow-blue" />
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={HERO_PLACEHOLDER}
                  alt="Premium Tech Gear"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Pills ── */}
      <section className="border-y bg-[hsl(220_25%_8%)] border-white/5">
        <div className="container-custom py-5">
          <div className="flex flex-wrap justify-center lg:justify-between gap-6 md:gap-4">
            {[
              { icon: Cpu, label: 'Advanced Processors' },
              { icon: Wifi, label: 'Seamless Connectivity' },
              { icon: BatteryCharging, label: 'All-Day Battery' },
              { icon: Shield, label: '2-Year Warranty' },
              { icon: Truck, label: 'Free Express Shipping' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-slate-400">
                <Icon className="h-4 w-4 text-blue-400 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── About / Brand Story ── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden">
              <Image
                src={LIFESTYLE_PLACEHOLDER}
                alt="Engineering Excellence"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Since 2020</p>
                <p className="text-sm font-bold text-foreground mt-0.5">Engineering Excellence</p>
              </div>
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-500 font-semibold">Our Philosophy</p>
              <h2 className="text-h2 font-heading font-bold">
                Tech Built for Real Life
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe powerful technology shouldn&apos;t be complicated. Every product we carry
                is rigorously tested, precisely engineered, and designed to integrate seamlessly
                into how you work, create, and live.
              </p>
              <ul className="space-y-3">
                {[
                  'Precision-tested quality control',
                  'Sustainable materials & packaging',
                  'World-class after-sales support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="h-3 w-3 text-blue-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide link-underline pb-0.5"
                prefetch={true}
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="py-section-sm border-y">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">Free Express Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders over $99</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">No questions asked</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end text-center md:text-right">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-section bg-[hsl(220_25%_8%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="container-custom max-w-xl text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
            <Zap className="h-3 w-3" />
            Stay Updated
          </div>
          <h2 className="text-h2 font-heading font-bold text-white">Get Early Access</h2>
          <p className="mt-3 text-slate-400 text-sm">
            Be first to discover new drops, exclusive deals, and tech insights. No spam — ever.
          </p>
          <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors rounded-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors whitespace-nowrap rounded-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
