---
title: Token Migration Process [remove tabs copy]
deprecated: false
hidden: true
metadata:
  description: >-
    Token migration is the process by which the card numbers stored in a
    provider are transferred to Yuno's vault. This process involves the
    generation of a new token for each card.
  robots: index
---
### PGP public key

Use our public key to encrypt the PCI-sensitive files you send to Yuno.

\<Tabs>
&#x20; \<Tab title="Sandbox">
&#x20;   Email: \[security-migrations\@y.uno]\(mailto:security-migrations\@y.uno)

&#x20;   Comment: For encrypting sensitive data. Environment: sandbox

&#x20;   Created: 22 Nov 2024

&#x20;   Expires: 22 Nov 2026

&#x20;   Key ID: B342E3D3

&#x20;   Length: 4096

&#x20;   Algorithm: RSA

&#x20;   Fingerprint: 2B37 55FA 426A B1D0 2061 4C6C 919C 4D81 B342 E3D3

&#x20;   \<Shelf classname="cards\_container">
&#x20;     \<div class="first\_row">
&#x20;       \<YunoCard type="pgp-key" title="Public PGP Key" href="https\://yuno-public-keys.prod.y.uno/generic-pgp-keys\_public\_key\_sandbox.asc">
&#x20;         Download the public PGP key for encrypting sensitive data in the sandbox environment.
&#x20;       \</YunoCard>
&#x20;     \</div>
&#x20;   \</Shelf>

