import {atom} from "recoil";

export const currentTrackIdState = atom({
    key: "currentTrackIdList",
    default: null,
});

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
});

