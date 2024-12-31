import { Globe, FileText, Link2, Contact2, Building2, Video, Images, Facebook, Instagram, Share2, MessageSquare, Music, Menu, AppWindowIcon as Apps, Ticket, Wifi } from 'lucide-react'

export interface QRCodeType {
  id: string
  name: string
  description: string
  icon: JSX.Element
  fields: {
    name: string
    type: string
    placeholder: string
    required?: boolean
  }[]
}

export const qrCodeTypes: QRCodeType[] = [
  {
    id: 'website',
    name: 'Website',
    description: 'Link to any website URL',
    icon: <Globe className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: 'url',
        type: 'url',
        placeholder: 'https://example.com',
        required: true,
      },
    ],
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Show a PDF',
    icon: <FileText className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: 'url',
        type: 'url',
        placeholder: 'PDF URL',
        required: true,
      },
    ],
  },
  {
    id: 'links',
    name: 'List of Links',
    description: 'Share multiple links',
    icon: <Link2 className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: 'urls',
        type: 'textarea',
        placeholder: 'Enter URLs (one per line)',
        required: true,
      },
    ],
  },
  {
    id: 'vcard',
    name: 'vCard',
    description: 'Share a digital business card',
    icon: <Contact2 className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Full Name',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
      },
      {
        name: 'phone',
        type: 'tel',
        placeholder: 'Phone',
      },
    ],
  },
]

