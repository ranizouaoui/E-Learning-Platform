// components/marketing/BankAccountCard.tsx

import React from "react";
import { Button } from "@/components/ui/button";

interface BankAccountCardProps {
  onSubscribe: () => void;
}

export const BankAccountCard: React.FC<BankAccountCardProps> = ({ onSubscribe }) => {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
      <div className="w-full max-w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
        <div className="w-full pt-1 pb-5">
          <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <i className="mdi mdi-credit-card-outline text-3xl"></i>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">معلومات الدفع الآمنة</h1>
        </div>
        <div className="mb-3 flex -mx-2">
          <div className="px-2">
            <label htmlFor="type1" className="flex items-center cursor-pointer">
              <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" defaultChecked />
              <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" alt="Card type 1" />
            </label>
          </div>
          <div className="px-2">
            <label htmlFor="type2" className="flex items-center cursor-pointer">
              <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
              <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3" alt="Card type 2" />
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">اسم صاحب البطاقة</label>
          <div>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="محمد علي" type="text" />
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">رقم البطاقة</label>
          <div>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
          </div>
        </div>
        <div className="mb-3 -mx-2 flex items-end">
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1">تاريخ انتهاء الصلاحية</label>
            <div>
              <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                <option value="01">01 - يناير</option>
                <option value="02">02 - فبراير</option>
                <option value="03">03 - مارس</option>
                <option value="04">04 - أبريل</option>
                <option value="05">05 - مايو</option>
                <option value="06">06 - يونيو</option>
                <option value="07">07 - يوليو</option>
                <option value="08">08 - أغسطس</option>
                <option value="09">09 - سبتمبر</option>
                <option value="10">10 - أكتوبر</option>
                <option value="11">11 - نوفمبر</option>
                <option value="12">12 - ديسمبر</option>
              </select>
            </div>
          </div>
          <div className="px-2 w-1/2">
            <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>
        <div className="mb-10">
          <label className="font-bold text-sm mb-2 ml-1">رمز الأمان</label>
          <div>
            <input className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
          </div>
        </div>
        <div>
          <button className="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" onClick={onSubscribe}>
            <i className="mdi mdi-lock-outline mr-1"></i> اشترك الآن
          </button>
        </div>
      </div>
    </div>
  );
};
