export class Interpolator {
    inMin: number;
    inMax: number;
    outMin: number;
    outMax: number;
    onlyInt = false;
    ensure() {
        if (typeof this.inMin != "number") {
            throw "InMin not setted for interpolator";
        }
        if (typeof this.inMax != "number") {
            throw "InMax not setted for interpolator";
        }
        if (typeof this.outMin != "number") {
            throw "OutMin not setted for interpolator";
        }
        if (typeof this.outMax != "number") {
            throw "OutMax not setted for interpolator";
        }
    }
    inRange(min: number, max: number) {
        this.inMin = min;
        this.inMax = max;
    }
    outRange(min: number, max: number) {
        this.outMin = min;
        this.outMax = max;
    }
    outValueForIn(inVal) {
        this.ensure();
        let totalIn = this.inMax - this.inMin;
        let ratio = inVal / totalIn;
        let totalOut = this.outMax - this.outMin;
        let valOut = this.outMin + (totalOut * ratio);
        return this.safeValue(valOut);
    }
    inValueForOut(outVal) {
        this.ensure();
        let totalOut = this.outMax - this.outMin;
        let ratio = outVal / totalOut;
        let totalIn = this.inMax - this.inMin;
        let valIn = this.inMin + (totalIn * ratio);
        return this.safeValue(valIn);
    }
    inValueForRatio(ratio: number) {
        this.ensure();
        let totalInt = this.inMax - this.inMin;
        let valIn = this.inMin + (totalInt * ratio);
        return valIn;
    }
    outValueForRatio(ratio: number) {
        this.ensure();
        let totalOut = this.outMax - this.outMin;
        let valOut = this.outMin + (totalOut * ratio);
        return valOut;
    }
    safeValue(val) {
        if (this.onlyInt) {
            return Math.round(val);
        }
        return val;
    }
}