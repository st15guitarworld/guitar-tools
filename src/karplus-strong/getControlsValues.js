export default function getControlsValues() {
    return {
        stringTension: 0.0,
        characterVariation: 0.5,
        stringDamping: 0.5,
        stringDampingVariation: 0.25,
        stringDampingCalculation: "magic",
        pluckDamping: 0.5,
        pluckDampingVariation: 0.25,
        body: "simple",
        stereoSpread: 0.2
    };
}

// calculate the constant used for the low-pass filter
// used in the Karplus-Strong loop
export function calculateSmoothingFactor(string, tab, options) {
    var smoothingFactor;
    if (options.stringDampingCalculation == "direct") {
        smoothingFactor = options.stringDamping;
    } else if (options.stringDampingCalculation == "magic") {
        // this is copied verbatim from the flash one
        // is magical, don't know how it works
        var noteNumber = (string.semitoneIndex + tab - 19)/44;
        smoothingFactor =
            options.stringDamping +
            Math.pow(noteNumber, 0.5) * (1 - options.stringDamping) * 0.5 +
            (1 - options.stringDamping) *
                Math.random() *
                options.stringDampingVariation;
    }
    return smoothingFactor;
}
