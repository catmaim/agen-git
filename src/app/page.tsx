"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");

  const features = [
    {
      title: "ปัญญาประดิษฐ์ขั้นสูง",
      description: "เทคโนโลยี AI ลำดับถัดไปที่เข้าใจภาษาธรรมชาติและตอบสนองความต้องการของคุณได้อย่างแม่นยำ",
      icon: "🧠"
    },
    {
      title: "ประมวลผลเร็ว",
      description: "ประมวลผลข้อมูลขนาดใหญ่ได้ในเวลาไม่กี่วินาที ช่วยให้ธุรกิจของคุณตัดสินใจได้เร็วขึ้น",
      icon: "⚡"
    },
    {
      title: "ปรับแต่งได้",
      description: "ปรับแต่ง AI ให้เข้ากับธุรกิจของคุณได้อย่างสมบูรณ์แบบ ตอบโจทย์ทุกความต้องการ",
      icon: "🎯"
    },
    {
      title: "ความปลอดภัยสูง",
      description: "ระบบรักษาความปลอดภัยระดับ enterprise ปกป้องข้อมูลของคุณได้ 24/7",
      icon: "🔒"
    }
  ];

  const stats = [
    { number: "99.9%", label: "ความแม่นยำ" },
    { number: "10M+", label: "การประมวลผลต่อวัน" },
    { number: "500+", label: "ลูกค้าที่ไว้วางใจ" },
    { number: "24/7", label: "การสนับสนุน" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-white font-bold text-xl">AI Startup</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">คุณสมบัติ</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">ราคา</a>
              <a href="#about" className="text-gray-300 hover:text-white transition">เกี่ยวกับ</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">ติดต่อ</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-white hover:text-gray-300 transition">เข้าสู่ระบบ</a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition">
                เริ่มต้นใช้งาน
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-blue-400 text-sm">🎉 เปิดให้ใช้งานแล้ววันนี้</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            ปฏิวัติธุรกิจของคุณด้วย
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> AI อัจฉริยะ</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            แพลตฟอร์ม AI ที่ช่วยให้ธุรกิจของคุณเติบโตอย่างรวดเร็ว ด้วยเทคโนโลยีปัญญาประดิษฐ์ลำดับถัดไปที่พร้อมเปลี่ยนโลก
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
              ทดลองใช้ฟรี
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition">
              ดูการสาธิต
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">คุณสมบัติที่โดดเด่น</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              เทคโนโลยี AI ล้ำสมัยที่ออกแบบมาเพื่อช่วยให้ธุรกิจของคุณเติบโตอย่างยั่งยืน
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              พร้อมจะปฏิวัติธุรกิจของคุณหรือยัง?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              เข้าร่วมกับ 500+ บริษัทที่เชื่อมั่นในเทคโนโลยี AI ของเรา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-3 rounded-full text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                เริ่มต้นฟรี
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-white font-semibold">AI Startup</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 AI Startup. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
