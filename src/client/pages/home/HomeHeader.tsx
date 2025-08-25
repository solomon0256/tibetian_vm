/*
// src/client/pages/home/HomeHeader.tsx
import React from 'react'
import { useAuth } from 'wasp/client/auth'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'

/**
 * Top header: reuse project NavBar.
 * Left: your brand via NavBar; Right: Login/Signup or Go to Courses.
 * navigationItems 先传空数组，避免类型问题。
 */

//export default function HomeHeader() {
//  const { data: user } = useAuth()

// return (
//    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b">
//      // 复用现有 NavBar（内部含容器与布局）
//      <NavBar navigationItems={[]} />

//      // 轻薄的辅助栏：放登录/注册/进入课程 CTA（如 NavBar 已含，可删除这段）
//      <div className="container mx-auto px-4 py-2 flex justify-end gap-3">
//        {user ? (
//          <Link
//            to="/courses"
//            className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
//          >
//            Go to Courses
//          </Link>
//        ) : (
//          <>
//            <Link
//              to="/signup"
//              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
//            >
//              Sign up
//            </Link>
//            <Link
//              to="/login"
//              className="inline-flex items-center rounded-md bg-black text-white px-3 py-1.5 text-sm font-medium hover:bg-gray-900"
//            >
//              Log in
//            </Link>
//          </>
//        )}
//      </div>
//    </header>
//  )
//}