&#x20;    \<!-- Tab content -->
&#x20;    \<div class="tab-panel" id="sandbox">
&#x20;      \<p>Email: \<a href="mailto:security-migrations\@y.uno">security-migrations\@y.uno\</a>\</p>
&#x20;      \<p>Comment: For encrypting sensitive data. Environment: sandbox\</p>
&#x20;      \<p>Created: 22 Nov 2024\</p>
&#x20;      \<p>Expires: 22 Nov 2026\</p>
&#x20;      \<p>Key ID: B342E3D3\</p>
&#x20;      \<p>Length: 4096\</p>
&#x20;      \<p>Algorithm: RSA\</p>
&#x20;      \<p>Fingerprint: 2B37 55FA 426A B1D0 2061 4C6C 919C 4D81 B342 E3D3\</p>
&#x20; &#x20;
&#x20;      \<!-- Public PGP Key Download Section -->
&#x20;      \<section class="link\_cards\_container">
&#x20;        \<a class="card"
&#x20;          onclick="window\.location='https\://yuno-public-keys.prod.y.uno/generic-pgp-keys\_public\_key\_sandbox.asc';">
&#x20;          \<div class="svg\_content">
&#x20;            \<svg xmlns="http\://www\.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
&#x20;              \<path
&#x20;                d="M8 1.33334C8.36819 1.33334 8.66667 1.63181 8.66667 2.00001V9.12668L10.7933 6.99998C11.0512 6.74211 11.4487 6.74211 11.7067 6.99998C11.9646 7.25786 11.9646 7.65541 11.7067 7.91328L8.35334 11.2667C8.15842 11.4616 7.84159 11.4616 7.64667 11.2667L4.29334 7.91328C4.03546 7.65541 4.03546 7.25786 4.29334 6.99998C4.55121 6.74211 4.94876 6.74211 5.20667 6.99998L7.33334 9.12668V2.00001C7.33334 1.63181 7.63181 1.33334 8 1.33334ZM2.66667 13.3333C2.29847 13.3333 2 13.6318 2 14C2 14.3682 2.29847 14.6667 2.66667 14.6667H13.3333C13.7015 14.6667 14 14.3682 14 14C14 13.6318 13.7015 13.3333 13.3333 13.3333H2.66667Z"
&#x20;                fill="#513CE1" />
&#x20;            \</svg>
&#x20;          \</div>
&#x20;          \<h4>Public PGP Key\</h4>
&#x20;        \</a>
&#x20;      \</section>
&#x20;     &#x20;
&#x20;      \<br />
&#x20; &#x20;
&#x20;      \<details class="expandable-card">
&#x20;        \<summary class="expandable-summary">
&#x20;          \<span class="expandable-title">Sandbox Key\</span>
&#x20;          \<div class="expandable-icon-container">
&#x20;            \<svg class="icon icon-expand" width="20" height="20" xmlns="http\://www\.w3.org/2000/svg" viewBox="0 0 16 16">
&#x20;              \<path fill-rule="evenodd"
&#x20;                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
&#x20;            \</svg>
&#x20;            \<svg class="icon icon-close" width="20" height="20" xmlns="http\://www\.w3.org/2000/svg" viewBox="0 0 16 16">
&#x20;              \<path fill-rule="evenodd"
&#x20;                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
&#x20;            \</svg>
&#x20;          \</div>
&#x20;        \</summary>
&#x20;       &#x20;
&#x20;        \<br />
&#x20;       &#x20;
&#x20;        \<div class="expandable-content">
&#x20;          \<pre>-----BEGIN PGP PUBLIC KEY BLOCK-----
&#x20; &#x20;
&#x20;  xsFNBGdAg3ABEAC52pkHCiwyGZX+7zvEI7m2m3CmUohZ+uwNR3le/ozcbvPkTUln
&#x20;  Ucf0ppl1ZTBRt6G7XMIQ6e1Y/RxQjWxKyvnabi0RlNOHSJmy07Mt5+U4ZG4Vnj95
&#x20;  Pw3gGR/WhyJNLk01V5Ss/iRrx1NiDKTGNwLCTo1/tW1hBKq3j63ZhNhSY8s638LS
&#x20;  R0PPvUFLMUddQoBFAMH/SLiSdHEI1UYjfPSg/IvIsYceRTMdAfFU9T/FiJnEvdlk
&#x20;  MN2RD6wi9jlqPp6DBoSwaX0MDnbNm+Dld7VNIC7/3dfGncCjhL84eAdYnu+TaHBS
&#x20;  BAHnd2ebmtEpSFA9yWWaWp2A7F9l6mLCDL+CRSvQLyFobtCKz59YEKeMGVkY0GsS
&#x20;  9+1nafexDObK8cDP7UH5xceQcUwtsCbYnYluKfvCcwtH+YTWRPVYoNP9w3d4sgoP
&#x20;  v1YrUVHkw18oUsAPImqOIZSNWXfrih2wFLS5wvEVhdCoJ7Y7cypfeCR7rSIVlZI6
&#x20;  WW/Bqp+DUFVePu/jTkzwAZT7isUh44jwMUf77HgI6VlH31VSBQRucLFuohkgDyil
&#x20;  G+WTYoV5sURh+AoWy3D4VgV6jtLFwOk56qsGVCIFws4LFiUeiV1sTnTNdouKXcUs
&#x20;  5/H22XAVnDnctrQyZbBt4f5Uj0FOQ+zi4L7IYvGveIGTmUvbvXVPs6mmmQARAQAB
&#x20;  zWtzZWN1cml0eS1taWdyYXRpb25zQHkudW5vIChGb3IgZW5jcnlwdGluZyBzZW5z
&#x20;  aXRpdmUgZGF0YS4gRW52aXJvbm1lbnQ6IHNhbmRib3gpIDxzZWN1cml0eS1taWdy
&#x20;  YXRpb25zQHkudW5vPsLBiAQTAQgAMgUCZ0CDcQIbDgUJA8JnAAILCQIVCAIWAgIe
&#x20;  ARYhBCs3VfpCarHQIGFMbJGcTYGzQuPTAAoJEJGcTYGzQuPTQ0YP/j2lXgS1KB2O
&#x20;  +2kpuXR1pUBkV2ve8vO6xQ3ZOT8F8S+WCtqPPXh7+RlRKirPOPsRYXklsJc92BbV
&#x20;  rlqZAIGFX2Ut5UqxZsmudKgh23l8Uk/Y0YgzZ8G/hni15kEV7Tk5Pp4Qe0hFQxYp
&#x20;  bLjLJNb2O0xouozf9tIiiN2oq6mujsudEAYHyIClMArGBm/rEFoM+RagJAhTrx6u
&#x20;  y1Wz8VcQ6LGbL64cEH5Ei4kqTS5uNthHn8duBBJk69ObcoYvtFMYlMRS7FOka3iW
&#x20;  BYGeJHZ0yRuzdbMrjW3cwpDR/3O6UUOBbNTqc29XM+OFBHduETzLjFh0wafuJpCo
&#x20;  L6Tf5kEEmjCS2WODhXESCMELqf4VwhdJqJ16M9zY6BLb4d0p9YewCeABZU7WKMZ+
&#x20;  JupyhS/qQzama1+4PiJ00DDDjczyvXFakqvFRGnSuBWDZyTZ5qpgRoLQKSkvykFm
&#x20;  gcZ82/OFKJbQxqh8CZAe+AQ2fjsxq/E+Teg5wX1KIqChQ8tQ+BNyhRLtoKGfzJrv
&#x20;  AzBRkIsdfmxkLgrjNXDV23Eac7ZfmmYkYuKuJlgyqzRUsPZ59Ftx/f+7a0Ru83cd
&#x20;  rg6IdBJRK7lHZAfBdeKJ+hUoaZJfUhvax1v6OC0dC6bWh/OkDexi5pW8KNZYPqSJ
&#x20;  lwl/1RVOFp1KJQVbSYl+Y9Pj3USGvEXCzsFNBGdAg3EBEADmmWYqimQfEQPPU8Kw
&#x20;  AuX77RaTCG7k/+kfYQ9vQJ8xecJPSp1jGc382nR51wsqe9V21Pf+pgmvSJYUYxeU
&#x20;  EdJoVu1U1YxubyHZR4Z9gu0x1bPcXca7NcGIsMgKo5W5Deeua8cMFqCwI40/7B+k
&#x20;  3k2tbJtJFEHeekGnPtxGS/XkHKdp5nFep1sWiikMu7X1bi+61PEY7pKj6QlXhAGX
&#x20;  nHz1E5WUZvmYTnF3cMrcdqmr8m80fGyTGdtntXXKfk6kcC6rauYT4i3FQ67+hW3G
&#x20;  fIdthUvX3RjRJY9xb8L5UiZel6EbUw/QqBMl6VAmikWDm3+BD4bjZVCEQ1gjQWy9
&#x20;  oJ0d/jvhS1j8bN6p5nC9CuoObJjBq7OcSa4IebvMVJ+xCzHUNCtA8inRD+iZGse6
&#x20;  AUt+dyeTc/oHatsavokn68Wk5fl+Lz+pKS1exFqCtDOsLwsLVCNd4nTFYN8s/PDK
&#x20;  HCo7nofx1nx5gPKRDEsmYyEAoi2gUkOqJaxnu2yTlW5i8ZdfDA/BO5ym5fVHP0CO
&#x20;  9PwuEWSEA1TfAZSh4gdc39K+ZDqXhRRUt++xNh+GT1oREYSojRGy2AxuBZ+BvFKX
&#x20;  UIo2f1oTxcRNn9MvMdV2V+UD8gadnuTLcqn1r4tZgqYd1O9L2K5uImfLiWmG8yRX
&#x20;  vXVQtAqAqFmxLNliXW8xCGd/xQARAQABwsOsBBgBCAAgBQJnQINyAhsMFiEEKzdV
&#x20;  +kJqsdAgYUxskZxNgbNC49MCQAkQkZxNgbNC49PBdCAEGQEIAB0FAmdAg3IWIQRe
&#x20;  HbaMqAzJVgZwYyJlfHmB2iXPiQAKCRBlfHmB2iXPiV3cEACUasgxhAb4lT4RCl+e
&#x20;  6geAmt8TulLIhdW2Jwdy81BD8ZUWRK7cOG2OBIB1lvL0KcbDNVU77kKFekMSo6Xa
&#x20;  73a1QzVJvViWSoWSvrw/w3Zvlzhv5DALSwKoA5j7r70HPGDjCsiSguEcQDZJpdyu
&#x20;  w6OdRaQ6uDE3dlSpenj5F3+gsrruz2w0lFMLPckDQVwECDi7Ex2Fk001T+SfitpG
&#x20;  yDe21Ul8I50YFijhQKgEDAEYe+2vVzyxRmGfqe2F6/VJCk1iVvFGHGNZ67uoSrs+
&#x20;  GyLlzPX0vkoGqBUYdO/G6oFiCRJqKuQonEfAXpX/vYPe8QA/8zxOzbzSkO1KU0vb
&#x20;  y1d3hHWcokQOISTgQmupKiFDHqTznofbMpZ4WXCZpwMtIATxMz/qU/YSd0zYjEvr
&#x20;  5GIxMEdBZnG/yHL2RqTrNVAHpb6hrPtbgPi6187/2A7DNPR4HdKdbZOrCUnQLYzn
&#x20;  u2OiWq1+E+h63Wb6Q1DFkt+W8BTEscWwlCzZiIk9+UV4xm2seij0Bw/uZy8762Rg
&#x20;  +Yw5qokwD8DIu470if4fNjvAF1ovK9Aoo9LcOwX2+u0X/NMkIictYbMcNQhMvHeR
&#x20;  S4hYjU6wb1tapvWl7hcDFd1VxzQHWzhJz/d02nUE0+5WUPLFJa9G9hZKJqJvhDzW
&#x20;  pAomfVxM52nQQ2Yhw9FR/ohq8hLFD/0bm//K6vrgb1G7zi1UIHlBxIiW7cItYvz/
&#x20;  ZJiAGMKmlv+rWolLgkhF0MD9f8bTKOskY6bvi4SpCtk0v/hXVuvN0MZBQ+FCTBNn
&#x20;  7NiL2gvp0sPFrk05SlVmWkli3IB/em/MBG18MkXwW1u1+cGd+r+zJhI+eYba0Cqq
&#x20;  BNNTH7W7yuXRyQykmbjei6/aNj2v9c95XrQj5MRCUQ6EKmBol0rByx2713anO+Rj
&#x20;  WJMzvovg/s41bRx6bvD7bZe7UScBrYh1doNz1gWyFDbJZLmDjt0OgH7fCIKfjD0l
&#x20;  leq/H5fSYR5kz+/yt97Do3cv1cMeDsxq1nvhNv4TswjBMHqBJGFX6XzsXQPd1h+M
&#x20;  QdULBMarHApT9hcvbL24FV8D50sf31Yjc68Q74r9ay0RoNpAxvwjQS3S/FwjMSPp
&#x20;  4rjt3xAgx7tOAloS1Cw3FiIH9SKp2OU1/c70LRMbbOGqJsI8Z+VFBKUPImO/g9cT
&#x20;  IXQdh2K6TPYMzkR6FsIZEBLRjoktZ1uYONgp057AbFtMWuizLmj5/Jz2Tgq3t8xL
&#x20;  r7jjO9fOdoRKou/ivQ0lxEUg+EaZQXFD+MOZd57BfAy4YBrVgYA8YVRhEh7XBeql
&#x20;  JGmwCqob1k0R3zmx6+EJdJcoW24MUEG6jeitvyy2d07sxKmSl/3vQ7mqpWtm3ZcC
&#x20;  JiRYUpjGug==
&#x20;  \=LuK0
&#x20;  \-----END PGP PUBLIC KEY BLOCK-----\</pre>
&#x20;        \</div>
&#x20;      \</details>
&#x20;    \</div>

