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

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Email không hợp lệ"),
      password: yup.string().required("Mật khẩu không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const response = await apiPost<LoginFormData, AuthResponse>(
        "/api/auth/login",
        data
      );

      // cập nhật context -> context tự lưu localStorage
      login(response);

      toast.success("Đăng nhập thành công", { position: "top-center" });
      reset();
      // TODO: đóng modal / redirect
    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại", {
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
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <Link href="#">Forget Password?</Link>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="iip-auth-btn w-100 text-uppercase d-block mt-20"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
