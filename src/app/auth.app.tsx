import { LoginForm } from "@/components/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bem-vindo</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Acesse sua conta na nossa plataforma
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}