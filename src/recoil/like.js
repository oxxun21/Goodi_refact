import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const likedState = atom({
  key: "likedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default likedState;
