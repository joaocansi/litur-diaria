export function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative h-screen">
          <div className="w-1/2 fixed left-0 top-0 max-md:hidden">
            <img src="/familia.webp" alt="jesus" className="w-full h-screen object-cover" />
          </div>
          <div className="w-1/2 max-md:w-full absolute right-0">
              {children}
          </div>
      </div>
    );
  }