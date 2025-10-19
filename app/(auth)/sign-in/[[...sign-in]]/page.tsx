import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back!
        </h2>
        <SignIn
          appearance={{
            elements: {
              card: "bg-white rounded-xl shadow-md p-6",
              headerTitle: "text-xl font-semibold text-center text-gray-700",
              formButtonPrimary:
                "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
              formFieldInput:
                "border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400",
            },
          }}
        />
      </div>
    </div>
  );
}
