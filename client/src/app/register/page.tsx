'use client'

// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link';
// import * as Icon from "phosphor-react";
// import HeaderOne from '@/components/Header/HeaderOne'
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
// import Footer from '@/components/Footer/Footer'
// import TextInput from '@/components/form-fields/text-input';
// import ErrorMessage from '@/components/form-fields/error-message';

// const Register = () => {
//     return (
//         <>
//             <HeaderOne />
//             {/* <Breadcrumb img='/images/breadcrumb/1920x320.png' heading='Register' subHeading="Access Your Account. GlampHub's Secure Register Experience." /> */}
//             <div className='login-us lg:py-20 md:py-14 py-10'>
//                 <div className="container">
//                     <div className="content flex items-center justify-center">
//                         <div id="form-login" className='xl:basis-1/3 lg:basis-1/2 sm:basis-2/3 max-sm:w-full'>
//                             <div className="heading3 text-center">Register</div>
//                             <form
//                 {...rest}
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="md:mt-10 mt-6"
//               >
//                 <div className="email ">
//                   <TextInput
//                     register={register}
//                     name="email"
//                     type="email"
//                     id="email"
//                     label="Email address"
//                     placeholder="Enter Email address"
//                     isRequired
//                   />
//                   <ErrorMessage message={errors.email?.message} />
//                 </div>
//                 <div className="pass mt-5">
//                   <TextInput
//                     register={register}
//                     name="password"
//                     type="password"
//                     id="password"
//                     label="Password"
//                     placeholder="Enter Password"
//                     isRequired
//                   />
//                   <ErrorMessage message={errors.password?.message} />
//                 </div>
//                 <div className="flex items-center justify-between flex-wrap mt-5">
//                   <Link
//                     href={"#!"}
//                     className="caption1 text-primary has-line line-primary"
//                   >
//                     Forget Your Password?
//                   </Link>
//                 </div>
//                 <div className="block-button mt-6">
//                   <button
//                     className="button-main w-full text-center"
//                     type="submit"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//                             <div className="flex items-center justify-center gap-2 mt-5">
//                                 <div className="caption1 text-variant1">Already have an account?</div>
//                                 <Link href={'/login'} className='text-button-sm text-black has-line'>Login</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Register


import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema ,RegistrationType} from '@/utils/validations/Registeration.schema'; // Adjust import path as needed
import { ROUTES } from '@/utils/routes'; // Your predefined routes
import TextInput from '@/components/form-fields/text-input'; // Your custom TextInput component
import ErrorMessage from '@/components/form-fields/error-message'; // Your custom ErrorMessage component
import useClientSession  from '@/utils/hook/getClientSession'; // Your custom session hook
// import { newUser } from 'next-auth/react'; // Your custom sign-up function
import HeaderOne from '@/components/Header/HeaderOne';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import axios from 'axios';

// type RegistrationType = z.infer<typeof RegistrationSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const { session } = useClientSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
    ...rest
  } = useForm<RegistrationType>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobileNo: '',
      gender: 'Male',
      address1: '',
      address2: '',
      city: '',
      state: '',
      dateOfBirth: '',
      role: 'User',
    },
  });

  const onSubmit = async (data: RegistrationType) => {
    try {
      const result = await axios.post("http://localhost:8080/register",data); // Implement signUp function for registration

      console.log('🚀 ~ result:', result);
      if (result?.status === 200) {
        router.push(ROUTES.signIn);
      }
    } catch (error: any) {
      console.log('error: ', error);
    }
  };

  if (session) {
    router.replace(ROUTES.home);
    return null;
  }


//   const TextInput = ({ register, name, type, id, label, options }) => {
//     return (
//       <div className="input-group">
//         <label htmlFor={id}>{label}</label>
//         {type === 'select' ? (
//           <select {...register(name)} id={id} name={name}>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <input {...register(name)} type={type} id={id} name={name} />
//         )}
//       </div>
//     );
//   };

  return (
    <>
      <HeaderOne />
      <div className="register-us lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="content flex items-center justify-center">
            <div
              id="form-register"
              className="xl:basis-1/3 lg:basis-1/2 sm:basis-2/3 max-sm:w-full"
            >
              <div className="heading3 text-center">Register</div>
              <form
                {...rest}
                onSubmit={handleSubmit(onSubmit)}
                className="md:mt-10 mt-6"
              >
                <TextInput
                  register={register}
                  name="firstName"
                  type="text"
                  id="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  isRequired
                />
                <ErrorMessage message={errors.firstName?.message} />

                <TextInput
                  register={register}
                  name="lastName"
                  type="text"
                  id="lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  isRequired
                />
                <ErrorMessage message={errors.lastName?.message} />

                <TextInput
                  register={register}
                  name="email"
                  type="email"
                  id="email"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  isRequired
                />
                <ErrorMessage message={errors.email?.message} />

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

                <TextInput
                  register={register}
                  name="mobileNo"
                  type="text"
                  id="mobileNo"
                  label="Mobile Number"
                  placeholder="Enter Mobile Number"
                  isRequired
                />
                <ErrorMessage message={errors.mobileNo?.message} />

                <TextInput
                  register={register}
                  name="gender"
                  type="select"
                  id="gender"
                  label="Gender"
                  options={['Male', 'Female', 'Other']}
                  isRequired
                />
                <ErrorMessage message={errors.gender?.message} />

                <TextInput
                  register={register}
                  name="address1"
                  type="text"
                  id="address1"
                  label="Address Line 1"
                  placeholder="Enter Address Line 1"
                  isRequired
                />
                <ErrorMessage message={errors.address1?.message} />

                <TextInput
                  register={register}
                  name="address2"
                  type="text"
                  id="address2"
                  label="Address Line 2"
                  placeholder="Enter Address Line 2"
                />
                <ErrorMessage message={errors.address2?.message} />

                <TextInput
                  register={register}
                  name="city"
                  type="text"
                  id="city"
                  label="City"
                  placeholder="Enter City"
                  isRequired
                />
                <ErrorMessage message={errors.city?.message} />

                <TextInput
                  register={register}
                  name="state"
                  type="text"
                  id="state"
                  label="State"
                  placeholder="Enter State"
                  isRequired
                />
                <ErrorMessage message={errors.state?.message} />

                <TextInput
                  register={register}
                  name="dateOfBirth"
                  type="date"
                  id="dateOfBirth"
                  label="Date of Birth"
                />
                <ErrorMessage message={errors.dateOfBirth?.message} />

                <TextInput
                  register={register}
                  name="role"
                  type="select"
                  id="role"
                  label="Role"
                  options={['User', 'Admin']}
                />
                <ErrorMessage message={errors.role?.message} />

                <div className="block-button mt-6">
                  <button
                    className="button-main w-full text-center"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="caption1 text-variant1">
                  Already have an account?
                </div>
                <Link
                  href={"/login"}
                  className="text-button-sm text-black has-line"
                >
                  Login
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

export default RegisterPage;
