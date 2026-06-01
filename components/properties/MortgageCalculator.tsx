'use client'

import { useState, useMemo } from 'react'
import { calcMortgage, formatPrice } from '@/lib/utils'
import { Calculator } from 'lucide-react'

export default function MortgageCalculator({ price }: { price: number }) {
  const [deposit, setDeposit] = useState(Math.round(price * 0.1))
  const [rate, setRate] = useState(3.5)
  const [years, setYears] = useState(25)

  const monthly = useMemo(() => calcMortgage(price, deposit, rate, years), [price, deposit, rate, years])
  const depositPct = Math.round((deposit / price) * 100)

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Calculator size={18} className="text-[var(--green)]" />
        <h2 className="font-semibold text-[var(--ink)]">Mortgage Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Property Price</label>
          <div className="text-lg font-bold text-[var(--ink)]">{formatPrice(price)}</div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">
            Deposit ({depositPct}%)
          </label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            max={price}
            min={0}
            className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">
            Interest Rate ({rate}%)
          </label>
          <input
            type="range"
            min={1}
            max={8}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[var(--green)]"
          />
          <div className="flex justify-between text-xs text-[var(--ink-3)] mt-1">
            <span>1%</span><span>8%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">
            Term ({years} years)
          </label>
          <input
            type="range"
            min={5}
            max={35}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[var(--green)]"
          />
          <div className="flex justify-between text-xs text-[var(--ink-3)] mt-1">
            <span>5yr</span><span>35yr</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-[var(--bg-soft)] rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1">Estimated Monthly Payment</div>
          <div className="text-3xl font-bold text-[var(--ink)]">{formatPrice(Math.round(monthly))}<span className="text-base font-normal text-[var(--ink-3)]">/mo</span></div>
        </div>
        <div className="text-right text-sm text-[var(--ink-3)]">
          <div>Loan: {formatPrice(price - deposit)}</div>
          <div>Total: {formatPrice(Math.round(monthly * years * 12))}</div>
        </div>
      </div>

      <p className="text-xs text-[var(--ink-3)] mt-3">
        * Estimate only. Speak to a mortgage advisor for an accurate figure. Central Bank rules apply.
      </p>
    </div>
  )
}
