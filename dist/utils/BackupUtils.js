"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearGuild = exports.loadChannel = exports.loadCategory = exports.fetchTextChannelData = exports.fetchChannelsMessages = exports.fetchVoiceChannelData = exports.fetchChannelPermissions = exports.getEmojis = exports.getRoles = exports.getBans = exports.getChannels = exports.getMembers = exports.generateKey = void 0;
const crypto_1 = require("crypto");
const MaxBitratePerTier = {
    NONE: 64000,
    TIER_1: 128000,
    TIER_2: 256000,
    TIER_3: 384000,
};
function generateKey(size = 32) {
    return (0, crypto_1.randomBytes)(size).toString("hex").slice(0, size);
}
exports.generateKey = generateKey;
async function getMembers(guild, options) {
    const members = await guild.members.fetch();
    const memberRoles = [];
    for (const member of members.toJSON()) {
        memberRoles.push({
            id: member.id,
            avatar: member.avatarURL(),
            roles: member.roles.cache
                .filter((r) => r.id !== guild.roles.everyone.id)
                .map((role) => {
                return {
                    roleId: role.id,
                    roleName: role.name,
                };
            }),
            nickname: member.nickname,
            displayName: member.user.tag,
        });
    }
    return memberRoles;
}
exports.getMembers = getMembers;
async function getChannels(guild, options) {
    return new Promise(async (resolve) => {
        const channels = {
            categories: [],
            others: [],
        };
        const categories = guild.channels.cache.filter((ch) => ch.type === "GUILD_CATEGORY")
            .sort((a, b) => a.position - b.position)
            .toJSON();
        for (const category of categories) {
            const categoryData = {
                name: category.name,
                permissions: fetchChannelPermissions(category),
                children: [], // The children channels of the category
            };
            // Gets the children channels of the category and sort them by position
            const children = category.children
                .sort((a, b) => a.position - b.position)
                .toJSON();
            for (const child of children) {
                // For each child channel
                if (child.type === "GUILD_TEXT" ||
                    child.type === "GUILD_NEWS") {
                    const channelData = await fetchTextChannelData(child, options); // Gets the channel data
                    categoryData.children.push(channelData); // And then push the child in the categoryData
                }
                else {
                    const channelData = await fetchVoiceChannelData(child); // Gets the channel data
                    categoryData.children.push(channelData); // And then push the child in the categoryData
                }
            }
            channels.categories.push(categoryData); // Update channels object
        }
        const others = guild.channels.cache.filter((ch) => {
            return (!ch.parent &&
                ch.type !== "GUILD_CATEGORY" &&
                ch.type !== "GUILD_STORE" && // there is no way to restore store channels, ignore them
                ch.type !== "GUILD_NEWS_THREAD" &&
                ch.type !== "GUILD_PRIVATE_THREAD" &&
                ch.type !== "GUILD_PUBLIC_THREAD");
        })
            .sort((a, b) => a.position - b.position)
            .toJSON();
        for (const channel of others) {
            if (channel.type === "GUILD_TEXT" ||
                channel.type === "GUILD_NEWS") {
                const channelData = await fetchTextChannelData(channel, options); // Gets the channel data
                channels.others.push(channelData); // Update channels object
            }
            else {
                const channelData = await fetchVoiceChannelData(channel); // Gets the channel data
                channels.others.push(channelData); // Update channels object
            }
        }
        resolve(channels); // Returns the list of the channels
    });
}
exports.getChannels = getChannels;
async function getBans(guild) {
    const bans = [];
    const cases = await guild.bans.fetch();
    cases.forEach((ban) => bans.push({
        id: ban.user.id,
        reason: ban.reason,
    }));
    return bans;
}
exports.getBans = getBans;
async function getRoles(guild) {
    const roles = [];
    guild.roles.cache
        .filter((role) => !role.managed)
        .sort((a, b) => b.position - a.position)
        .forEach((role) => {
        const roleData = {
            name: role.name,
            color: role.hexColor,
            hoist: role.hoist,
            permissions: role.permissions.bitfield.toString(),
            mentionable: role.mentionable,
            position: role.position,
            isEveryone: guild.id === role.id,
        };
        roles.push(roleData);
    });
    return roles;
}
exports.getRoles = getRoles;
async function getEmojis(guild) {
    const emojis = [];
    guild.emojis.cache.forEach(async (emoji) => {
        const eData = {
            name: emoji.name,
            url: emoji.url,
        };
        emojis.push(eData);
    });
    return emojis;
}
exports.getEmojis = getEmojis;
function fetchChannelPermissions(channel) {
    const permissions = [];
    channel.permissionOverwrites.cache
        .filter((p) => p.type === "role")
        .forEach((perm) => {
        const role = channel.guild.roles.cache.get(perm.id);
        if (role) {
            permissions.push({
                roleName: role.name,
                allow: perm.allow.bitfield.toString(),
                deny: perm.deny.bitfield.toString(),
            });
        }
    });
    return permissions;
}
exports.fetchChannelPermissions = fetchChannelPermissions;
async function fetchVoiceChannelData(channel) {
    return new Promise(async (resolve, reject) => {
        const channelData = {
            type: "GUILD_VOICE",
            name: channel.name,
            bitrate: channel.bitrate,
            userLimit: channel.userLimit,
            parent: channel.parent ? channel.parent.name : null,
            permissions: fetchChannelPermissions(channel),
        };
        resolve(channelData);
    });
}
exports.fetchVoiceChannelData = fetchVoiceChannelData;
async function fetchChannelsMessages(channel, options) {
    let messages = [];
    const messageCount = isNaN(options.maxMessagesPerChannel)
        ? 10
        : options.maxMessagesPerChannel;
    const fetchOptions = { limit: 100 };
    let lastMessageId;
    let fetchComplete = false;
    while (!fetchComplete) {
        // @ts-ignore
        if (lastMessageId) {
            fetchOptions.before = lastMessageId;
        }
        const fetched = await channel.messages.fetch(fetchOptions);
        if (fetched.size === 0) {
            break;
        }
        // @ts-ignore
        lastMessageId = fetched.last().id;
        await Promise.all(fetched.map(async (msg) => {
            if (!msg.author || messages.length >= messageCount) {
                fetchComplete = true;
                return;
            }
            const files = await Promise.all(msg.attachments.map(async (a) => {
                let attach = a.url;
                return {
                    name: a.name,
                    attachment: attach,
                };
            }));
            if (!options.cache?.client.get(`opt_out_${msg.author.id}`)) {
                messages.push({
                    username: msg.author.username,
                    avatar: msg.author.displayAvatarURL(),
                    content: msg.cleanContent,
                    embeds: msg.embeds,
                    // @ts-ignore
                    files,
                    pinned: msg.pinned,
                });
            }
        }));
    }
    return messages;
}
exports.fetchChannelsMessages = fetchChannelsMessages;
async function fetchTextChannelData(channel, options) {
    return new Promise(async (resolve) => {
        const channelData = {
            type: channel.type,
            name: channel.name,
            nsfw: channel.nsfw,
            rateLimitPerUser: channel.type === "GUILD_TEXT"
                ? channel.rateLimitPerUser
                : undefined,
            parent: channel.parent ? channel.parent.name : null,
            topic: channel.topic,
            permissions: fetchChannelPermissions(channel),
            messages: [],
            isNews: channel.type === "GUILD_NEWS",
        };
        try {
            if (!(options.doNotBackup || []).includes("messages")) {
                channelData.messages = await fetchChannelsMessages(channel, options);
                return resolve(channelData);
            }
            else
                return resolve(channelData);
        }
        catch (e) {
            resolve(channelData);
        }
    });
}
exports.fetchTextChannelData = fetchTextChannelData;
async function loadCategory(categoryData, guild) {
    return new Promise((resolve) => {
        guild.channels
            .create(categoryData.name, {
            type: "GUILD_CATEGORY",
        })
            .then(async (category) => {
            const finalPermissions = [];
            categoryData.permissions.forEach((perm) => {
                const role = guild.roles.cache.find((r) => r.name === perm.roleName);
                if (role) {
                    finalPermissions.push({
                        id: role.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny),
                    });
                }
            });
            await category.permissionOverwrites.set(finalPermissions);
            resolve(category);
        });
    });
}
exports.loadCategory = loadCategory;
async function loadChannel(channelData, guild, category, options) {
    return new Promise(async (resolve) => {
        const loadMessages = (channel, messages, previousWebhook) => {
            return new Promise(async (resolve) => {
                const webhook = previousWebhook ||
                    (await channel.createWebhook("Letoa", {
                        avatar: channel.client.user?.displayAvatarURL(),
                    }));
                if (!webhook) {
                    console.log("INVALID WEBHOOK: ", webhook);
                    return resolve();
                }
                messages = messages
                    .filter((m) => m.content.length > 0 ||
                    m.embeds.length > 0 ||
                    m.files.length > 0)
                    .reverse();
                messages = messages.slice(
                // @ts-ignore
                messages.length - options.maxMessagesPerChannel);
                for (const msg of messages) {
                    const sentMsg = await webhook
                        .send({
                        content: msg.content?.length
                            ? msg.content
                            : undefined,
                        username: msg.username,
                        avatarURL: msg.avatar,
                        embeds: msg.embeds,
                        // @ts-ignore
                        files: msg.files,
                    })
                        .catch((err) => console.log(err.message));
                    if (msg.pinned && sentMsg)
                        await sentMsg.pin();
                }
                resolve(webhook);
            });
        };
        const createOptions = {
            type: undefined,
            parent: category ? category : undefined,
        };
        if (channelData.type === "GUILD_TEXT" ||
            channelData.type === "GUILD_NEWS" ||
            channelData.type === "text") {
            createOptions.topic =
                channelData.topic ?? undefined;
            createOptions.nsfw = channelData.nsfw;
            createOptions.rateLimitPerUser = channelData.rateLimitPerUser;
            createOptions.type =
                channelData.isNews &&
                    guild.features.includes("NEWS")
                    ? "GUILD_NEWS"
                    : "GUILD_TEXT";
        }
        else if (channelData.type === "GUILD_VOICE" ||
            channelData.type === "voice") {
            // Downgrade bitrate
            let bitrate = channelData.bitrate;
            const bitrates = Object.values(MaxBitratePerTier);
            while (bitrate > MaxBitratePerTier[guild.premiumTier]) {
                bitrate =
                    bitrates[Object.keys(MaxBitratePerTier).indexOf(guild.premiumTier) - 1];
            }
            createOptions.bitrate = bitrate;
            createOptions.userLimit = channelData.userLimit;
            createOptions.type = "GUILD_VOICE";
        }
        guild.channels
            .create(channelData.name, createOptions)
            .then(async (channel) => {
            const finalPermissions = [];
            channelData.permissions.forEach((perm) => {
                const role = guild.roles.cache.find((r) => r.name === perm.roleName);
                if (role) {
                    finalPermissions.push({
                        id: role.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny),
                    });
                }
            });
            await channel.permissionOverwrites.set(finalPermissions);
            if (channelData.type === "GUILD_TEXT" ||
                channelData.type === "text") {
                let webhook;
                if (channelData.messages.length > 0) {
                    webhook = await loadMessages(channel, channelData.messages).catch(() => { });
                }
                return channel;
            }
            else {
                resolve(channel);
            }
        });
    });
}
exports.loadChannel = loadChannel;
/**
 * Delete all roles, all channels, all emojis, etc... of a guild
 */
