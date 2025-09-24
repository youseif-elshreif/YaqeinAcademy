// Test component for WhatsApp functionality
"use client";

import { useWhatsApp } from "@/src/hooks/useWhatsApp";

const WhatsAppTest = () => {
  const { hasWhatsApp, whatsappNumber, getWhatsAppUrl, openWhatsApp } =
    useWhatsApp();

  const testMessages = [
    "مرحبا، أريد الاستفسار حول الدورات",
    "أحتاج معلومات حول أسعار الدورات",
    "هل يمكنني التسجيل في دورة القرآن؟",
  ];

  if (!hasWhatsApp) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        ⚠️ لا يوجد رقم واتساب متاح في ContactContext
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      <h3 className="text-lg font-bold mb-2">اختبار الواتساب</h3>
      <p className="mb-2">رقم الواتساب: {whatsappNumber}</p>
      <div className="space-y-2">
        {testMessages.map((message, index) => (
          <button
            key={index}
            onClick={() => openWhatsApp(message)}
            className="block w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            إرسال: "{message}"
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm">
          رابط واتساب مع رسالة افتراضية:
          <a
            href={getWhatsAppUrl("مرحبا") || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            {getWhatsAppUrl("مرحبا")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default WhatsAppTest;
