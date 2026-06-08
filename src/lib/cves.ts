export type CVEEntry = {
  id: string
  packageName: string
  severity: 'Critical' | 'High' | 'Moderate' | 'Low'
  summary: string
  advisoryUrl: string
  blogUrl: string
  date: Date
}

const cveEntries: CVEEntry[] = [
  {
    id: 'CVE-2026-49355',
    packageName: 'OpenProject',
    severity: 'Moderate',
    summary:
      'The single meeting agenda item API disclosed private work package data from a linked work package in an inaccessible project.',
    advisoryUrl:
      'https://github.com/opf/openproject/security/advisories/GHSA-g387-6rm2-xw88',
    blogUrl: '/blog/openproject-cve-2026-49355',
    date: new Date('2026-06-08'),
  },
  {
    id: 'CVE-2026-50199',
    packageName: 'Wallos',
    severity: 'Moderate',
    summary:
      "Cross-user Fixer/API Layer credential consumption in exchange-rate refresh let one user trigger provider-backed actions through another user's stored credential.",
    advisoryUrl:
      'https://github.com/ellite/Wallos/security/advisories/GHSA-5wf4-m4hj-rxj5',
    blogUrl: '/blog/wallos-two-cves',
    date: new Date('2026-06-05'),
  },
  {
    id: 'CVE-2026-50198',
    packageName: 'Wallos',
    severity: 'Moderate',
    summary:
      'Cross-user subscription cost inference via replacement_subscription_id let an authenticated user infer another user subscription cost through unscoped stats dereferencing.',
    advisoryUrl:
      'https://github.com/ellite/Wallos/security/advisories/GHSA-hggr-v8rm-c6jj',
    blogUrl: '/blog/wallos-two-cves',
    date: new Date('2026-06-05'),
  },
  {
    id: 'CVE-2026-48067',
    packageName: 'Filament',
    severity: 'Moderate',
    summary:
      'Inconsistent scope enforcement for AttachAction and AssociateAction Select fields let out-of-scope records pass through backend validation.',
    advisoryUrl:
      'https://github.com/filamentphp/filament/security/advisories/GHSA-7q3w-xqjw-g3cr',
    blogUrl: '/blog/filament-cve-2026-48067',
    date: new Date('2026-05-25'),
  },
  {
    id: 'CVE-2026-47755',
    packageName: 'ITFlow',
    severity: 'Moderate',
    summary:
      'Authenticated cross-tenant credential disclosure exposed another client secrets through an unprotected credential modal.',
    advisoryUrl:
      'https://github.com/itflow-org/itflow/security/advisories/GHSA-987x-g5f9-2rpq',
    blogUrl: '/blog/itflow-cve-2026-47755',
    date: new Date('2026-05-25'),
  },
  {
    id: 'CVE-2026-47745',
    packageName: 'Shopper',
    severity: 'Moderate',
    summary:
      'Payment methods, currencies, and carriers exposed inline toggles and record actions without proper per-action authorization checks.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-fxqw-97cc-7g5c',
    blogUrl: '/blog/shopper-six-advisories',
    date: new Date('2026-05-22'),
  },
  {
    id: 'CVE-2026-47744',
    packageName: 'Shopper',
    severity: 'Critical',
    summary:
      'Team settings authorization defects let authenticated panel users take over the RBAC system itself.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-c3qp-2ggw-xjg7',
    blogUrl: '/blog/shopper-six-advisories',
    date: new Date('2026-05-22'),
  },
  {
    id: 'CVE-2026-47743',
    packageName: 'Shopper',
    severity: 'High',
    summary:
      'Multiple admin Livewire issues led to data tampering, sensitive data disclosure, and stored XSS.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-hr9v-r8r2-hg7j',
    blogUrl: '/blog/shopper-six-advisories',
    date: new Date('2026-05-22'),
  },
  {
    id: 'CVE-2026-47742',
    packageName: 'Shopper',
    severity: 'Moderate',
    summary:
      'Product editor sub-form Livewire components accepted unauthorized store actions and allowed tampering without the required permission.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-h4mp-g9c6-xwph',
    blogUrl: '/blog/shopper-six-advisories',
    date: new Date('2026-05-22'),
  },
  {
    id: 'CVE-2026-47741',
    packageName: 'Shopper',
    severity: 'Moderate',
    summary:
      'A discount race condition enabled silent over-redemption and effectively bypassed the per-user usage limit.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-9rh9-hf3w-9fgg',
    blogUrl: '/blog/shopper-six-advisories',
    date: new Date('2026-05-22'),
  },
  {
    id: 'CVE-2026-47740',
    packageName: 'Shopper',
    severity: 'High',
    summary:
      'Missing authorization on order mutation actions let low-privileged authenticated users mutate order state without the required write permission.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-f946-9qp6-vgch',
    blogUrl: '/blog/shopper-six-advisories',
    date: new Date('2026-05-22'),
  },
  {
    id: 'CVE-2026-44692',
    packageName: 'Sharp',
    severity: 'High',
    summary:
      'A generic download endpoint let authenticated users use one valid record as an authorization anchor to download unrelated Laravel Storage objects.',
    advisoryUrl:
      'https://github.com/code16/sharp/security/advisories/GHSA-748w-hm6r-qc7v',
    blogUrl: '/blog/sharp-cve-2026-44692',
    date: new Date('2026-05-08'),
  },
]

export const CVE_ENTRIES = cveEntries.sort((a, b) => {
  const dateDiff = b.date.valueOf() - a.date.valueOf()
  return dateDiff !== 0 ? dateDiff : b.id.localeCompare(a.id)
})
