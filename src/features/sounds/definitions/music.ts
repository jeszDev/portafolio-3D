import { Howl } from "howler";

import trackLuci from "../../../assets/music/luci.ogg";
import trackAbout from "../../../assets/music/ambient-pads.ogg";

export interface MusicTrackItem {
  id: string;
  name: string;
  howl: Howl;
  volume: number;
}

export const musicPlaylist: MusicTrackItem[] = [
  {
    id: "luci",
    name: "Luci",
    howl: new Howl({ src: [trackLuci], loop: false, preload: false }),
    volume: 0.2,
  },
  {
    id: "ambient-pads",
    name: "Ambient Pads",
    howl: new Howl({ src: [trackAbout], loop: false, preload: false }),
    volume: 0.25,
  },
];
