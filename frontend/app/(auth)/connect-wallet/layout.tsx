 

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className="flex flex-col min-h-screen font-inter text-white p-4">
        <main className="flex-grow container mx-auto py-22">
           {children}
        </main>
      </div> 
  );
}
 