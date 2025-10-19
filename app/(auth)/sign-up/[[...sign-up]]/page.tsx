import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>
        <SignUp
          appearance={{
            elements: {
              card: "bg-white rounded-xl shadow-md p-6",
              headerTitle: "text-xl font-semibold text-center text-gray-700",
              formButtonPrimary:
                "bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded",
              formFieldInput:
                "border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400",
            },
          }}
        />
      </div>
    </div>
  );
}
