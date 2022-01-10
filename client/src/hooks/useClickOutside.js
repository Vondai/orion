import useEventListener from "./useEventListener";

export default function useClickOutside (ref, callback) {
    function callbackEvent (e) {
        if (ref.current == null || ref.current.contains(e.target)) return;
        callback(e);
    }

    useEventListener(
    "click",
    callbackEvent,
    document);
}