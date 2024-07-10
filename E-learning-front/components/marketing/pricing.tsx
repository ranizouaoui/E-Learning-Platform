// components/marketing/pricing.tsx

import React from "react";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6 text-center">الأسعار</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">الخطة الأساسية</h3>
            <p className="text-lg font-medium mb-4">مجاني</p>
            <ul className="list-disc list-inside mb-4">
              <li>وصول إلى الدروس المجانية</li>
              <li>الاختبارات الأساسية</li>
              <li>الدعم عبر البريد الإلكتروني</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
              التسجيل الآن
            </button>
          </div>
          <div className="border rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">الخطة المتقدمة</h3>
            <p className="text-lg font-medium mb-4">10DT شهر</p>
            <ul className="list-disc list-inside mb-4">
              <li>وصول إلى جميع الدروس</li>
              <li>اختبارات متقدمة</li>
              <li>الدعم عبر الهاتف والبريد الإلكتروني</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
              التسجيل الآن
            </button>
          </div>
          <div className="border rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">خطة الشركات</h3>
            <p className="text-lg font-medium mb-4">تخصيص الأسعار</p>
            <ul className="list-disc list-inside mb-4">
              <li>وصول غير محدود</li>
              <li>تقارير مخصصة</li>
              <li>مدير حساب مخصص</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
