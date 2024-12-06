import { useGlobalState } from "@/context/globalStateProvider";
import { Separator } from "@/core/elements/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/core/elements/sheet"
import { language } from "@/utils/constants";
import { LANGUAGES } from "@/utils/helper"
import { isDesktop } from "react-device-detect";
import { useTranslation } from "react-i18next";

const side = isDesktop ? 'right' : 'bottom' 
const LanguageToggle = () => {
  const { dispatch } = useGlobalState();
  const { i18n } = useTranslation();

  const lanugagesData = LANGUAGES.map((item) => {
    item.isSelected = item.code === i18n.language;
    return item;
  })

  const changeLanguage = async (lng: string, name: string) => {
    i18n.changeLanguage(lng);
    dispatch({ type: 'SET_LANGUAGE', payload: name })
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="h-[50px] w-[50px]">
          <img src={language} alt="" />
        </div>
      </SheetTrigger>
      <SheetContent side={side} className={`w-full p-6  absolute ${!isDesktop&&'rounded-t-2xl'}`}>
        <SheetHeader>
          <SheetTitle className="mt-2">Choose Language</SheetTitle>
        </SheetHeader>

        {lanugagesData.map((item) => (
          <div key={item.name}>
            <div className="flex p-4 justify-between">
              {item.name}
              <input type="radio" checked={item.isSelected} size={20}
                onChange={() => changeLanguage(item.code, item.name)} />
            </div>
            <Separator />
          </div>
        ))}
      </SheetContent>
    </Sheet>
  )
}

export default LanguageToggle