async function clearGuild(guild) {
    guild.roles.cache
        .filter((role) => !role.managed && role.editable && role.id !== guild.id)
        .forEach((role) => {
        role.delete().catch(() => { });
    });
    guild.channels.cache.forEach((channel) => {
        channel.delete().catch(() => { });
    });
    guild.emojis.cache.forEach((emoji) => {
        emoji.delete().catch(() => { });
    });
    const webhooks = await guild.fetchWebhooks();
    webhooks.forEach((webhook) => {
        webhook.delete().catch(() => { });
    });
    const bans = await guild.bans.fetch();
    bans.forEach((ban) => {
        guild.members.unban(ban.user).catch(() => { });
    });
    guild.setAFKChannel(null);
    guild.setAFKTimeout(60 * 5);
    guild.setIcon(null);
    guild.setBanner(null).catch(() => { });
    guild.setSplash(null).catch(() => { });
    guild.setDefaultMessageNotifications("ONLY_MENTIONS");
    guild.setWidgetSettings({
        enabled: false,
        channel: null,
    });
    if (!guild.features.includes("COMMUNITY")) {
        guild.setExplicitContentFilter("DISABLED");
        guild.setVerificationLevel("NONE");
    }
    guild.setSystemChannel(null);
    guild.setSystemChannelFlags([
        "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS",
        "SUPPRESS_JOIN_NOTIFICATIONS",
        "SUPPRESS_PREMIUM_SUBSCRIPTIONS",
    ]);
    return;
}
exports.clearGuild = clearGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQmFja3VwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXFDO0FBa0NyQyxNQUFNLGlCQUFpQixHQUFnQztJQUNuRCxJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxNQUFNO0lBQ2QsTUFBTSxFQUFFLE1BQU07SUFDZCxNQUFNLEVBQUUsTUFBTTtDQUNqQixDQUFDO0FBRUYsU0FBZ0IsV0FBVyxDQUFDLElBQUksR0FBRyxFQUFFO0lBQ2pDLE9BQU8sSUFBQSxvQkFBVyxFQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFGRCxrQ0FFQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQUMsS0FBWSxFQUFFLE9BQTRCO0lBQ3ZFLE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QyxNQUFNLFdBQVcsR0FBaUIsRUFBRSxDQUFDO0lBRXJDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDYixFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDYixNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUMxQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO2lCQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDVixPQUFPO29CQUNILE1BQU0sRUFBRSxJQUFJ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