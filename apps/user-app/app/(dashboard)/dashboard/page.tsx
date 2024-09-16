import { Dashboard } from "../../../components/Dashboard"

export default async function () {
  return <div>
    <div className="text-2xl font-bold text-indigo-700 cursor-pointer">
        Dashboard
    </div>

    <div>
      <Dashboard name="Alice" cardNumber="1234 5678 6533 5647" validity="11/24" expiry="11/29" cvv={123} ></Dashboard>
    </div>
  </div>
}