// State selector and dependencies
import { isDesktop } from 'react-device-detect';

// Components
import SplashScreen from "@/core/components/splash"

import HomeDesktop from "./home-desktop";
import HomeMobile from "./home-mobile";
import {  useGlobalStateSelector } from '@/context/globalStateProvider';


function Index() {
  const isSplashscreenVisible = useGlobalStateSelector((state: any) => state.isSplashscreenVisibel)
  const currentMode = useGlobalStateSelector((state: any) => state.currentMode)

  return (
        isSplashscreenVisible ? (
          <SplashScreen />
        ) : (
          isDesktop ? (
            <HomeDesktop
              currentMode={currentMode}
            />
          ) : (
            <HomeMobile
              currentMode={currentMode}
            />
          )
        )

  );

}

export default Index