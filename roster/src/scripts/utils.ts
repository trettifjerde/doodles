import { Preferences, Rotation, SideInfo } from "./types";

function calcServerDisbalance(server: SideInfo[]) {
    const serverSlots = server[0].slots + server[1].slots;
    return [(Math.abs(server[0].slots - server[1].slots) / serverSlots) * 5 || 0, serverSlots];
}

export function calcDisbalance(rotation: Rotation) {
    const [disbalance1, slots1] = calcServerDisbalance(rotation.servers[0]);
    const [disbalance2, slots2] = calcServerDisbalance(rotation.servers[1]);

    const serverDisbalance = (slots1 === 0 && slots1 === slots2) ? 1 :
        (slots1 === 0) ? slots2 :
        (slots2 === 0) ? slots1 : 
        ((slots1 > slots2 ? slots1 / slots2 : slots2 / slots1) * 2 - 2);

    return +((serverDisbalance + disbalance1 + disbalance2).toFixed(2));
}