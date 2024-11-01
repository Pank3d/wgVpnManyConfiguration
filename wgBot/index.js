import dotenv from 'dotenv';
dotenv.config();
import { Telegraf } from 'telegraf';
import { startCommand } from './scenes/commands/start.js';
import { config } from './scenes/module/config.js';
import { download } from './scenes/commands/doownload.js';

export const bot = new Telegraf(process.env.BOT_TOKEN);

const sessions = {};



bot.use((ctx, next) => {
	if (ctx.from && ctx.from.id) {
		if (!sessions[ctx.from.id]) {
			sessions[ctx.from.id] = {};
		}
		ctx.session = sessions[ctx.from.id];
	} else {
		console.error('ctx.from or ctx.from.id is undefined', ctx);
	}
	return next();
});

bot.start(startCommand);

config(bot);
download(bot)

bot
	.launch()
	.then(() => console.log('Bot is running...'))
	.catch(error => console.error('Error launching bot:', error));
