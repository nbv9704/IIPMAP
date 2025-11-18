"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import OpenEye from "@/assets/images/icon/icon_68.svg";
import { apiPost } from "@/lib/api/apiClient";
import { AuthResponse } from "@/types/auth";
import { useAuth } from "@/lib/auth/AuthContext";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

const RegisterForm = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const schema = yup
    .object({
      fullName: yup.string().required("Họ tên không được để trống"),
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Email không hợp lệ"),
      password: yup.string().required("Mật khẩu không được để trống"),
      phone: yup.string().required("Số điện thoại không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        preferredLanguage: "vi",
        roleCode: "INVESTOR",
      };

      const response = await apiPost<typeof payload, AuthResponse>(
        "/api/auth/register",
        payload
      );

      // đăng nhập luôn sau khi đăng ký
      login(response);

      toast.success("Đăng ký tài khoản thành công", {
        position: "top-center",
      });
      reset();
    } catch (error: any) {
      toast.error(error.message || "Đăng ký thất bại", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Họ và tên*</label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Nguyễn Văn A"
            />
            <p className="form_error">{errors.fullName?.message}</p>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
            />
            <p className="form_error">{errors.email?.message}</p>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Số điện thoại*</label>
            <input
              type="text"
              {...register("phone")}
              placeholder="09xxxxxxxx"
            />
            <p className="form_error">{errors.phone?.message}</p>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter password"
              className="pass_log_id"
            />
            <span className="placeholder_icon">
              <span
                className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}
              >
                <Image onClick={togglePasswordVisibility} src={OpenEye} alt="" />
              </span>
            </span>
            <p className="form_error">{errors.password?.message}</p>
          </div>
        </div>

        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember2" />
              <label htmlFor="remember2">
                Bằng việc nhấn &quot;Sign up&quot;, bạn đồng ý với{" "}
                <Link href="#">Điều khoản</Link> &{" "}
                <Link href="#">Chính sách bảo mật</Link>
              </label>
            </div>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="iip-auth-btn w-100 text-uppercase d-block mt-20"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Sign up"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
