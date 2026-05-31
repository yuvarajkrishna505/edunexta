'use strict';

import React from 'react';

export interface SchemaMarkupProps {
  type: 'Course' | 'FAQPage' | 'EducationalOrganization';
  data: any;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schemaJson: any = null;

  if (type === 'Course') {
    schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': data.title,
      'description': data.description,
      'provider': {
        '@type': 'EducationalOrganization',
        'name': 'EduNexta AI Digital Marketing Institute',
        'sameAs': 'https://www.edunexta.com'
      },
      'hasCourseInstance': {
        '@type': 'CourseInstance',
        'courseMode': 'blended',
        'duration': data.duration,
        'courseWorkload': '12 hours per week'
      },
      'offers': {
        '@type': 'Offer',
        'price': data.price.replace(/[^\d]/g, ''),
        'priceCurrency': 'INR',
        'category': 'Subscription'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': data.rating.toString(),
        'reviewCount': (data.enrolledStudents / 10).toFixed(0)
      }
    };
  } else if (type === 'FAQPage') {
    schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': data.map((faq: any) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  } else if (type === 'EducationalOrganization') {
    schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'EduNexta',
      'url': 'https://www.edunexta.com',
      'logo': 'https://www.edunexta.com/logo.png',
      'description': 'AI-Powered Digital Marketing Institute scaling professionals into elite growth hackers.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Bangalore',
        'addressRegion': 'Karnataka',
        'postalCode': '560001',
        'addressCountry': 'IN'
      },
      'sameAs': [
        'https://twitter.com/edunexta',
        'https://linkedin.com/company/edunexta',
        'https://youtube.com/edunexta'
      ]
    };
  }

  if (!schemaJson) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
    />
  );
}
