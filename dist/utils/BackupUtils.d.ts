import { CategoryChannel, Guild, NewsChannel, TextChannel, VoiceChannel } from "discord.js";
import { BanData, ChannelPermissionsData, EmojiData, MessageData, RoleData, TextChannelData, VoiceChannelData, CategoryData, ChannelsData, RestoreServerOptions } from "./types";
import { CreateBackupOptions } from "./types/CreateBackup";
import { MemberData } from "./types/MemberData";
export declare function generateKey(size?: number): string;
export declare function getMembers(guild: Guild, options: CreateBackupOptions): Promise<MemberData[]>;
export declare function getChannels(guild: Guild, options: CreateBackupOptions): Promise<ChannelsData>;
export declare function getBans(guild: Guild): Promise<BanData[]>;
export declare function getRoles(guild: Guild): Promise<RoleData[]>;
export declare function getEmojis(guild: Guild): Promise<EmojiData[]>;
export declare function fetchChannelPermissions(channel: TextChannel | VoiceChannel | CategoryChannel | NewsChannel): ChannelPermissionsData[];
export declare function fetchVoiceChannelData(channel: VoiceChannel): Promise<VoiceChannelData>;
export declare function fetchChannelsMessages(channel: TextChannel | NewsChannel, options: CreateBackupOptions): Promise<MessageData[]>;
export declare function fetchTextChannelData(channel: TextChannel | NewsChannel, options: CreateBackupOptions): Promise<TextChannelData>;
export declare function loadCategory(categoryData: CategoryData, guild: Guild): Promise<CategoryChannel>;
export declare function loadChannel(channelData: TextChannelData | VoiceChannelData, guild: Guild, category?: CategoryChannel | null, options?: RestoreServerOptions): Promise<unknown>;
/**
 * Delete all roles, all channels, all emojis, etc... of a guild
 */
export declare function clearGuild(guild: Guild): Promise<void>;
