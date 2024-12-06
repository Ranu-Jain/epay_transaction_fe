import { useGlobalState } from "@/context/globalStateProvider"
import { backBtn } from "@/utils/constants"
import { isDesktop } from "react-device-detect"

interface backButtonProps {
  pageName: string,
}

function BackButton({ pageName }: backButtonProps) {
  const { state, dispatch } = useGlobalState()

  return (
    <div className=" flex space-x-3 items-center pb-4 " onClick={() => !isDesktop? dispatch({ type: "SET_CURRENT_MODE", payload: -1 }):''}>
      {
        !isDesktop &&
        <div>
          {
            state.currentMode !== -1 ?
              <img src={backBtn} alt="" /> : <></>
          }
        </div>}
      <div>
        <span className="text-[#2E207B] size-4 font-medium">{pageName}</span>
      </div>
    </div>
  )
}
export default BackButton