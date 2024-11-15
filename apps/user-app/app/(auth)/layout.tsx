import { AuthDesign } from "@components/auth/Design";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="grid md:grid-cols-7">
      
      <div className="md:col-span-3 order-2 md:order-1">
        <AuthDesign />
      </div>
      
      <div className="bg-[#121212] md:col-span-4 order-1 md:order-2">
        {children}
      </div>
    </div>
  );
}
