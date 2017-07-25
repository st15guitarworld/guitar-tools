import AudioContextMonkeyPatch from "./AudioContextMonkeyPatch.js";

var cache = {};

export default function getContext() {
  if (typeof window === "undefined") return null;

  var audioContext = window.AudioContext;

  if (!audioContext) {
    return null;
  }

  var ctx = cache.context;

  if (ctx) return ctx;

  cache.context = new audioContext();
  return cache.context;
}
