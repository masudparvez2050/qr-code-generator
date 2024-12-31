import {
  Globe,
  FileText,
  Link2,
  Building2,
  Video,
  Images,
  Share2,
  MessageSquare,
  AppWindowIcon as Apps,
  Ticket,
  Wifi,
} from "lucide-react";

export interface QRCodeType {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  fields: {
    name: string;
    type:
      | "url"
      | "multiurl"
      | "textarea"
      | "text"
      | "email"
      | "tel"
      | "password"
      | "select"
      | "number";
    placeholder: string;
    required?: boolean;
    options?: string[];
  }[];
}

export const qrCodeTypes: QRCodeType[] = [
  {
    id: "website",
    name: "Website",
    description: "Link to any website URL",
    icon: <Globe className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "url",
        type: "url",
        placeholder: "https://example.com",
        required: true,
      },
    ],
  },

  {
    id: "pdf",
    name: "PDF",
    description: "Show a PDF document",
    icon: <FileText className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "url",
        type: "url",
        placeholder: "PDF URL",
        required: true,
      },
    ],
  },

  {
    id: "links",
    name: "List of Links",
    description: "Share multiple links",
    icon: <Link2 className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "urls",
        type: "multiurl",
        placeholder: "Enter URLs",
        required: true,
      },
    ],
  },

  {
    id: "text",
    name: "Text",
    description: "Share any text message",
    icon: <FileText className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "text",
        type: "textarea",
        placeholder: "Enter your text",
        required: true,
      },
    ],
  },

  {
    id: "email",
    name: "Email",
    description: "Send an email",
    icon: <FileText className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "email",
        type: "email",
        placeholder: "recipient@example.com",
        required: true,
      },
      {
        name: "subject",
        type: "text",
        placeholder: "Email subject",
        required: false,
      },
      {
        name: "body",
        type: "textarea",
        placeholder: "Email body",
        required: false,
      },
    ],
  },

  {
    id: "phone",
    name: "Phone",
    description: "Make a phone call",
    icon: <FileText className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "phone",
        type: "tel",
        placeholder: "+1234567890",
        required: true,
      },
    ],
  },

  {
    id: "sms",
    name: "SMS",
    description: "Send a text message",
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "phone",
        type: "tel",
        placeholder: "+1234567890",
        required: true,
      },
      {
        name: "message",
        type: "textarea",
        placeholder: "Message text",
        required: false,
      },
    ],
  },

  {
    id: "wifi",
    name: "WiFi",
    description: "Connect to WiFi network",
    icon: <Wifi className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "ssid",
        type: "text",
        placeholder: "Network name",
        required: true,
      },
      {
        name: "password",
        type: "password",
        placeholder: "Network password",
        required: false,
      },
      {
        name: "encryption",
        type: "select",
        placeholder: "Security type",
        options: ["WEP", "WPA", "WPA2"],
        required: false,
      },
    ],
  },

  {
    id: "location",
    name: "Location",
    description: "Share a location",
    icon: <FileText className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "latitude",
        type: "number",
        placeholder: "Latitude",
        required: true,
      },
      {
        name: "longitude",
        type: "number",
        placeholder: "Longitude",
        required: true,
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Share business information",
    icon: <Building2 className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "name",
        type: "text",
        placeholder: "Business Name",
        required: true,
      },
      { name: "website", type: "url", placeholder: "Business Website" },
      { name: "phone", type: "tel", placeholder: "Business Phone" },
      { name: "address", type: "textarea", placeholder: "Business Address" },
    ],
  },
  {
    id: "video",
    name: "Video",
    description: "Share video content",
    icon: <Video className="w-8 h-8 text-primary" />,
    fields: [
      { name: "url", type: "url", placeholder: "Video URL", required: true },
    ],
  },
  {
    id: "image",
    name: "Image",
    description: "Share image content",
    icon: <Images className="w-8 h-8 text-primary" />,
    fields: [
      { name: "url", type: "url", placeholder: "Image URL", required: true },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    description: "Share social profiles",
    icon: <Share2 className="w-8 h-8 text-primary" />,
    fields: [
      { name: "facebook", type: "url", placeholder: "Facebook Profile URL" },
      { name: "instagram", type: "url", placeholder: "Instagram Profile URL" },
    ],
  },
  {
    id: "app",
    name: "App Download",
    description: "Share app download links",
    icon: <Apps className="w-8 h-8 text-primary" />,
    fields: [
      { name: "ios", type: "url", placeholder: "iOS App Store URL" },
      { name: "android", type: "url", placeholder: "Google Play Store URL" },
    ],
  },
  {
    id: "event",
    name: "Event",
    description: "Share event details",
    icon: <Ticket className="w-8 h-8 text-primary" />,
    fields: [
      {
        name: "title",
        type: "text",
        placeholder: "Event Title",
        required: true,
      },
      { name: "date", type: "text", placeholder: "Event Date", required: true },
      { name: "location", type: "text", placeholder: "Event Location" },
      {
        name: "description",
        type: "textarea",
        placeholder: "Event Description",
      },
    ],
  },
];
