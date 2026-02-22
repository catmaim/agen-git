"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0: return { text: "อ่อน", color: "text-red-400" };
      case 1: return { text: "อ่อน", color: "text-red-400" };
      case 2: return { text: "ปานกลาง", color: "text-yellow-400" };
      case 3: return { text: "แข็งแรง", color: "text-blue-400" };
      case 4: return { text: "แข็งแรงมาก", color: "text-green-400" };
      default: return { text: "อ่อน", color: "text-red-400" };
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = "กรุณากรอกชื่อ";
    if (!formData.lastName.trim()) newErrors.lastName = "กรุณากรอกนามสกุล";
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    else if (formData.password.length < 8) newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
    if (!formData.confirmPassword) newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    if (!agreeTerms) newErrors.terms = "กรุณายอมรับเงื่อนไขการใช้งาน";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      router.push("/login?message=registration-success");
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    if (field === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
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

  const strengthText = getPasswordStrengthText(passwordStrength);

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
          <h1 className="text-3xl font-bold text-white mb-2">สร้างบัญชีใหม่</h1>
          <p className="text-gray-400">เข้าร่วมกับเราเพื่อเริ่มต้นใช้งาน AI ของคุณ</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อ *
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.firstName ? "border-red-500" : "border-white/10"} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  placeholder="สมชาย"
                  required
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  นามสกุล *
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.lastName ? "border-red-500" : "border-white/10"} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  placeholder="ใจดี"
                  required
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                อีเมล *
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  placeholder="somchai@example.com"
                  required
                />
                <div className="absolute right-3 top-3.5 text-gray-500">
                  📧
                </div>
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                บริษัท (ไม่จำเป็น)
              </label>
              <div className="relative">
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="บริษัท จำกัด"
                />
                <div className="absolute right-3 top-3.5 text-gray-500">
                  🏢
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                รหัสผ่าน *
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.password ? "border-red-500" : "border-white/10"} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
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
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">ความแข็งแรงของรหัสผ่าน:</span>
                    <span className={`text-xs font-medium ${strengthText.color}`}>{strengthText.text}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength === 0 ? "bg-red-500 w-1/4" :
                        passwordStrength === 1 ? "bg-red-500 w-1/4" :
                        passwordStrength === 2 ? "bg-yellow-500 w-2/4" :
                        passwordStrength === 3 ? "bg-blue-500 w-3/4" :
                        "bg-green-500 w-full"
                      }`}
                    ></div>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                ยืนยันรหัสผ่าน *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.confirmPassword ? "border-red-500" : "border-white/10"} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 bg-white/5 border-white/10 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                />
                <span className="ml-2 text-sm text-gray-300">
                  ฉันยอมรับ{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                    เงื่อนไขการใช้งาน
                  </a>{" "}
                  และ{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                    นโยบายความเป็นส่วนตัว
                  </a>
                </span>
              </label>
              {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms}</p>}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  กำลังสร้างบัญชี...
                </span>
              ) : (
                "สร้างบัญชี"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">หรือสมัครด้วย</span>
            </div>
          </div>

          {/* Social Registration */}
          <div className="space-y-3">
            {socialLogins.map((social, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border border-white/10 rounded-lg text-white hover:bg-white/10 transition ${social.color}`}
              >
                <span className="text-xl">{social.icon}</span>
                <span>สมัครด้วย {social.name}</span>
              </button>
            ))}
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              มีบัญชีอยู่แล้ว?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300 transition font-semibold">
                เข้าสู่ระบบ
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
