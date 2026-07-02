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
    id: 'CVE-2026-56826',
    packageName: 'Shopper',
    severity: 'Moderate',
    summary:
      'Missing function-level authorization on Settings Livewire actions let low-privileged users delete tax, zone, shipping, and carrier configuration used by checkout.',
    advisoryUrl:
      'https://github.com/shopperlabs/shopper/security/advisories/GHSA-f7h9-qv4x-9x57',
    blogUrl: '/blog/shopper-cve-2026-56826',
    date: new Date('2026-07-02'),
  },
  {
    id: 'CVE-2026-14358',
    packageName: 'MediaWiki Charts Extension',
    severity: 'Moderate',
    summary:
      'Stored XSS in Wikimedia chart pie tooltips allowed Data namespace field titles to reach the ECharts HTML tooltip renderer.',
    advisoryUrl: 'https://www.cve.org/CVERecord?id=CVE-2026-14358',
    blogUrl: '/blog/wikimedia-chart-cve-2026-14358',
    date: new Date('2026-07-02'),
  },
  {
    id: 'CVE-2026-54717',
    packageName: 'SilverStripe CMS',
    severity: 'Moderate',
    summary:
      'Stored XSS in page list view breadcrumbs let attacker-controlled page titles execute in the SilverStripe CMS admin interface.',
    advisoryUrl:
      'https://github.com/silverstripe/silverstripe-cms/security/advisories/GHSA-w3cp-g2pf-65wh',
    blogUrl: '/blog/silverstripe-cve-2026-54717',
    date: new Date('2026-06-24'),
  },
  {
    id: 'CVE-2026-50539',
    packageName: 'Xibo CMS',
    severity: 'Moderate',
    summary:
      'Missing object-level authorization on notification export let any authenticated user download arbitrary notification attachments by iterating IDs.',
    advisoryUrl:
      'https://github.com/xibosignage/xibo-cms/security/advisories/GHSA-p4pg-v57g-7jf6',
    blogUrl: '/blog/xibo-cve-2026-50539',
    date: new Date('2026-06-22'),
  },
  {
    id: 'CVE-2026-54256',
    packageName: 'Winter CMS',
    severity: 'Moderate',
    summary:
      'The backend FileUpload widget trusted posted file IDs globally, letting any authenticated backend user target unrelated attachment records and modify metadata or ordering.',
    advisoryUrl:
      'https://github.com/wintercms/winter/security/advisories/GHSA-3277-h8g9-qj5f',
    blogUrl: '/blog/winter-cve-2026-54256',
    date: new Date('2026-06-21'),
  },
  {
    id: 'CVE-2026-54562',
    packageName: 'Cloudreve',
    severity: 'Moderate',
    summary:
      'Non-admin users granted remote download permission could make Cloudreve fetch loopback and internal URLs, then read the imported response body from their own files.',
    advisoryUrl:
      'https://github.com/cloudreve/cloudreve/security/advisories/GHSA-x756-g4x3-c64m',
    blogUrl: '/blog/cloudreve-cve-2026-54562',
    date: new Date('2026-06-21'),
  },
  {
    id: 'CVE-2026-10860',
    packageName: 'MISP',
    severity: 'High',
    summary:
      'A CRUD delete helper precedence bug let real HTTP DELETE requests bypass failed validation, leading to runtime-confirmed cross-organisation galaxy deletion.',
    advisoryUrl: 'https://cve.threatint.eu/CVE/CVE-2026-10860',
    blogUrl: '/blog/misp-cve-2026-10860',
    date: new Date('2026-06-21'),
  },
  {
    id: 'CVE-2026-55383',
    packageName: 'InvoiceShelf',
    severity: 'High',
    summary:
      'Public customer document tokens could cross company boundaries through EmailLog type confusion, and JSON endpoints kept accepting expired tokens.',
    advisoryUrl:
      'https://github.com/InvoiceShelf/InvoiceShelf/security/advisories/GHSA-73q7-2953-8gvx',
    blogUrl: '/blog/invoiceshelf-cve-2026-55383',
    date: new Date('2026-06-17'),
  },
  {
    id: 'CVE-2026-54258',
    packageName: 'ZoneMinder',
    severity: 'Moderate',
    summary:
      'Direct event media endpoints let low-privileged users fetch private snapshots, frames, videos, and HLS media from monitors they were denied access to.',
    advisoryUrl:
      'https://github.com/ZoneMinder/zoneminder/security/advisories/GHSA-vj5r-pc2v-gfwv',
    blogUrl: '/blog/zoneminder-cve-2026-54258',
    date: new Date('2026-06-13'),
  },
  {
    id: 'CVE-2026-53634',
    packageName: 'Sharp',
    severity: 'Moderate',
    summary:
      'Quick Creation Command endpoints missed create authorization checks and let authenticated Sharp users bypass create permission on configured entities.',
    advisoryUrl:
      'https://github.com/code16/sharp/security/advisories/GHSA-vmwx-m75v-qvch',
    blogUrl: '/blog/sharp-cve-2026-53634',
    date: new Date('2026-06-10'),
  },
  {
    id: 'CVE-2026-53521',
    packageName: 'Nezha',
    severity: 'Moderate',
    summary:
      'A stored future DDNS profile ID could later resolve to another user profile and be consumed by the DDNS worker in attacker server context.',
    advisoryUrl:
      'https://github.com/nezhahq/nezha/security/advisories/GHSA-39g2-8x68-pmx8',
    blogUrl: '/blog/nezha-cve-2026-53521',
    date: new Date('2026-06-10'),
  },
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
