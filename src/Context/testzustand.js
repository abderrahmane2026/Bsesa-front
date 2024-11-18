import { create } from 'zustand'

export const useStore = create((set) => ({
  // استرجاع المستخدم من localStorage إذا كان موجوداً
  user: JSON.parse(window.localStorage.getItem('user')) || null,

  // دالة تسجيل الدخول: تخزن بيانات المستخدم في localStorage وstore
  login: (userData) => {
    window.localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },

  // دالة تسجيل الخروج: تحذف بيانات المستخدم من localStorage وstore
  logout: () => {
    window.localStorage.removeItem('user');
    set({ user: null });
  },
}));