&#x20; \<Tab title="Production">
&#x20;   Email: \[security-migrations\@y.uno]\(mailto:security-migrations\@y.uno)

&#x20;   Comment: For encrypting sensitive data. Environment: production

&#x20;   Created: 22 Nov 2024

&#x20;   Expires: 22 Nov 2026

&#x20;   Key ID: 73D3D88A

&#x20;   Length: 4096

&#x20;   Algorithm: RSA

&#x20;   Fingerprint: 5160 7134 4C00 D270 93FB C450 19ED AACD 73D3 D88A

&#x20;   \<Shelf classname="cards\_container">
&#x20;     \<div class="first\_row">
&#x20;       \<YunoCard type="sdk-integrations" title="Public PGP Key" href="https\://yuno-public-keys.prod.y.uno/generic-pgp-keys\_public\_key\_production.asc">
&#x20;         Download the public PGP key for encrypting sensitive data in the production environment.
&#x20;       \</YunoCard>
&#x20;     \</div>
&#x20;   \</Shelf>

&#x20;    \<div class="tab-panel" id="production">
&#x20;      \<p>Email: \<a href="mailto:security-migrations\@y.uno">security-migrations\@y.uno\</a>\</p>
&#x20;      \<p>Comment: For encrypting sensitive data. Environment: production\</p>
&#x20;      \<p>Created: 22 Nov 2024\</p>
&#x20;      \<p>Expires: 22 Nov 2026\</p>
&#x20;      \<p>Key ID: 73D3D88A\</p>
&#x20;      \<p>Length: 4096\</p>
&#x20;      \<p>Algorithm: RSA\</p>
&#x20;      \<p>Fingerprint: 5160 7134 4C00 D270 93FB C450 19ED AACD 73D3 D88A\</p>
&#x20; &#x20;
&#x20;      \<!-- Public PGP Key Download Section -->
&#x20;      \<section class="link\_cards\_container">
&#x20;        \<a class="card"
&#x20;          onclick="window\.location='https\://yuno-public-keys.prod.y.uno/generic-pgp-keys\_public\_key\_production.asc';">
&#x20;          \<div class="svg\_content">
&#x20;            \<svg xmlns="http\://www\.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
&#x20;              \<path
&#x20;                d="M8 1.33334C8.36819 1.33334 8.66667 1.63181 8.66667 2.00001V9.12668L10.7933 6.99998C11.0512 6.74211 11.4487 6.74211 11.7067 6.99998C11.9646 7.25786 11.9646 7.65541 11.7067 7.91328L8.35334 11.2667C8.15842 11.4616 7.84159 11.4616 7.64667 11.2667L4.29334 7.91328C4.03546 7.65541 4.03546 7.25786 4.29334 6.99998C4.55121 6.74211 4.94876 6.74211 5.20667 6.99998L7.33334 9.12668V2.00001C7.33334 1.63181 7.63181 1.33334 8 1.33334ZM2.66667 13.3333C2.29847 13.3333 2 13.6318 2 14C2 14.3682 2.29847 14.6667 2.66667 14.6667H13.3333C13.7015 14.6667 14 14.3682 14 14C14 13.6318 13.7015 13.3333 13.3333 13.3333H2.66667Z"
&#x20;                fill="#513CE1" />
&#x20;            \</svg>
&#x20;          \</div>
&#x20;          \<h4>Public PGP Key\</h4>
&#x20;        \</a>
&#x20;      \</section>
&#x20; &#x20;
&#x20;      \<br />
&#x20; &#x20;
&#x20;      \<details class="expandable-card">
&#x20;        \<summary class="expandable-summary">
&#x20;          \<span class="expandable-title">Production Key\</span>
&#x20;          \<div class="expandable-icon-container">
&#x20;            \<svg class="icon icon-expand" width="20" height="20" xmlns="http\://www\.w3.org/2000/svg" viewBox="0 0 16 16">
&#x20;              \<path fill-rule="evenodd"
&#x20;                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
&#x20;            \</svg>
&#x20;            \<svg class="icon icon-close" width="20" height="20" xmlns="http\://www\.w3.org/2000/svg" viewBox="0 0 16 16">
&#x20;              \<path fill-rule="evenodd"
&#x20;                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
&#x20;            \</svg>
&#x20;          \</div>
&#x20;        \</summary>
&#x20;       &#x20;
&#x20;        \<br />
&#x20;       &#x20;
&#x20;        \<div class="expandable-content">
&#x20;          \<pre>-----BEGIN PGP PUBLIC KEY BLOCK-----
&#x20; &#x20;
&#x20;  xsFNBGdAg2sBEAC4NW7xG06SGZcNCFVXreQsW8l3YGdcNo4y2ks0MZw8B1k6BwMJ
&#x20;  LqJjkiRouWAmRMCbP0Qauw4UPhhVlrIx9MsFrvJFgi/cnOGnwujVNIuhNw8S8cUZ
&#x20;  1K1+5ZAsxuc/hKcSQRH0Hp94UNP76seJgC0U6d422fW2EKG7VN2l1BcM4NlBmOuD
&#x20;  cQ+fOds+ACsBAQiQjL5ZA/sh6t/7cjUdCQhNK8eK5vylx1lKhHb6T1IvB+B/a6Pt
&#x20;  5xxEKNkBgwdQAucDFLFA3ypZsksy8/t9Y7AYw82Teo3z91cQxqiv1C6T62N3+YZ/
&#x20;  b48iNzfkml4kxfq15cNgdpxF+HJ/O6EHzSajbPT3KYsCFW9xS5aYOGTFSfgY+1qL
&#x20;  518YP72t9okj5HalUgDp6YCLuSr5ns+Z8t8K+cgGNjy08GwuRJKhDidvZBzgGMw6
&#x20;  bWavl1obnfThjb3VIHe0WEx/FQuQGGvJzi2EFI+Rne5nT0Q1ayv99kUglfXNdVOL
&#x20;  LDsaCwZwefw2Z7+7hNGiF08NQXxUE05tia5ElsmSl9Mo0OeG7UsVuYHVqwDnLs4W
&#x20;  dC6br3S3p9XKG9mopXOn8Y4Iu9WMhW3ZZHOlrFCzHip5PyBIyl3265LWfs/If8dc
&#x20;  vCKDXC/Hgjxdy7yNzgqguqgwJRnMrXrHx6s3MMHw/1YhNM6uwUjg3WADwwARAQAB
&#x20;  zW5zZWN1cml0eS1taWdyYXRpb25zQHkudW5vIChGb3IgZW5jcnlwdGluZyBzZW5z
&#x20;  aXRpdmUgZGF0YS4gRW52aXJvbm1lbnQ6IHByb2R1Y3Rpb24pIDxzZWN1cml0eS1t
&#x20;  aWdyYXRpb25zQHkudW5vPsLBiAQTAQgAMgUCZ0CDbAIbDgUJA8JnAAILCQIVCAIW
&#x20;  AgIeARYhBFFgcTRMANJwk/vEUBntqs1z09iKAAoJEBntqs1z09iKXJQQAIvBv0sa
&#x20;  C9Brd4ylSzznZdQQoGIilsGoeiWLNV6Gh6YEODspWljjeYKQl6SEb3NsoVrpB7A5
&#x20;  5UNYMGykcvly+fR8UvhNEiJO6vTVCRZnYU43MYLgC35CPj1798egw50GusVoSjKu
&#x20;  960tMOz6DUh3yBO2VSxveaOQ6pIYNqi4HtVFIzvcrpgY1/wIV4jpyYnRtJQEt+M4
&#x20;  LjD9rnkl7eGHeYQV6tpMjoMkLSWApdk5aDoUqmkvXae5aa7ab7iH/7p53oXxVQM7
&#x20;  lqjuNGTgmiJ48gcyHp6aF6M1hbNpoekS63FoGgSRr1h+oB1NlqCokhP8tIjbNbAv
&#x20;  rh3371lfPS8dmVq6rUYQwGxHt1XS5682wRw0ZdvsiGY7VjuZAHgGi0f2cEh3dsqy
&#x20;  Xa3+rbQ1vKX6lIvmmqPiv7Ggo2LLJXfRfg3Q8s35CCvccz1qQcuUl+HI8NQLbiyW
&#x20;  mpelG0+sOl7KHYg7c0HpS8756Eax3sSnr57Jb7Rx88NIF+hH8zE8kBL6OHkFnE+L
&#x20;  yLIbCYzmCSxK0ktvcnMjYb1BGmPxfSWgPEyXrI34MtfyRXpeLaDSBfKzGNL8fLLT
&#x20;  olLEABrWmn6Xvj6DeZAA+xoFmTUqdLYsZ/i/RLZ5lzQv3xp8Uks09dy2mm/dAVxS
&#x20;  4lox2wuJRalx5MZkqrSRZAkjyQMu6EwGiiQ1zsFNBGdAg2wBEACutTIUvApmEQkX
&#x20;  EBcAmDFUkQSquiR4EhmW8icPPWTabszNZu3LXLf/ou1v/dcLvkyyDUFZIezYUwdx
&#x20;  UXBYDFrXmPqddSx5TOSCOvY79pKrrx5S//40RTs9PM2eC1ufggT7fGVvNj8irYPh
&#x20;  jUDtI8LzQXedAMWNB5PLXPZEBnEnaE45PU0s5nREoLK14ldEQl1nCAqAFlEPTztQ
&#x20;  C+ILAprwSZ3qnj0pGYy+uRfmIZD51KpriGdRQqWDdbImM28SNh7tv3jPQenm5oCG
&#x20;  cavOZzhA54B+w2Hgc4aGER0qY5eZsd/YEGaVevjGHaEDE/Xm6ctMSuLKgg6A/zNH
&#x20;  F7kKcS1/5uXXQ0mlk15zRgMJcxNctrKFIYW78R1ECY8vIdN0aMd2/fRgaawwuTz2
&#x20;  WcTlLgsG84bAKcccsQnTwCOBxHR8qt3u+GKCEkIcaQVC/FNjP47iSzyWb1a0KeEV
&#x20;  4TJ9RtWdlj1DK3alGkvbexuCzqZ+1p8O+lCIsEiL5Cz3YeLfLebph1Z40o0HdGw3
&#x20;  XS/e0GnaBZpqzo4MCqud26x9fYX9kP+SHzNAacSSLfc/WJvJOLyuIDXvwiJu7QDC
&#x20;  SDMeS4vLiBmfcfYiBxUKXteRcS2g/9B5tkzKVLWv9xkMXIhsxsyIFDiepUoT4uEN
&#x20;  zPvOR8fbpzI+XkNdAOpm6gKyCTRxeQARAQABwsOsBBgBCAAgBQJnQINtAhsMFiEE
&#x20;  UWBxNEwA0nCT+8RQGe2qzXPT2IoCQAkQGe2qzXPT2IrBdCAEGQEIAB0FAmdAg20W
&#x20;  IQRAK7d6Jh6QEsLrtCje87+APhkLfwAKCRDe87+APhkLf9AqD/9QmNmEaSUZ6ujy
&#x20;  7resqaWT4nSMErhT3TNM8B1FPwF63Igt0HUnKqe4XSy840kKJsTY+ssGcLpbTTxv
&#x20;  CX/DLtR7No5G1WBAr3MZos7GfFhnb2tApDzQdmucHliKLVe2zSiyqvMGiK1irvXy
&#x20;  GKi6Dfvoobw54qkCeD7upz+z6eZAQYnDqh2xlGl7uc6OcgaJgctMhOA8jhlmLIrz
&#x20;  gk/MBXRgZXGfJ0/DZe2JTl7vw3XIUB62XnV3vpHU/UxM5UWpA87m14Lh8SNAvT+l
&#x20;  L8Y1wZ5DcQ1g83oO5NI/DwWorlqOeyhRU8a1a3Kd0aZ6bSWCbZadU4c6ciwvwpnS
&#x20;  MQ5nc4iX1bFsuN8z8WGQ/io4cPMXQbNFBQ22OgnSpxEVS3akDkQOJ25hJeUZaFZU
&#x20;  91CJVlknQipwvpVG3RuuOvTJstYxTKJ8Leg1IB0zo7QhlaMNTu/yWyr0WoJO52Jh
&#x20;  IMoykpfPY6gowKBGi6EZpNjiKoyElkBU1js47wMdqONfBZxyupJpAM2GeBWs0cYS
&#x20;  j7pUL68ah/RMslMuC6rKtjDytVChQJz/nXcxDQeBliYMMedDP3a6FksBmmdJKphw
&#x20;  ZbmVGAbNJd2TSFEsiYZjPJ+bH8SafjcRVVqaRw3cGReyJmwv1EhxhZR+dsZAjdnB
&#x20;  RX0jQSGjQjcWfyUTGmnpipgCNnJOkEFrEACm4QErrplv2jIAADFytyk/VL+3D6RB
&#x20;  0XTrhb0FqLgmVEqYJPuh9z3KkMpQQk9spd3uNBkuBGkTehf4WBWIRcGWIChpVNb+
&#x20;  YabmXfqxYhoRKnhoMS4vRfOZJbdzdBZ7tsjsz072kGi03nK9/B5RnBR2Amj2hry/
&#x20;  BdzZd+vuAUiblC7DJ8M9SAMBAHyXAJFKfgoYs9OxBdQqSePVKG8B2B2Vu12yeJWc
&#x20;  p00yrqfc6c5IvamRvKZ73EYAbt6uf/5ED969QngFeB4NhSUCH7L1h+67lKVjELw4
&#x20;  l2wA4kd2ZxEERfTVRx0/ZptxW2nkVm4iK2R/0DDMDyPZ5VfPo+XA6Y794kWJ/C2E
&#x20;  sX9T9ti6GK6taIZ4vdcR04CMFMNfOSrcnMWN4GDP6BQpYEOu2pOHqUpQAinFCSi9
&#x20;  umfNdhaPchGiHk2KjvXAgPJ6j4AYGadfM24qT6m8GLEtanL2pFGFNPOw8D03fGkV
&#x20;  yhsfHiamgAnnL2mz0khePCn8aTyUMrmSwUc2e5Agj1naMJetd//WnzaPFvWViy+l
&#x20;  V+EqUCVP6YPNq8PHD8ZOAy5T8GO+wNahsKiUaxAhn2kjCXhZRqwWDiJLCn3Wge6B
&#x20;  n4nHVHtvlw/ptDFyrDP2fUkk1XwmN2StG5y74eVN6HlvrTkwL5HmxQKGlSwZC1gK
&#x20;  sNugHSYrj1RUuA==
&#x20;  \=ik2s
&#x20;  \-----END PGP PUBLIC KEY BLOCK-----\</pre>
&#x20;        \</div>
&#x20;      \</details>
&#x20;    \</div>

&#x20; \</Tab>
\</Tabs>