import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-6 py-10 sm:px-16 bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-1/2 w-[480px] h-[480px] -translate-x-1/2 rounded-full bg-gradient-radial from-purple-400 to-transparent opacity-40 dark:from-purple-700 dark:to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-1/3 w-[360px] h-[360px] bg-gradient-conic from-sky-200 via-blue-200 opacity-30 dark:from-sky-900 dark:via-[#0141ff] blur-3xl"></div>
      </div>

      {/* Main content */}
      <main className="flex flex-col gap-10 items-center text-center max-w-2xl z-10">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="text-gray-600 dark:text-gray-300 text-sm sm:text-base space-y-2">
          <li>
            Get started by editing{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
              app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* Buttons / links */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel"
              width={20}
              height={20}
              className="dark:invert"
            />
            Deploy Now
          </a>

          <a
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-10 text-gray-600 dark:text-gray-300 z-10">
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File" width={16} height={16} />
          Learn
        </a>

        <a
          className="flex items-center gap-2 hover:underline"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window" width={16} height={16} />
          Examples
        </a>

        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
