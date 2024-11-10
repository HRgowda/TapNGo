
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignIn(){
  const [data, setdata] = useState({
    email: "",
    password: ""
  })
  
  const router = useRouter();    
  const submit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{

      const result = await signIn('credentials',{
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (result?.ok){
        await router.push("/home")
        console.log("signed in ")        
      }else{
        console.log("Error while signing in", result?.error);
      }
      
    } catch(e){
      console.log("Error while logging", e)
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
                  name="paswword"
                  className="border bg-[#121212] border-white/50 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Erickson"
                  onChange={(e) => setdata({ ...data, password: e.target.value })}
                />
              </div>      

            <button type="submit" className="w-full text-black bg-white/90 hover:bg-white/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              LogIn
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
    </section>
  );
}