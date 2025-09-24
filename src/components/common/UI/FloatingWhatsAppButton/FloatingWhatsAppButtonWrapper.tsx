import React from "react";
import { usePathname } from "next/navigation";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

const FloatingWhatsAppButtonWrapper: React.FC = () => {
  const pathname = usePathname();

  // قائمة المسارات التي لا نريد إظهار الزرار فيها (dashboard الأدمن)
  const excludedPaths = ["/admin/dashboard", "/admin"];

  // تحقق من عدم وجود المسار الحالي في القائمة المستثناة
  const shouldShowButton = !excludedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // أيضاً لا نريد إظهاره في صفحات معينة أخرى إذا لزم الأمر
  // يمكن إضافة المزيد هنا حسب الحاجة

  // لا تظهر الزرار في مسارات الأدمن
  if (!shouldShowButton) {
    return null;
  }

  return <FloatingWhatsAppButton />;
};

export default FloatingWhatsAppButtonWrapper;
