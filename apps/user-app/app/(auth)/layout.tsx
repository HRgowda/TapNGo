import { AuthDesign } from "@components/auth/Design";

export default function Layout({children}:{
  children: React.ReactNode
}): JSX.Element{
  return <div className="grid grid-cols-7">
    <div className="col-span-3">
      <AuthDesign></AuthDesign>

    </div>
    <div className="col-span-4 bg-[#121212]">
      {children}

    </div>
  </div>
}