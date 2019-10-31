import { ClockInOut } from 'src/model/clockinout';

export class StorageHandler {
    static loadAutoClocks() {
        const clocks = localStorage.getItem("autoclocks");
        if (clocks === null) return [];

        return JSON.parse(clocks);
    }

    static saveAutoClocks(clocks: ClockInOut[]) {
        localStorage.setItem("autoclocks", JSON.stringify(clocks));
    }

    static saveManualClocks(clocks: ClockInOut[]) {
        console.log("saving.....");
        localStorage.setItem("manualclocks", JSON.stringify(clocks));
    }

    static loadManualClocks() {
        const clocks = localStorage.getItem("manualclocks");
        if (clocks === null) return [];

        return JSON.parse(clocks);
    }

    static delete() {
        localStorage.removeItem("autoclocks");
        localStorage.removeItem("manualclocks");
    }
}