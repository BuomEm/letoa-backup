"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEmbedChannel = exports.loadBans = exports.loadEmojis = exports.loadAFK = exports.loadMemberRoles = exports.loadChannels = exports.loadRoles = exports.loadConfig = void 0;
const discord_js_1 = require("discord.js");
const BackupUtils_1 = require("./BackupUtils");
/**
 * Restores the guild configuration
 */
const loadConfig = (guild, backupData) => {
    const configPromises = [];
    if (backupData.name) {
        configPromises.push(guild.setName(backupData.name));
    }
    if (backupData.iconBase64) {
        configPromises.push(guild.setIcon(Buffer.from(backupData.iconBase64, "base64")));
    }
    else if (backupData.iconURL) {
        configPromises.push(guild.setIcon(backupData.iconURL));
    }
    if (backupData.splashBase64) {
        configPromises.push(guild.setSplash(Buffer.from(backupData.splashBase64, "base64")));
    }
    else if (backupData.splashURL) {
        configPromises.push(guild.setSplash(backupData.splashURL));
    }
    if (backupData.bannerBase64) {
        configPromises.push(guild.setBanner(Buffer.from(backupData.bannerBase64, "base64")));
    }
    else if (backupData.bannerURL) {
        configPromises.push(guild.setBanner(backupData.bannerURL));
    }
    if (backupData.verificationLevel) {
        configPromises.push(guild.setVerificationLevel(backupData.verificationLevel));
    }
    if (backupData.defaultMessageNotifications) {
        configPromises.push(guild.setDefaultMessageNotifications(backupData.defaultMessageNotifications));
    }
    const changeableExplicitLevel = guild.features.includes("COMMUNITY");
    if (backupData.explicitContentFilter && changeableExplicitLevel) {
        configPromises.push(guild.setExplicitContentFilter(backupData.explicitContentFilter));
    }
    return Promise.all(configPromises);
};
exports.loadConfig = loadConfig;
/**
 * Restore the guild roles
 */
const loadRoles = (guild, backupData, cache) => {
    const rolePromises = [];
    backupData.roles.forEach((roleData) => {
        if (roleData.isEveryone) {
            rolePromises.push(guild.roles.cache.get(guild.id).edit({
                name: roleData.name,
                color: roleData.color,
                permissions: BigInt(roleData.permissions),
                mentionable: roleData.mentionable,
            }));
        }
        else {
            rolePromises.push(guild.roles.create({
                name: roleData.name,
                color: roleData.color,
                hoist: roleData.hoist,
                permissions: BigInt(roleData.permissions),
                mentionable: roleData.mentionable,
            }));
        }
    });
    cache?.setItem(`${guild.id}_roles`, JSON.stringify({ finished: true }));
    return Promise.all(rolePromises);
};
exports.loadRoles = loadRoles;
/**
 * Restore the guild channels
 */
const loadChannels = (guild, backupData, options) => {
    const loadChannelPromises = [];
    backupData.channels.categories.forEach((categoryData) => {
        loadChannelPromises.push(new Promise((resolve) => {
            (0, BackupUtils_1.loadCategory)(categoryData, guild).then((createdCategory) => {
                categoryData.children.forEach((channelData) => {
                    (0, BackupUtils_1.loadChannel)(channelData, guild, createdCategory, options);
                    resolve(true);
                });
            });
        }));
    });
    backupData.channels.others.forEach((channelData) => {
        loadChannelPromises.push((0, BackupUtils_1.loadChannel)(channelData, guild, null, options));
    });
    return Promise.all(loadChannelPromises);
};
exports.loadChannels = loadChannels;
/**
 * Restore member roles.
 */
const loadMemberRoles = async (guild, backupData, cache) => {
    // add roles after 10 seconds to make sure they got restored.
    setTimeout(async () => {
        const loadMemberRolesPromises = [];
        const members = await guild.members.fetch();
        await guild.roles.fetch(undefined, {
            cache: true,
        });
        backupData.members?.forEach((member) => {
            const valid = members.find((m) => m.id === member.id);
            if (!valid)
                return;
            else {
                const roles = new discord_js_1.Collection();
                member.roles?.forEach((r) => {
                    const role = guild.roles.cache.find((v) => v.name === r.roleName);
                    if (role) {
                        if (!roles.get(role.id)) {
                            roles.set(role.id, role);
                        }
                    }
                });
                loadMemberRolesPromises.push(valid.roles
                    .set(roles, "Member Role Restore")
                    .catch(() => { }));
            }
        });
        cache?.deleteItem(`${guild.id}_roles`);
        return Promise.all(loadMemberRolesPromises);
    }, 10000);
};
exports.loadMemberRoles = loadMemberRoles;
/**
 * Restore the afk configuration
 */
const loadAFK = (guild, backupData) => {
    const afkPromises = [];
    if (backupData.afk) {
        afkPromises.push(guild.setAFKChannel(guild.channels.cache.find((ch) => 
        // @ts-ignore
        ch.name === backupData.afk.name &&
            ch.type === "GUILD_VOICE")));
        afkPromises.push(guild.setAFKTimeout(backupData.afk.timeout));
    }
    return Promise.all(afkPromises);
};
exports.loadAFK = loadAFK;
/**
 * Restore guild emojis
 */
const loadEmojis = (guild, backupData) => {
    const emojiPromises = [];
    backupData.emojis.forEach((emoji) => {
        if (emoji.url) {
            // @ts-ignore
            emojiPromises.push(guild.emojis.create(emoji.url, emoji.name));
        }
        else if (emoji.base64) {
            emojiPromises.push(guild.emojis.create(Buffer.from(emoji.base64, "base64"), 
            // @ts-ignore
            emoji.name));
        }
    });
    return Promise.all(emojiPromises);
};
exports.loadEmojis = loadEmojis;
/**
 * Restore guild bans
 */
const loadBans = (guild, backupData) => {
    const banPromises = [];
    backupData.bans.forEach((ban) => {
        banPromises.push(guild.members.ban(ban.id, {
            reason: ban.reason ?? undefined,
        }));
    });
    return Promise.all(banPromises);
};
exports.loadBans = loadBans;
/**
 * Restore embedChannel configuration
 */
const loadEmbedChannel = (guild, backupData) => {
    const embedChannelPromises = [];
    if (backupData.widget.channel) {
        embedChannelPromises.push(guild.setWidgetSettings({
            // @ts-ignore
            enabled: backupData.widget.enabled,
            // @ts-ignore
            channel: guild.channels.cache.find((ch) => ch.name === backupData.widget.channel),
        }));
    }
    return Promise.all(embedChannelPromises);
};
exports.loadEmbedChannel = loadEmbedChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdG9yZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL1Jlc3RvcmVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FTb0I7QUFDcEIsK0NBQTBEO0FBRzFEOztHQUVHO0FBQ0ksTUFBTSxVQUFVLEdBQUcsQ0FDdEIsS0FBWSxFQUNaLFVBQXNCLEVBQ04sRUFBRTtJQUNsQixNQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBQzVDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtRQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdkQ7SUFDRCxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7UUFDdkIsY0FBYyxDQUFDLElBQUksQ0FDZixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUM5RCxDQUFDO0tBQ0w7U0FBTSxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7UUFDM0IsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO1FBQ3pCLGNBQWMsQ0FBQyxJQUFJLENBQ2YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FDbEUsQ0FBQztLQUNMO1NBQU0sSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1FBQzdCLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUM5RDtJQUNELElBQUksVUFBVSxDQUFDLFlB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