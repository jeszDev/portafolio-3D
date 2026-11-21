import { Howl } from "howler";

import trackBlueMary from "../../../assets/music/blue-mary-s-blues.mp3";
import trackIoriYagami from "../../../assets/music/kof-96-arashi_no_saxophone_2-iori_yagami.mp3";
import trackNewFaceTeam from "../../../assets/music/kof-97-bloody_new_face_team.mp3";

export interface MusicTrackItem {
  id: string;
  name: string;
  howl: Howl;
  volume: number;
}

export const musicPlaylist: MusicTrackItem[] = [
  {
    id: "blueMary",
    name: "Blue Mary's Blues",
    howl: new Howl({ src: [trackBlueMary], loop: false, preload: false }),
    volume: 0.2,
  },
  {
    id: "ioriYagami",
    name: "Arashi no Saxophone",
    howl: new Howl({ src: [trackIoriYagami], loop: false, preload: false }),
    volume: 0.25,
  },
  {
    id: "newFaceTeam",
    name: "Bloody",
    howl: new Howl({ src: [trackNewFaceTeam], loop: false, preload: false }),
    volume: 0.25,
  },
];
