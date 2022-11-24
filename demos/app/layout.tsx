export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Server Components FTW!</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
