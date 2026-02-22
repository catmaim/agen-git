"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email === "demo@example.com" && password === "password") {
        router.push("/dashboard");
      } else {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
      setIsLoading(false);
    }, 1000);
  };

  const socialLogins = [
    {
      name: "Google",
      icon: "🔍",
      color: "hover:bg-red-500/20 border-red-500/20"
    },
    {
      name: "GitHub", 
      icon: "🐙",
      color: "hover:bg-gray-500/20 border-gray-500/20"
    },
    {
      name: "Microsoft",
      icon: "🪟",
      color: "hover:bg-blue-500/20 border-blue-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-white font-bold text-2xl">AI Startup</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ยินดีต้อนรับกลับมา</h1>
          <p className="text-gray-400">เข้าสู่ระบบเพื่อเข้าถึงแดชบอร์ดของคุณ</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="demo@example.com"
                  required
                />
                <div className="absolute right-3 top-3.5 text-gray-500">
                  📧
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-white/5 border-white/10 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">จำฉันไว้</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition">
                ลืมรหัสผ่าน?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">หรือเข้าสู่ระบบด้วย</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {socialLogins.map((social, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border border-white/10 rounded-lg text-white hover:bg-white/10 transition ${social.color}`}
              >
                <span className="text-xl">{social.icon}</span>
                <span>เข้าสู่ระบบด้วย {social.name}</span>
              </button>
            ))}
          </div>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              ยังไม่มีบัญชี?{" "}
              <a href="/register" className="text-blue-400 hover:text-blue-300 transition font-semibold">
                สมัครสมาชิก
              </a>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 text-center">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm mb-2">🔒 บัญชีสำหรับทดสอบ</p>
            <p className="text-gray-400 text-xs">อีเมล: demo@example.com</p>
            <p className="text-gray-400 text-xs">รหัสผ่าน: password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
