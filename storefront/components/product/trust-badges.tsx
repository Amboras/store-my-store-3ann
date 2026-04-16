import { ShieldCheck, RotateCcw, Truck, CreditCard, Award, Headphones } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    desc: 'Full manufacturer coverage',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    desc: 'Hassle-free, no questions',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On orders over $99',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    desc: '256-bit SSL encrypted',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Award,
    title: 'Genuine Products',
    desc: '100% authentic guarantee',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Expert tech assistance',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
]

export default function TrustBadges() {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
        Why Shop NexaCore
      </p>
      <div className="grid grid-cols-3 gap-3">
        {badges.map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`h-9 w-9 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-4 w-4 ${color}`} strokeWidth={1.75} />
            </div>
            <p className="text-[11px] font-semibold leading-tight">{title}</p>
            <p className="text-[10px] text-muted-foreground leading-tight hidden sm:block">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
