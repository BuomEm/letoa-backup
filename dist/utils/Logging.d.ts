export declare class Logging {
    file: any;
    constructor({ file }: {
        file: any | undefined;
    });
    createFile(): Promise<void>;
    clearFile(): Promise<void>;
    writeToLog(content: string): Promise<void>;
}
