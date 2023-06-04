import { Item } from "@item/views";
import { ItemApiResponse } from "./response";


export const formatItems = (
    itemsApiResponse: ItemApiResponse[],
): Item[] => {

    const items = itemsApiResponse.map((item) => {
        const price = Number(item.current_price).toFixed(2);
        return {
            id: item.id,
            name: item.name.toUpperCase(),
            current_price: `${price} $`,
            duration: formatDurationLeft(item.createdAt, item.duration)
        }
    });

    return items;
}


const formatDurationLeft = (
    createdAt: Date,
    duration: number,
): string => {
    const eventStartTime = new Date(createdAt);
    const eventEndTime = (new Date()).valueOf();
    const differenceInMilli = eventEndTime.valueOf() - eventStartTime.valueOf();

    const differenceInHour  = duration - (differenceInMilli / 36e5);

    const hour = String(Math.trunc(differenceInHour)).padStart(2, '0');
    const minutes = String(Math.abs(Math.round((differenceInHour - Number(hour)) * 60))).padStart(2, '0');

    return `${hour} h ${minutes} m`;
}