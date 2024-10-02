import { Design } from "@components/auth/Design";

export default function Layout({children}:{
  children: React.ReactNode
}): JSX.Element{
  return <div className="grid grid-cols-7">
    <div className="col-span-3">
      <Design></Design>

    </div>
    <div className="col-span-4">
      {children}

    </div>
  </div>
}