"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QRCodeType } from "@/lib/qr-types";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import jsPDF from "jspdf";

interface QRCodeFormProps {
  type: QRCodeType;
  onBack: () => void;
  onSubmit: () => void;
}

export function QRCodeForm({ type, onBack, onSubmit }: QRCodeFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let value = "";

    switch (type.id) {
      case "website":
        value = formData.url || "";
        break;
      case "vcard":
        value = `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.name}\nEMAIL:${formData.email}\nTEL:${formData.phone}\nEND:VCARD`;
        break;
      default:
        value = Object.values(formData).join("\n");
    }

    setQrValue(value);
    onSubmit();
  };

  const handleDownload = (format: "png" | "svg" | "pdf") => {
    const svg = document.querySelector(".qr-code-svg") as SVGSVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image(size, size);
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0);
        if (format === "png") {
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `qr-code-${type.id}.png`;
          downloadLink.href = pngFile;
          downloadLink.click();
        } else if (format === "svg") {
          const svgBlob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8",
          });
          const svgUrl = URL.createObjectURL(svgBlob);
          const downloadLink = document.createElement("a");
          downloadLink.download = `qr-code-${type.id}.svg`;
          downloadLink.href = svgUrl;
          downloadLink.click();
        } else if (format === "pdf") {
          const pdf = new jsPDF();
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            size / 4,
            size / 4
          );
          pdf.save(`qr-code-${type.id}.pdf`);
        }
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">2. Enter your content</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {type.fields.map((field) => (
                  <div key={field.name}>
                    <Label htmlFor={field.name} className="mb-1">
                      {field.name}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" className="w-full">
                  Generate QR Code
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {qrValue && (
            <motion.div
              key="qr-code"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    3. Customize your QR Code
                  </h2>
                  <Tabs defaultValue="design" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="design">Design</TabsTrigger>
                      <TabsTrigger value="logo">Logo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="design" className="space-y-4">
                      <div>
                        <Label htmlFor="qr-color">QR Code Color</Label>
                        <Input
                          id="qr-color"
                          type="color"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bg-color">Background Color</Label>
                        <Input
                          id="bg-color"
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="size">Size</Label>
                        <Slider
                          id="size"
                          min={100}
                          max={400}
                          step={10}
                          value={[size]}
                          onValueChange={(value) => setSize(value[0])}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="logo" className="space-y-4">
                      <div>
                        <Label htmlFor="logo-upload">Upload Logo</Label>
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Logo
                        </Button>
                      </div>
                      {logo && (
                        <div className="mt-4">
                          <Image
                            width={150}
                            height={150}
                            src={logo}
                            alt="Uploaded logo"
                            className="max-w-full h-auto"
                          />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                  <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <QRCodeSVG
                        value={qrValue}
                        size={size}
                        fgColor={qrColor}
                        bgColor={bgColor}
                        level="H"
                        includeMargin
                        imageSettings={
                          logo
                            ? {
                                src: logo,
                                x: undefined,
                                y: undefined,
                                height: 24,
                                width: 24,
                                excavate: true,
                              }
                            : undefined
                        }
                        className="qr-code-svg"
                      />
                    </div>
                    <Button
                      onClick={() => handleDownload("png")}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button
                      onClick={() => handleDownload("svg")}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download SVG
                    </Button>
                    <Button
                      onClick={() => handleDownload("pdf")}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
