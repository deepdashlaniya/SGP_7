"use client";

import React from "react";
import Link from "next/link";
import HeaderOne from "@/components/Header/HeaderOne";
import Footer from "@/components/Footer/Footer";
import TextInput from "@/components/form-fields/text-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "@/utils/validations/login.schema";
import ErrorMessage from "@/components/form-fields/error-message";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useClientSession from "@/utils/hook/getClientSession";
import { ROUTES } from "@/utils/routes";
 
const Login = () => {
  const router = useRouter();
  const { session } = useClientSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
    ...rest
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log("🚀 ~ result:", result);
      if (result?.ok) {
        router.push(ROUTES.home);
      }
    } catch (error: any) {
      console.log("error: ", error);
    }
  };

  if (session) {
    return router.replace(ROUTES.home);
  }

  return (
    <>
      <HeaderOne />
      <div className="login-us lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="content flex items-center justify-center">
            <div
              id="form-login"
              className="xl:basis-1/3 lg:basis-1/2 sm:basis-2/3 max-sm:w-full"
            >
              <div className="heading3 text-center">Login</div>
              <form
                {...rest}
                onSubmit={handleSubmit(onSubmit)}
                className="md:mt-10 mt-6"
              >
                <div className="email ">
                  <TextInput
                    register={register}
                    name="email"
                    type="email"
                    id="email"
                    label="Email address"
                    placeholder="Enter Email address"
                    isRequired
                  />
                  <ErrorMessage message={errors.email?.message} />
                </div>
                <div className="pass mt-5">
                  <TextInput
                    register={register}
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    placeholder="Enter Password"
                    isRequired
                  />
                  <ErrorMessage message={errors.password?.message} />
                </div>
                <div className="flex items-center justify-between flex-wrap mt-5">
                  <Link
                    href={"#!"}
                    className="caption1 text-primary has-line line-primary"
                  >
                    Forget Your Password?
                  </Link>
                </div>
                <div className="block-button mt-6">
                  <button
                    className="button-main w-full text-center"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="caption1 text-variant1">
                  Not registered yet?
                </div>
                <Link
                  href={"/register"}
                  className="text-button-sm text-black has-line"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
