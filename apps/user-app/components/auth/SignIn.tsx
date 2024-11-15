
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { alertMessage as AlertMessage} from "@components/AlertMessage"

export default function SignIn(){
  const [data, setdata] = useState({
    email: "",
    password: ""
  })

  const [alertMessage, setAlertMessage] = useState<{message: string; status: "success" | "failure"} | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false)
  
  const router = useRouter();    
  const submit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try{

      const result = await signIn('credentials',{
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (result?.ok){
        setAlertMessage({
          message: "Logged in.",
          status: "success"
        })
       setTimeout(async () => {
         await router.push("/home");         
       }, 3000)
        console.log("signed in ")        
      }else{
        setAlertMessage({
          message: "Error while signing in.",
          status: "failure"
        });
      }
      
    } catch(e){
      setAlertMessage({
        message: "Error while logging in. Please try again later",
        status: "failure"
      })
    }  
  }
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full text-white md:mt-0 sm:max-w-md ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-semibold md:text-2xl">Sign In</h1>
          <h2 className="text-center font-thin">Provide your registered credentials.</h2>
          <form className="space-y-4 md:space-y-6 font-semibold text-lg" onSubmit={submit}>             
              <div>
                <label className="block mb-2 font-semibold text-sm">Email</label>
                <input
                  type="text"
                  name="email"
                  className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="emelia@gmail.com"
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Erickson"
                  onChange={(e) => setdata({ ...data, password: e.target.value })}
                />
              </div>      

            <button type="submit" className="w-full text-black bg-white/90 hover:bg-white/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="text-sm font-light text-center text-gray-500">
              New User ?{" "}
              <a className="font-medium text-white hover:underline gap-4" href="/signUp">
                Sign Up here
              </a>
            </div>
          </form>
        </div>
      </div>
      {alertMessage && (
          <AlertMessage
            description={alertMessage.message}
            status={alertMessage.status}
          />
        )}
    </section>
  );
}