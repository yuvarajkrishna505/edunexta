import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import SchemaMarkup from '@/components/core/SchemaMarkup';

export const metadata: Metadata = {
  title: 'EduNexta | AI-Powered Digital Marketing Institute',
  description: 'redesign your career with India\'s elite AI-driven performance marketing academy. Features 100% placement guarantees, Google/Meta certifications, and direct 1-on-1 industry mentorship.',
  keywords: ['AI Digital Marketing', 'Performance Marketing Program', 'Hubspot Automation Course', 'SEO Growth Hack', 'Programmatic Ads training', 'GrowthSchool scaler upgrad course'],
  metadataBase: new URL('https://www.edunexta.com'),
  openGraph: {
    title: 'EduNexta | Elite AI-Powered Digital Marketing Program',
    description: 'Master AI-driven campaigns, programmatic bidding, and CRM operations with Ex-Meta & Google leaders.',
    url: 'https://www.edunexta.com',
    siteName: 'EduNexta',
    images: [
      {
        url: 'https://app-companion-430619.appspot.com/static/og.png',
        width: 1200,
        height: 630,
        alt: 'EduNexta AI Marketing'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduNexta | Master AI Digital Marketing',
    description: 'Learn SEO optimization, Paid ad budgets hyper-scaling, and operations automation live from APAC growth leads.',
    images: ['https://app-companion-430619.appspot.com/static/og.png']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Dynamic Schema SEO Tag */}
        <SchemaMarkup type="EducationalOrganization" data={{}} />
        
        {/* Simulated Google Analytics & Meta Pixel for CRO & conversion tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SIMULATED_ID', {
                'send_page_view': true,
                'custom_map': {'dimension1': 'placement_target'}
              });
              
              // Simulated Meta Pixel Init
              !function(f,b,e,v,n,t,s){n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              f._fbq||(f.fbq=n);n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1234567890_SIMULATED');
              fbq('track', 'PageView');
            `
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
