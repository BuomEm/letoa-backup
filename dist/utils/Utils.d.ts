import { MessageEmbed, MessageEmbedOptions } from "discord.js";
export declare const getBackupInterval: (input: string) => 21600 | 43200 | 86400 | 604800;
export declare const generateErrorCode: () => string;
export declare const generateEmbed: (components: MessageEmbedOptions, embed_type: "error" | "success" | "warn" | "unavailable") => MessageEmbed;
