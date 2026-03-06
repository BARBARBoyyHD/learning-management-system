import Link from 'next/link'

/**
 * Footer Component
 * 
 * Application footer with copyright and links
 */
export function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-primary">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-primary-base rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
              </div>
              <span className="font-bold text-text-primary">Quizizz Clone</span>
            </div>
            <p className="text-sm text-text-tertiary">
              Interactive quiz platform for engaging learning assessments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-tertiary hover:text-primary-base transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border-primary text-center text-sm text-text-tertiary">
          <p>© 2026 LearnWeb LMS Ecosystem. Quizizz Clone (Lite Version)</p>
        </div>
      </div>
    </footer>
  )
}
