import { GoalsInitialUi } from "@components/deposit/InitalGoal_Info"

export function SavingsCard ({userid}: {userid: number}) {
  return <div className="bg-gradient-to-br from-gray-900 via-gray-900  to-gray-700 rounded-xl">
     <div>
        <GoalsInitialUi userid={userid}></GoalsInitialUi>
     </div>
    </div>
}
