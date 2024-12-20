"use client"

import { z } from "zod"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth"
import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { loginSchema } from "../schema"
import { useLogin } from "../api/use-login"

const SignInCard = () => {
  const { mutate, isPending } = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    // 유효성 검사
    resolver: zodResolver(loginSchema),
    // 기본값 설정
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 로그인 처리
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values })
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">환영합니다!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="이메일 주소를 입력해주세요."
                    />
                  </FormControl>
                  {/* 유효성 검사 실패 시 오류 메시지 출력 */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size="lg" className="w-full">
              로그인
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => signUpWithGoogle()}
        >
          <FcGoogle className="mr-2 size-5" />
          Google로 로그인
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => signUpWithGithub()}
        >
          <FaGithub className="mr-2 size-5" />
          Github로 로그인
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          가입한 계정이 없으신가요?
          <Link href="./sign-up">
            <span className="text-blue-700">&nbsp;회원가입</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard
