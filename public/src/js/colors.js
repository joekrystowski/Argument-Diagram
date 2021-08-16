export let color = {
    textColor: "#222222",
    claim: {
        dark: {
            textColor: "#222222",
            stroke: "#bababa" // "#46db6e",
        }
    },
    objection: {
        dark: {
            textColor: "#222222",
            stroke: "bababa" //"#db5246"
        }
    },
    dependentPremise: {
        bodyColor: "#ccf5c9",
        textColor: "#222222",
        stroke: "#7aff7d",
        linkColor: "#61E786"
    }
};
export function createColor(value, type) {
    if (type === "source") {
        return "#c9e4f5";
    }
    return "#ebebeb";
    console.log("value", value);
    if (type === "claim") {
        let hue = 136;
        let saturation = 70;
        let brightness = 100 - (25 * value);
        console.log(brightness);
        let color = HSLtoHEX(hue, saturation, brightness);
        console.log(color);
        return color;
    }
    else if (type === "objection") {
        console.log("coloring objection");
        let hue = 5;
        let saturation = 70;
        let brightness = 100 - (25 * value);
        console.log("brightness", brightness);
        let color = HSLtoHEX(hue, saturation, brightness);
        console.log(color);
        return color;
    }
}
// to be honest I have no idea wha this function is doing, it just works
// converts HSL to a hex string to use as a color
function HSLtoHEX(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
