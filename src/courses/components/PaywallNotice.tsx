import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onCheckout?: () => void
  message?: string
}

export default function PaywallNotice({ open, onClose, onCheckout, message }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[92%] max-w-md rounded-xl border bg-background p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Unlock full course</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {message ?? 'First 4 lessons are free. Unlock all lessons by subscribing.'}
        </p>
        <div className="flex justify-end gap-3">
          <button className="rounded-md border px-3 py-1.5 text-sm" onClick={onClose}>
            Cancel
          </button>
          <a
            href="/pricing"
            onClick={onCheckout}
            className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm"
          >
            View plans
          </a>
        </div>
      </div>
    </div>
  )
}
