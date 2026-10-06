export const OrganizationJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://www.y.uno/#organization",
            "name": "Yuno",
            "legalName": "Yuno",
            "url": "https://www.y.uno",
            "logo": {
              "@type": "ImageObject",
              "url": "https://docs.y.uno/logo/yuno_fulllogo.svg"
            },
            "sameAs": [
              "https://www.linkedin.com/company/yunopay/",
              "https://www.youtube.com/@yunopayments"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://docs.y.uno#website",
            "name": "Yuno API Documentation",
            "url": "https://docs.y.uno",
            "publisher": { "@id": "https://www.y.uno/#organization" }
          }
        ]
      })
    }}
  />
);
